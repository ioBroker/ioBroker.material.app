import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { WebView } from "react-native-webview";
import styled from "styled-components";
// import WifiManager from "react-native-wifi-reborn";

import { ContextWrapperCreate } from "../../components/ContextWrapper";
import MyTabBar from "../../components/MyTabBar";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import { useNetInfo } from '@react-native-community/netinfo';
import { Text } from "react-native";

function buildLocalUrl(url) {
  // check if material, admin, vis, echarts
  if (url.includes(":3000") || url.includes("/material")) {
    return url;
  } else if (url.endsWith("/")) {
    return url + "material/";
  } else {
    return url + "/material/";
  }
}

const WebViewComponent = ({ navigation }) => {
  const { switchObj, emailObj, passwordObj, ssidObj, localObj } =
    useContext(ContextWrapperCreate);

  const [useLocal, setUseLocal] = useState(true);
  const [uriLocal, setUriLocal] = useState(
    `${buildLocalUrl(localObj.localValue)}?t=${Date.now()}`
  );
  const netInfo = useNetInfo();

  const refWebView = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    setUriLocal(`${buildLocalUrl(localObj.localValue)}?t=${Date.now()}`);
  }, [localObj.localValue]);

  useEffect(() => {
    if (
      ssidObj.ssidValue &&
      switchObj.switchValue &&
      emailObj.emailValue &&
      passwordObj.passwordValue
    ) {
      if (
        netInfo?.type === "wifi" &&
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
  const [showSettings, setShowSettings] = useState(true);
  const onRefresh = useCallback(() => {
    if (refWebView.current) {
      refWebView.current.reload();
    }
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  let warning;
  if (
    !localObj.localValue &&
    (!emailObj.emailValue || !passwordObj.passwordValue)
  ) {
    // Show text. No local URL found
    warning = t(
      "iobroker.pro settings or local url not found! Please set it settings."
    );
  } else if (useLocal && !localObj.localValue) {
    setUseLocal(false);
  }

  return (
    <>
      <WrapperWebView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flex: 1 }}
      >
        {!warning ? (
          <WebViewContent
            ref={refWebView}
            startInLoadingState
            onError={(err) => {
              Alert.alert(t("Error"), t("Redirect to iobroker.pro?"), [
                {
                  text: t('No'),
                  style: "cancel",
                },
                {
                  text: t("Yes"),
                  onPress: () => {
                    const newURL = "https://iobroker.pro";
                    const redirectTo = `window.location = "${newURL}"`;
                    refWebView.current?.injectJavaScript(redirectTo);
                  },
                },
              ]);
            }}
            onWebMessage={(e) => {
              const data = e.nativeEvent.data;
              if (data && data.includes('locationUpdated')) {
                let newLoc = JSON.parse(data);
                let url = newLoc.locationUpdated;
                //handle the new URL or change anything needed on URL change
                console.log(111121, refWebView.current, url);
                if (
                  (showSettings && url.includes("/chart/")) ||
                  url.includes("/dialog/")
                ) {
                  setShowSettings(false);
                } else if (!showSettings) {
                  setShowSettings(true);
                }
              }
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

              if (url.includes("login?app=true")) {
                const newURL =
                  "https://iobroker.pro/material/index.html?app=true";
                const redirectTo = `window.location = "${newURL}"`;
                refWebView.current?.injectJavaScript(redirectTo);
              }
            }}
            source={
              !useLocal
                ? {
                    uri: "https://iobroker.pro/login?app=true",
                    method: "POST",
                    body: `username=${emailObj.emailValue}&password=${passwordObj.passwordValue}`,
                  }
                : {
                    uri: localObj.localValue && uriLocal,
                  }
            }
            on
          />
        ) : (
          <Text>{warning}</Text>
        )}
      </WrapperWebView>

      {showSettings ? <MyTabBar navigation={navigation} /> : null}
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
