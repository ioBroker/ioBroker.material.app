import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { h_normalize, w_normalize } from '../../services/helpers/normalizeSize';
import BaseButton from '../BaseButton';
import settings from '../../../assets/settings.png';

const MyTabBar = ({ navigation }) => {
  return (
    <WrapperTabBar>
      <BaseButton
        onPress={() => navigation.navigate('Modal')}
        width={w_normalize(55)}
        height={w_normalize(55)}
        padding
        backgroundColor="rgba(77, 171, 245, 0.3)"
        textColor="white"
        minRadius
        circle
        icon={settings}
        // tintColor="silver"
      >
        {/* <Icon /> */}
      </BaseButton>
    </WrapperTabBar>
  );
};

const WrapperTabBar = styled(View)`
  flex: 1;
  height: auto;
  width: ${h_normalize(90)};
  justify-content: center;
  align-items: center;
  right: ${h_normalize(-5)};
  bottom: ${h_normalize(10)};
  position: absolute;
`;

const Icon = styled.Image`
  height: ${({ iconHeight }) =>
    iconHeight ? h_normalize(iconHeight) : h_normalize(30)};
  width: ${({ iconWidth }) =>
    iconWidth ? h_normalize(iconWidth) : h_normalize(30)};
`;
export default MyTabBar;
