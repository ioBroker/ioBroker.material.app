import React from "react";
import { View } from "react-native";
import AppNavigation from "./components/AppNavigation";
import { StatusBar } from "react-native";
import styled from "styled-components";
import background from "../assets/background.png";
import { ImageBackground } from "react-native";
import { ContextWrapper } from "./components/ContextWrapper";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native";

const App = () => {
  return (
    <WrapperApp>
      <StatusBar hidden={Platform.OS !== "ios" ? true : false} />
      <BackgroundWrapper resizeMode="cover" source={background}>
        <WrapperContent>
          <ContextWrapper>
            <AppNavigation />
          </ContextWrapper>
        </WrapperContent>
      </BackgroundWrapper>
    </WrapperApp>
  );
};

const WrapperApp = styled(View)`
  flex: 1;
  flex-grow: 1;
`;
const WrapperContent = styled(SafeAreaView)`
  flex: 1;
  flex-grow: 1;
`;
const BackgroundWrapper = styled(ImageBackground)`
  flex: 1;
  flex-grow: 1;
`;

export default App;
