import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components';
// import WifiManager from "react-native-wifi-reborn";

import { ContextWrapperCreate } from '../../components/ContextWrapper';
import MyTabBar from '../../components/MyTabBar';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";

const WebViewComponent = ({ navigation }) => {
  const { switchObj, emailObj, passwordObj, ssidObj, localObj } =
    useContext(ContextWrapperCreate);

  const [useLocal, setUseLocal] = useState(true);
  const [uriLocal, setUriLocal] = useState(
    `${localObj.localValue}?t=${Date.now()}`
  );
  const netInfo = useNetInfo();

  const refWebView = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    setUriLocal(`${localObj.localValue}?t=${Date.now()}`);
  }, [localObj.localValue]);

  useEffect(() => {
    if (
      ssidObj.ssidValue &&
      switchObj.switchValue &&
      emailObj.emailValue &&
      passwordObj.passwordValue
    ) {
      if (
        netInfo?.type === 'wifi' &&
        netInfo?.details?.ssid === ssidObj.ssidValue
      ) {
        setUseLocal(true);
      } else {
        setUseLocal(false);
      }
      // WifiManager.getCurrentWifiSSID().then(
      //   (ssid) => ssid !== ssidObj.ssidValue && setUseLocal(false),
      //   () => setUseLocal(false)
      // );
    }
  }, [
    netInfo,
    ssidObj.ssidValue,
    switchObj.switchValue,
    emailObj.emailValue,
    passwordObj.passwordValue,
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    if (refWebView.current) {
      refWebView.current.reload();
    }
    setTimeout(() => setRefreshing(false), 1500);
  }, []);
  return (
    <>
      <WrapperWebView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flex: 1 }}
      >
        <WebViewContent
          ref={refWebView}
          startInLoadingState
          onError={(err) => {
            Alert.alert(t('Error'), t('Redirect to iobroker.pro?'), [
              {
                text: t("No"),
                style: 'cancel',
              },
              {
                text: t('Yes'),
                onPress: () => {
                  const newURL = 'https://iobroker.pro';
                  const redirectTo = `window.location = "${newURL}"`;
                  refWebView.current?.injectJavaScript(redirectTo);
                },
              },
            ]);
          }}
          renderLoading={() => {
            setRefreshing(true);
          }}
          onLoadEnd={() => {
            setRefreshing(false);
          }}
          onNavigationStateChange={(newNavState) => {
            const { url } = newNavState;
            if (!url) {
              return;
            }
            if (url.includes('login?app=true')) {
              const newURL =
                'https://iobroker.pro/material/index.html?app=true';
              const redirectTo = `window.location = "${newURL}"`;
              refWebView.current?.injectJavaScript(redirectTo);
            }
          }}
          source={
            !useLocal
              ? {
                  uri: 'https://iobroker.pro/login?app=true',
                  method: 'POST',
                  body: `username=${emailObj.emailValue}&password=${passwordObj.passwordValue}`,
                }
              : {
                  uri:
                    (localObj.localValue && uriLocal) || "https://iobroker.pro",
                }
          }
          on
        />
      </WrapperWebView>

      <MyTabBar navigation={navigation} />
    </>
  );
};

const WrapperWebView = styled(ScrollView)`
  flex: 1;
  flex-grow: 1;
`;
const WebViewContent = styled(WebView)`
  opacity: 0.95;
  flex: 1;
  background-color: transparent;
`;

export default WebViewComponent;
