import { Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  h_normalize,
  styled_t_r_b_l_normalize,
  w_normalize,
} from '../../services/helpers/normalizeSize';
import BaseButton from '../../components/BaseButton';
// import { resources } from "../../services/locales";
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import wifi from '../../../assets/wifi.png';
import see from '../../../assets/see.png';
import BaseTextInput from '../../components/BaseTextInput';
import BaseSwitch from '../../components/BaseSwitch';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { PermissionsAndroid } from 'react-native';
// import WifiManager from "react-native-wifi-reborn";
import { ContextWrapperCreate } from '../../components/ContextWrapper';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
import NetInfo  from '@react-native-community/netinfo';
import { PERMISSIONS, request } from 'react-native-permissions';
import { Alert } from 'react-native';

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 5,
    height: 5,
  },
  shadowOpacity: 0.36,
  shadowRadius: 9.68,

  elevation: 11,
};

// const style = {
//   smallText: {
//     fontWeight: 'bold',
//     fontSize: w_normalize(24),
//     color: 'silver',
//     opacity: 0.6,
//   },
//   bigText: {
//     fontWeight: 'bold',
//     fontSize: w_normalize(48),
//     color: '#FFFFFF',
//   },
//   line: {
//     position: 'absolute',
//     borderBottomColor: '#4dabf5',
//     borderBottomWidth: 1,
//     height: '50%',
//     width: '40%',
//   },
// };

const Modal = ({ navigation, route: { params } }) => {
  const [portrait, setPortrait] = useState(true);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      (async () => {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission is required for WiFi connections',
            message:
              'This app needs location permission as this is required  ' +
              'to scan for wifi networks.',
            buttonNegative: 'DENY',
            buttonPositive: 'ALLOW',
          }
        );
      })();
    }
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    Dimensions.addEventListener('change', () => setPortrait(!!isPortrait()));
  }, []);

  const {
    // i18n,
    t,
  } = useTranslation();
  // const arrLang = Object.keys(resources);
  // const arrLangIndexCurrent = arrLang.indexOf(i18n.language);
  // const arrLangIndexCurrentPrev =
  //   arrLangIndexCurrent > 0 ? arrLangIndexCurrent - 1 : arrLang.length - 1;
  // const arrLangIndexCurrentNext =
  //   arrLangIndexCurrent < arrLang.length - 1 ? arrLangIndexCurrent + 1 : 0;

  const { remoteObj, emailObj, passwordObj, ssidObj, localObj, instanceObj } =
    useContext(ContextWrapperCreate);
  const [secure, setSecure] = useState(true);
  const [remoteValue, setRemoteValue] = useState(remoteObj.remoteValue);
  const [emailValue, setEmailValue] = useState(emailObj.emailValue);
  const [passwordValue, setPasswordValue] = useState(passwordObj.passwordValue);
  const [ssidValue, setSsidValue] = useState(ssidObj.ssidValue);
  const [localValue, setLocalValue] = useState(localObj.localValue);
  //const [gpsValue, setGpshValue] = useState(false);
  const [instanceValue, setInstanceValue] = useState(instanceObj.instanceValue || 'app');

  const saveSettings = () => {
    if (remoteObj.remoteValue !== remoteValue) {
      remoteObj.setRemoteValue(remoteValue);
    }
    if (emailObj.emailValue !== emailValue) {
      emailObj.setEmailValue(emailValue);
    }
    if (passwordObj.passwordValue !== passwordValue) {
      passwordObj.setPasswordValue(passwordValue);
    }
    if (ssidObj.ssidValue !== ssidValue) {
      ssidObj.setSsidValue(ssidValue);
    }
    if (localObj.localValue !== localValue) {
      localObj.setLocalValue(localValue);
    }
    if (instanceObj.instanceValue !== instanceValue) {
      instanceObj.setInstanceValue(instanceValue);
    }
  };

  const checkChanges =
    remoteObj.remoteValue === remoteValue &&
    emailObj.emailValue === emailValue &&
    passwordObj.passwordValue === passwordValue &&
    ssidObj.ssidValue === ssidValue &&
    localObj.localValue === localValue &&
    instanceObj.instanceValue === instanceValue;

  return (
    <TouchableWithoutFeedback
      onStartShouldSetResponder={() => true}
      onPress={Keyboard.dismiss}
    >
      <Wrapper>
        <HeadWrapper style={{ ...shadow, flex: portrait ? 0 : 1 }}>
          <Heading>{t('Settings')}</Heading>
          <TextCustom>
            {t('you can slide right to left to show settings button')}
          </TextCustom>
          {/* <WrapperSlider>
            <TouchableOpacity
              onPress={() => {
                i18n.changeLanguage(arrLang[arrLangIndexCurrentPrev]);
              }}
            >
              <Triangel />
            </TouchableOpacity>
            <Text style={style.smallText}>
              {arrLang[arrLangIndexCurrentPrev]}
            </Text>
            <Text style={style.bigText}>{arrLang[arrLangIndexCurrent]}</Text>
            <Text style={style.smallText}>
              {arrLang[arrLangIndexCurrentNext]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                i18n.changeLanguage(arrLang[arrLangIndexCurrentNext]);
              }}
            >
              <Triangel
                style={{
                  transform: [{ rotate: "90deg" }],
                }}
              />
            </TouchableOpacity>
          </WrapperSlider> */}
          <WrapperSettingsScroll bool={portrait}>
            <WrapperTextInput>
              <BaseTextInput
                onChangeText={setLocalValue}
                value={localValue}
                placeholder={t('Local URL')}
                topText
              />
              <BaseTextInput
                onChangeText={setSsidValue}
                value={ssidValue}
                placeholder={t('Local SSID')}
                topText
                icon={wifi}
                onPressInIcon={() => {
                  // WifiManager.getCurrentWifiSSID().then(
                  //   (ssid) => {
                  //     setSsidValue(ssid);
                  //   },
                  //   () => {
                  //     setSsidValue('error');
                  //   }
                  // );
                  request(
                    Platform.select({
                      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                    })
                  )
                    .then(res => {
                      if (res === 'granted') {
                        NetInfo.fetch('wifi')
                          .then(state => {
                            if (state?.details?.ssid) {
                              setSsidValue(state.details.ssid);
                            } else {
                              setSsidValue('error');
                            }
                          });

                      } else {
                        Alert.alert(t('Location is not enabled'));
                      }
                    });
                }}
              />
            </WrapperTextInput>
            <CermConditionsWrapper>
              <BaseSwitch
                onValueChange={setRemoteValue}
                value={remoteValue}
                addTextOn=""
                addTextOff=" "
              />
              <TouchableOpacity onPress={() => setRemoteValue(!remoteValue)}>
                <PreshTextCustom bool={remoteValue}>
                  {t('Remote access via ioBroker.pro')}
                </PreshTextCustom>
              </TouchableOpacity>
            </CermConditionsWrapper>

            {remoteValue && (
              <WrapperTextInput>
                <BaseTextInput
                  onChangeText={setEmailValue}
                  value={emailValue}
                  placeholder={t('Email')}
                  topText
                />
                <BaseTextInput
                  onChangeText={setPasswordValue}
                  value={passwordValue}
                  placeholder={t('Password')}
                  secureTextEntry={secure}
                  onPressInIcon={() => setSecure(false)}
                  onPressOutIcon={() => setSecure(true)}
                  icon={see}
                  topText
                />
              </WrapperTextInput>
            )}
            {/*<CermConditionsWrapper>
              <BaseSwitch
                onValueChange={setGpshValue}
                value={gpsValue}
                addTextOn=""
                addTextOff=" "
              />
              <TouchableOpacity onPress={() => setGpshValue(!gpsValue)}>
                <PreshTextCustom bool={gpsValue}>
                  {t('send GPS and battery to ioBroker')}
                </PreshTextCustom>
              </TouchableOpacity>
            </CermConditionsWrapper>*/}
            <WrapperTextInput>
              <BaseTextInput
                onChangeText={setInstanceValue}
                value={instanceValue}
                placeholder={t('Instance')}
                topText
              />
            </WrapperTextInput>
          </WrapperSettingsScroll>
          <ButtonWrapper>
            <BaseButton
              onPress={() => {
                saveSettings();
                navigation.goBack();
              }}
              width={w_normalize(120)}
              backgroundColor="#4dabf5"
              textColor="black"
              disabled={checkChanges}
            >
              {t('Save')}
            </BaseButton>
            <BaseButton
              onPress={() => navigation.goBack()}
              width={w_normalize(120)}
              backgroundColor="#dfe0e0"
              textColor="black"
            >
              {t('Close')}
            </BaseButton>
          </ButtonWrapper>
        </HeadWrapper>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};
//#4dabf5
//#dfe0e0
const CermConditionsWrapper = styled.View`
  flex-flow: row;
  align-items: center;
  flex-wrap: wrap;
  margin: ${styled_t_r_b_l_normalize(12, 0, 0, 12)};
`;
const PreshTextCustom = styled.Text`
  color: ${({ bool }) => (bool ? 'white' : 'silver')};
  font-weight: bold;
  margin: ${styled_t_r_b_l_normalize(0, 20, 15, 20)};
  font-size: ${h_normalize(16)};
`;
const TextCustom = styled.Text`
  color: silver;
  font-weight: 300;
  margin: ${styled_t_r_b_l_normalize(0, 20, 15, 20)};
  font-size: ${h_normalize(16)};
`;
const HeadWrapper = styled.View`
  width: 100%;
  /* flex: 1; */
  height: auto;
  background-color: #424242;
  border-radius: ${h_normalize(10)};
  justify-content: space-between;
  align-items: center;
`;
// const WrapperSlider = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   width: ${w_normalize(200)};
//   margin-bottom: ${w_normalize(10)};
//   align-items: center;
// `;
// const Triangel = styled.View`
//   width: 0;
//   height: 0;
//   background-color: transparent;
//   border-style: solid;
//   border-left-width: ${h_normalize(15)};
//   border-right-width: ${h_normalize(15)};
//   border-bottom-width: ${h_normalize(30)};
//   border-left-color: transparent;
//   border-right-color: transparent;
//   border-bottom-color: #4dabf5;
//   opacity: 0.8;
//   transform: rotate(-90deg);
// `;

const WrapperSettingsScroll = styled.ScrollView`
  /* flex: 1; */
  /* flex-grow: 1; */
  height: ${(bool) => (bool ? h_normalize(400) : undefined)};
  width: 100%;
`;
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${styled_t_r_b_l_normalize(30, 30, 40, 30)};
  opacity: 1;
`;
const WrapperTextInput = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: ${styled_t_r_b_l_normalize(20, 20, 0, 20)};
`;
const ButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: ${styled_t_r_b_l_normalize(10, 20, 10, 20)};
  margin-top: ${h_normalize(10)};
  height: ${h_normalize(100)};
`;
const Heading = styled(Text)`
  margin-top: ${h_normalize(30)};
  /* margin-bottom: ${h_normalize(30)}; */
  font-size: ${w_normalize(18)};
  padding: ${styled_t_r_b_l_normalize(0, 40, 30, 40)};
  color: white;
  font-weight: 300;
  text-align: center;
  width: 100%;
`;
export default Modal;
