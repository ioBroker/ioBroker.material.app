import { Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  h_normalize,
  styled_t_r_b_l_normalize,
  w_normalize,
} from '../../services/helpers/normalizeSize';
import BaseButton from '../../components/BaseButton';
import { resources } from '../../services/locales';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import wifi from '../../../assets/wifi.png';
import see from '../../../assets/see.png';
import BaseTextInput from '../../components/BaseTextInput';
import BaseSwitch from '../../components/BaseSwitch';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import { ContextWrapperCreate } from '../../components/ContextWrapper';

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

const style = {
  smallText: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(44, 27, 147, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    fontSize: w_normalize(24),
    color: 'silver',
    opacity: 0.6,
  },
  bigText: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(44, 27, 147, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    fontSize: w_normalize(48),
    color: '#FFFFFF',
  },
  line: {
    position: 'absolute',
    borderBottomColor: '#580056',
    borderBottomWidth: 1,
    height: '50%',
    width: '40%',
  },
};

const Modal = ({ navigation, route: { params } }) => {
  useEffect(() => {
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
  }, []);

  const { i18n, t } = useTranslation();
  const arrLang = Object.keys(resources);
  const arrLangIndexCurrent = arrLang.indexOf(i18n.language);
  const arrLangIndexCurrentPrev =
    arrLangIndexCurrent > 0 ? arrLangIndexCurrent - 1 : arrLang.length - 1;
  const arrLangIndexCurrentNext =
    arrLangIndexCurrent < arrLang.length - 1 ? arrLangIndexCurrent + 1 : 0;

  const { switchObj, emailObj, passwordObj, ssidObj, localObj } =
    useContext(ContextWrapperCreate);
  const [secure, setSecure] = useState(true);

  return (
    <TouchableWithoutFeedback
      onStartShouldSetResponder={() => true}
      onPress={Keyboard.dismiss}
    >
      <Wrapper>
        <HeadWrapper style={shadow}>
          <Heading>{t('Settings')}</Heading>
          <WrapperSlider>
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
                  transform: [{ rotate: '90deg' }],
                }}
              />
            </TouchableOpacity>
          </WrapperSlider>
          <WrapperTextInput>
            <BaseTextInput
              onChangeText={localObj.setLocalValue}
              value={localObj.localValue}
              placeholder={t('Local URL')}
              topText
            />
            <BaseTextInput
              onChangeText={ssidObj.setSsidValue}
              value={ssidObj.ssidValue}
              placeholder={t('Local SSID')}
              topText
              icon={wifi}
              onPressInIcon={() => {
                WifiManager.getCurrentWifiSSID().then(
                  (ssid) => {
                    ssidObj.setSsidValue(ssid);
                  },
                  () => {
                    ssidObj.setSsidValue('error');
                  }
                );
              }}
            />
          </WrapperTextInput>
          <CermConditionsWrapper>
            <BaseSwitch
              onValueChange={switchObj.setSwitchValue}
              value={switchObj.switchValue}
              addTextOn=""
              addTextOff=" "
            />
            <TouchableOpacity
              onPress={() => switchObj.setSwitchValue(!switchObj.switchValue)}
            >
              <PreshTextCustom>
                {t('Remote access via ioBroker.pro')}
              </PreshTextCustom>
            </TouchableOpacity>
          </CermConditionsWrapper>

          {switchObj.switchValue && (
            <WrapperTextInput>
              <BaseTextInput
                onChangeText={emailObj.setEmailValue}
                value={emailObj.emailValue}
                placeholder={t('Email')}
                topText
              />
              <BaseTextInput
                onChangeText={passwordObj.setPasswordValue}
                value={passwordObj.passwordValue}
                placeholder={t('Password')}
                secureTextEntry={secure}
                onPressInIcon={() => setSecure(false)}
                onPressOutIcon={() => setSecure(true)}
                icon={see}
                topText
              />
            </WrapperTextInput>
          )}
          <ButtonWrapper>
            <BaseButton
              onPress={() => navigation.goBack()}
              width={w_normalize(120)}
              backgroundColor="#F8E71C"
              textColor="#444444"
            >
              {t('Save')}
            </BaseButton>
            <BaseButton
              onPress={() => navigation.goBack()}
              width={w_normalize(120)}
              backgroundColor="rgba(44, 27, 147, 0.2)"
              textColor="white"
            >
              {t('Close')}
            </BaseButton>
          </ButtonWrapper>
        </HeadWrapper>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};
const CermConditionsWrapper = styled.View`
  flex-flow: row;
  align-items: center;
  margin: ${styled_t_r_b_l_normalize(12, 0, 0, 0)};
`;
const PreshTextCustom = styled.Text`
  color: white;
  font-weight: bold;
  margin: ${styled_t_r_b_l_normalize(0, 20, 15, 20)};
  font-size: ${h_normalize(16)};
`;
const HeadWrapper = styled.View`
  width: 100%;
  background-color: #306bff;
  border-radius: ${h_normalize(10)};
  justify-content: space-between;
  align-items: center;
`;
const WrapperSlider = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${w_normalize(200)};
  align-items: center;
`;
const Triangel = styled.View`
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-left-width: ${h_normalize(15)};
  border-right-width: ${h_normalize(15)};
  border-bottom-width: ${h_normalize(30)};
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: rgba(44, 27, 147, 0.6);
  opacity: 0.8;
  transform: rotate(-90deg);
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
  padding: ${styled_t_r_b_l_normalize(0, 20, 0, 20)};
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
  margin-top: ${h_normalize(40)};
  margin-bottom: ${h_normalize(10)};
  font-size: ${w_normalize(18)};
  padding: ${styled_t_r_b_l_normalize(0, 40, 0, 40)};
  color: white;
  font-weight: 300;
  text-align: center;
  width: 100%;
`;
export default Modal;
