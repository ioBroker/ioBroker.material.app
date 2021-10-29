import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components';
// import WifiManager from 'react-native-wifi-reborn';
// import Geolocation from '@react-native-community/geolocation';

import { ContextWrapperCreate } from '../../components/ContextWrapper';
import MyTabBar from '../../components/MyTabBar';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useSwipe } from '../../services/hooks/useSwipe';
import { Platform } from 'react-native';
import {
  h_normalize,
  styled_t_r_b_l_normalize,
  w_normalize,
} from '../../services/helpers/normalizeSize';
// import BackgroundTask from 'react-native-background-task';
import BaseButton from '../../components/BaseButton';
import { View } from 'react-native';
import refreshIcon from '../../../assets/refresh.png';

// BackgroundTask.define(() => {
//   // Geolocation.getCurrentPosition((info) => console.log(info));
//   console.log('Hello from a background task');

//   BackgroundTask.finish();
// });

function buildLocalUrl(url) {
  // check if material, admin, vis, echarts
  if (url.includes(':3000') || url.includes('/material')) {
    return url;
  } else if (url.endsWith('vis/')) {
    return url;
  } else if (url.endsWith('vis')) {
    return url + '/';
  } else if (url.endsWith('/')) {
    return url + 'material/';
  } else {
    return url + '/material/';
  }
}

const WebViewComponent = ({ navigation }) => {
  const { remoteObj, emailObj, passwordObj, ssidObj, localObj, instanceObj } =
    useContext(ContextWrapperCreate);

  const [useLocal, setUseLocal] = useState(true);
  const [uriLocal, setUriLocal] = useState(`${buildLocalUrl(localObj.localValue)}?t=${Date.now()}`);
  const netInfo = useNetInfo();

  const refWebView = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    setUriLocal(`${buildLocalUrl(localObj.localValue)}?t=${Date.now()}`);
  }, [localObj.localValue]);

  useEffect(() => {
    if (
      ssidObj.ssidValue &&
      remoteObj.remoteValue &&
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
    remoteObj.remoteValue,
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
    warning = t('iobroker.pro settings or local url not found! Please set it settings.');
  } else if (useLocal && !localObj.localValue) {
    setUseLocal(false);
  }

  useEffect(() => {
    if (showSettings) {
      setTimeout(() => setShowSettings(false), 10000);
    }
  }, [showSettings]);

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 2);

  function onSwipeLeft() {
    if (!showSettings) {
      setShowSettings(true);
    } else {
      navigation.navigate('Modal');
    }
  }

  function onSwipeRight() {
    if (showSettings) {
      setShowSettings(false);
    }
  }

  // const [enablePTR, setEnablePTR] = useState(false);

  // useEffect(() => {
  //   Geolocation.watchPosition((e) => {
  //     console.log(12233, e);
  //   });
  //   return () => {
  //     Geolocation.stopObserving();
  //   };
  // }, []);
  // useEffect(() => {
  //   BackgroundTask.schedule({
  //     period: 900,
  //   });
  //   BackgroundTask.statusAsync().then((e) => console.log(e));
  // }, []);

  return (
    <>
      <WrapperWebView
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        refreshControl={
          <RefreshControl
            enabled={Platform.OS === 'ios'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        // scrollEnabled={false}
        contentContainerStyle={{ flex: 1 }}
      >
        {!warning ? (
          <WebViewContent
            ref={refWebView}
            startInLoadingState
            injectedJavaScript={`window.__material_instance = '${instanceObj.instanceValue}'`}

            //           injectedJavaScript={`
            //   (function() {
            //     window.onscroll=function(){window.postMessage(document.documentElement.scrollTop||document.body.scrollTop)}
            //     function wrap(fn) {
            //       return function wrapper() {
            //         var res = fn.apply(this, arguments);
            //         window.ReactNativeWebView.postMessage('navigationStateChange');
            //         return res;
            //       }
            //     }

            //     history.pushState = wrap(history.pushState);
            //     history.replaceState = wrap(history.replaceState);
            //     window.addEventListener('popstate', function() {
            //       window.ReactNativeWebView.postMessage('navigationStateChange');
            //     });
            //   })();

            //   true;
            // `}
            onMessage={event => {}}
            // onMessage={({ nativeEvent: state }) => {
            //   console.log(11223344, state.data);
            //   if (state.data === 'navigationStateChange') {
            //     // Navigation state updated, can check state.canGoBack, etc.
            //     const url = state.url;
            //     if (
            //       (showSettings && url.includes('/chart/')) ||
            //       url.includes('/dialog/')
            //     ) {
            //       setShowSettings(false);
            //     } else if (!showSettings) {
            //       setShowSettings(true);
            //     }
            //   } else {
            //     // if (state.data == 0 && !enablePTR) {
            //     //   setEnablePTR(true);
            //     // } else if (state.data > 10 && enablePTR) {
            //     //   setEnablePTR(false);
            //     // }
            //   }
            // }}
            onError={err => {
              if (remoteObj.remoteValue && emailObj.emailValue && passwordObj.passwordValue) {
                Alert.alert(t('Cannot reach local server'), t('Redirect to iobroker.pro?'), [
                  {
                    text: t('Open settings'),
                    style: 'cancel',
                    onPress: () => {
                      navigation.navigate('Modal');
                    },
                  },
                  {
                    text: t('Go to pro'),
                    onPress: () => {
                      const newURL = 'https://iobroker.pro';
                      const redirectTo = `window.location = '${newURL}'`;
                      refWebView.current?.injectJavaScript(redirectTo);
                    },
                  },
                ]);
              } else {
                Alert.alert(t('Cannot reach local server'), t('Open settings?'), [
                  {
                    text: t('Hide warning'),
                    style: 'cancel',
                  },
                  {
                    text: t('Open settings'),
                    onPress: () => {
                      setTimeout(() => navigation.navigate('Modal'), 200);
                    },
                  },
                ], {
                  cancelable: true
                });
              }
            }}
            renderLoading={() => setRefreshing(true)}
            onLoadEnd={() => setRefreshing(false)}
            onNavigationStateChange={newNavState => {
              const { url } = newNavState;
              if (!url) {
                return;
              }

              if (url.includes('login?app=true')) {
                const newURL = 'https://iobroker.pro/material/index.html?app=true';
                const redirectTo = `window.location = '${newURL}'`;
                refWebView.current?.injectJavaScript(redirectTo);
              }
              /*refWebView.current?.injectJavaScript(`
              (function() {
                window.onscroll=function(){window.postMessage(document.documentElement.scrollTop||document.body.scrollTop)}
                function wrap(fn) {
                  return function wrapper() {
                    var res = fn.apply(this, arguments);
                    window.ReactNativeWebView.postMessage('navigationStateChange');
                    return res;
                  }
                }

                history.pushState = wrap(history.pushState);
                history.replaceState = wrap(history.replaceState);
                window.addEventListener('popstate', function() {
                  window.ReactNativeWebView.postMessage('navigationStateChange');
                });
              })();

              true;
            `);*/
            }}
            source={
              !useLocal
                ? {
                    uri: 'https://iobroker.pro/login?app=true',
                    method: 'POST',
                    body: `username=${emailObj.emailValue}&password=${passwordObj.passwordValue}`,
                  }
                : {
                    uri: localObj.localValue && uriLocal,
                  }
            }
            on
          />
        ) : (
          <WrapperText>
            <TextCustom>{warning}</TextCustom>
          </WrapperText>
        )}
      </WrapperWebView>

      {showSettings ? <MyTabBar navigation={navigation} /> : null}

      {Platform.os !== 'ios' && showSettings ? (
        <WrapperTabBar>
          <BaseButton
            onPress={() => onRefresh()}
            width={w_normalize(55)}
            height={w_normalize(55)}
            padding
            backgroundColor="rgba(77, 171, 245, 0.3)"
            textColor="white"
            minRadius
            circle
            icon={refreshIcon}
          />
        </WrapperTabBar>
      ) : null}
    </>
  );
};

const WrapperTabBar = styled(View)`
  flex: 1;
  height: auto;
  width: ${h_normalize(90)};
  justify-content: center;
  align-items: center;
  right: ${h_normalize(-5)};
  bottom: ${h_normalize(85)};
  position: absolute;
`;
const WrapperText = styled.View`
  flex: 1;
  justify-content: center;
`;
const TextCustom = styled.Text`
  color: white;
  font-weight: bold;
  align-items: center;
  text-align: center;
  margin: ${styled_t_r_b_l_normalize(0, 20, 15, 20)};
  font-size: ${h_normalize(16)};
`;
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
