import React from "react";
import { View } from "react-native";
import AppNavigation from "./components/AppNavigation";
import { StatusBar } from "react-native";
import styled from "styled-components";
import background from "../assets/background.png";
import { ImageBackground } from "react-native";
import { ContextWrapper } from "./components/ContextWrapper";

const App = () => {
  return (
    <WrapperApp>
      <StatusBar hidden />
      <BackgroundWrapper resizeMode="cover" source={background}>
        <ContextWrapper>
          <AppNavigation />
        </ContextWrapper>
      </BackgroundWrapper>
    </WrapperApp>
  );
};

const WrapperApp = styled(View)`
  flex: 1;
  flex-grow: 1;
`;
const BackgroundWrapper = styled(ImageBackground)`
  flex: 1;
  flex-grow: 1;
`;

export default App;
