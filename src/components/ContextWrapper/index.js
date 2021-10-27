import React, { createContext } from 'react';
import { useStateLocal } from '../../services/hooks/useStateLocal';

export const ContextWrapperCreate = createContext();

export const ContextWrapper = ({ children }) => {
  const [remoteValue, setRemoteValue] = useStateLocal(false, 'remote');
  const [emailValue, setEmailValue] = useStateLocal('', 'email');
  const [passwordValue, setPasswordValue] = useStateLocal("", 'password');
  const [ssidValue, setSsidValue] = useStateLocal('', 'ssid');
  const [localValue, setLocalValue] = useStateLocal('http://localhost:8082', 'local');
  const [instanceValue, setInstanceValue] = useStateLocal('app','instance');

  return (
    <ContextWrapperCreate.Provider
      value={{
        remoteObj: {
          remoteValue,
          setRemoteValue,
        },
        emailObj: {
          emailValue,
          setEmailValue,
        },
        passwordObj: {
          passwordValue,
          setPasswordValue,
        },
        ssidObj: {
          ssidValue,
          setSsidValue,
        },
        localObj: {
          localValue,
          setLocalValue,
        },
        instanceObj: {
          instanceValue,
          setInstanceValue,
        },
      }}
    >
      {children}
    </ContextWrapperCreate.Provider>
  );
};
