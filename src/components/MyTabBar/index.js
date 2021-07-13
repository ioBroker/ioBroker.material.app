import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { h_normalize, w_normalize } from '../../services/helpers/normalizeSize';
import BaseButton from '../BaseButton';

const MyTabBar = ({ navigation }) => {
  return (
    <WrapperTabBar>
      <BaseButton
        onPress={() => navigation.navigate('Modal')}
        width={w_normalize(55)}
        padding
        backgroundColor="rgba(44, 27, 147, 0.9)"
        textColor="white"
        minRadius
      >
        ...
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
  right: ${h_normalize(0)};
  bottom: ${h_normalize(80)};
  position: absolute;
`;

export default MyTabBar;
