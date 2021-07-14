//Core
import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import {
  h_normalize,
  styled_h_normalize,
  styled_v_h_normalize,
} from "../../services/helpers/normalizeSize";

const BaseButton = ({
  align,
  backgroundColor,
  textColor,
  children,
  borderColor,
  onPress,
  width,
  height,
  radius = false,
  icon = false,
  minRadius,
  iconWidth,
  iconHeight,
  tintColor = "#4dabf5",
  ...props
}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ width: width, alignItems: align ? align : "center" }}>
      <Button
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        onPress={onPress}
        width={width}
        height={height}
        radius={radius}
        minRadius={minRadius}
        {...props}
      >
        <PublicButtonText
          disabled={props.disabled}
          radius={radius}
          textColor={textColor}
        >
          {children}
        </PublicButtonText>
        {icon && (
          <Icon
            iconWidth={iconWidth}
            iconHeight={iconHeight}
            resizeMode="contain"
            source={icon}
            tintColor={tintColor}
          />
        )}
      </Button>
    </View>
  );
};

export default BaseButton;

//Styles

const Icon = styled.Image`
  height: ${({ iconHeight }) =>
    iconHeight ? h_normalize(iconHeight) : h_normalize(30)};
  width: ${({ iconWidth }) =>
    iconWidth ? h_normalize(iconWidth) : h_normalize(30)};
`;
const Button = styled.TouchableOpacity`
  background-color: ${({ backgroundColor, disabled }) =>
    disabled ? "rgba(255, 255, 255, 0.12)" : backgroundColor};
  border-radius: ${({ radius, minRadius }) =>
    radius ? h_normalize(15) : minRadius ? h_normalize(100) : h_normalize(10)};
  padding: ${({ padding }) => (padding ? 0 : styled_v_h_normalize(0, 30))};
  width: ${({ width }) =>
    width ? (typeof width === "number" ? h_normalize(width) : width) : "auto"};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor}` : "none"};
  height: ${({ height }) =>
    height ? h_normalize(height) : styled_h_normalize(55)};
`;

const PublicButtonText = styled.Text`
  font-weight: bold;
  font-size: ${({ radius }) =>
    radius ? styled_h_normalize(25) : styled_h_normalize(16)};
  line-height: ${({ radius }) =>
    radius ? styled_h_normalize(25) : styled_h_normalize(18)};
  color: ${({ textColor, disabled }) =>
    disabled ? 'rgba(255, 255, 255, 0.3)' : textColor};
`;
