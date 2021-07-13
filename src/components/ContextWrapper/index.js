import React, { createContext } from "react";
import { useStateLocal } from "../../services/hooks/useStateLocal";

export const ContextWrapperCreate = createContext();

export const ContextWrapper = ({ children }) => {
  const [switchValue, setSwitchValue] = useStateLocal(false, "switch");
  const [emailValue, setEmailValue] = useStateLocal("", "email");
  const [passwordValue, setPasswordValue] = useStateLocal("", "password");
  const [ssidValue, setSsidValue] = useStateLocal("", "ssid");
  const [localValue, setLocalValue] = useStateLocal(
    "http://localhost:8082",
    "local"
  );

  return (
    <ContextWrapperCreate.Provider
      value={{
        switchObj: {
          switchValue,
          setSwitchValue,
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
      }}
    >
      {children}
    </ContextWrapperCreate.Provider>
  );
};
