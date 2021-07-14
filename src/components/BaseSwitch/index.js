//Core
import React from 'react';
import styled from 'styled-components/native';
import {
  styled_h_normalize,
  w_normalize,
} from '../../services/helpers/normalizeSize';

const BaseSwitch = (props) => {
  const { value, textError, addTextOn = '', AddTextOff = '' } = props;
  return (
    <SwitchWrapper>
      {textError && <ErrorText>{textError}</ErrorText>}
      <SwitchCustom
        trackColor={{ false: 'white', true: '#4dabf5' }}
        thumbColor={!value ? '#4dabf5' : 'white'}
        ios_backgroundColor="white"
        style={{ transform: [{ scaleX: 1 }, { scaleY: 0.9 }] }}
        {...props}
      />
      {<AddText numberOfLines={1}>{value ? addTextOn : AddTextOff}</AddText>}
    </SwitchWrapper>
  );
};

export default BaseSwitch;

//Styles
const SwitchWrapper = styled.View`
  position: relative;
  text-align: center;
`;

const ErrorText = styled.Text`
  color: red;
  position: absolute;
  top: ${styled_h_normalize(-12)};
  font-size: ${styled_h_normalize(10)};
`;
const AddText = styled.Text`
  color: #fbfbfb;
  width: ${w_normalize(70)};
  padding-left: 30px;
  opacity: 0.5;
  font-size: ${styled_h_normalize(12)};
`;
const SwitchCustom = styled.Switch``;
