//Core
import React, { useState } from "react";
import styled from "styled-components/native";
import {
  styled_h_normalize,
  styled_t_r_b_l_normalize,
  w_normalize,
} from "../../services/helpers/normalizeSize";

const BaseTextInput = ({
  icon,
  textError,
  width,
  height,
  color,
  placeholderTextColor,
  secureTextEntry = false,
  onPressInIcon = () => {},
  onPressOutIcon = () => {},
  placeholder,
  topText,
  ...props
}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  return (
    <InputWrapper width={width}>
      {textError && <ErrorText>{textError}</ErrorText>}
      {topText && <TopText>{placeholder}</TopText>}
      <StyledInput
        secureTextEntry={secureTextEntry}
        color={color}
        height={height}
        onFocus={(_) => setShowPlaceholder(false)}
        onBlur={(_) => setShowPlaceholder(true)}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : "#FFFFFF"
        }
        placeholder={showPlaceholder ? placeholder : null}
        {...props}
      />
      {icon && (
        <Touchable
          // hitSlop={{
          //   left: 20,
          //   top: 120,
          //   right: 20,
          //   bottom: 20,
          // }}
          onPressIn={onPressInIcon}
          onPressOut={onPressOutIcon}
        >
          <Icon tintColor="#4dabf5" resizeMode="contain" source={icon} />
        </Touchable>
      )}
    </InputWrapper>
  );
};

export default BaseTextInput;

const Touchable = styled.TouchableOpacity`
  position: absolute;
  z-index: 99999;
  top: ${styled_h_normalize(14)};
  right: ${w_normalize(0)};
  height: ${styled_h_normalize(50)};
  width: ${styled_h_normalize(75)};
  align-items: center;
  justify-content: center;
`;
const InputWrapper = styled.View`
  position: relative;
  text-align: center;
  width: ${({ width }) => (width ? width : "100%")};
`;
const ErrorText = styled.Text`
  color: red;
  position: absolute;
  top: ${styled_h_normalize(-12)};
  font-size: ${styled_h_normalize(10)};
`;
const TopText = styled.Text`
  color: white;
  position: absolute;
  top: ${styled_h_normalize(-12)};
  left: ${styled_h_normalize(20)};
  font-size: ${styled_h_normalize(18)};
`;
const Icon = styled.Image`
  height: ${styled_h_normalize(30)};
  width: ${styled_h_normalize(30)};
`;
const StyledInput = styled.TextInput`
  height: ${({ height }) => (height ? height : styled_h_normalize(55))};
  border: ${({ textError }) =>
    textError
      ? "1px solid rgba(223, 33, 27, 0.7)"
      : "1px solid rgba(23, 33, 43, 0.1)"};
  border-radius: ${styled_h_normalize(10)};
  font-size: ${styled_h_normalize(16)};
  line-height: ${styled_h_normalize(18)};
  margin-bottom: ${styled_h_normalize(12)};
  margin-top: ${styled_h_normalize(12)};
  color: ${({ color }) => (color ? color : "white")};
  padding: ${styled_t_r_b_l_normalize(10, 50, 10, 20)};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "rgba(255, 255, 255, 0.2)"};
`;
