import React, {useContext, useRef, useState, useEffect} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import styled from 'styled-components';
import WifiManager from 'react-native-wifi-reborn';

import {ContextWrapperCreate} from '../../components/ContextWrapper';
import MyTabBar from '../../components/MyTabBar';

const WebViewComponent = ({navigation}) => {
    const {switchObj, emailObj, passwordObj, ssidObj, localObj} =
        useContext(ContextWrapperCreate);

    const [useLocal, setUseLocal] = useState(true);

    const refWebView = useRef();

    useEffect(() => {
        if (ssidObj.ssidValue && switchObj.switchValue && emailObj.emailValue && passwordObj.passwordValue) {
            WifiManager.getCurrentWifiSSID()
                .then(
                    ssid => ssid !== ssidObj.ssidValue && setUseLocal(false),
                    () => setUseLocal(false)
                );
        }
    });

    return <WrapperWebView>
        <WebViewContent
            ref={refWebView}
            onNavigationStateChange={(newNavState) => {
                const {url} = newNavState;
                if (!url) {
                    return;
                }
                if (url.includes('login?app=true')) {
                    const newURL = 'https://iobroker.pro/material/index.html?app=true';
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
                    : {uri: localObj.localValue}
            }
            on
        />
        <MyTabBar navigation={navigation}/>
    </WrapperWebView>;
};

const WrapperWebView = styled(View)`
  flex: 1;
  flex-grow: 1;
`;
const WebViewContent = styled(WebView)`
  opacity: 0.95;
  flex: 1;
  background-color: transparent;
`;

export default WebViewComponent;
