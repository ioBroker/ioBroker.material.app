import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { forModal } from "../../services/helpers/forModal";
import Modal from "../../pages/Modal";
import { forLastScreen } from "../../services/helpers/forLastScreen";
import WebViewComponent from "../../pages/WebViewComponent";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: { backgroundColor: "transparent" },
            headerShown: false,
            transparentCard: true,
            cardStyleInterpolator: forLastScreen,
            gestureEnabled: false,
          }}
          mode="modal"
          headerMode="none"
        >
          <Stack.Screen name="General" component={WebViewComponent} />
          <Stack.Screen
            options={{
              cardStyle: { backgroundColor: "transparent" },
              headerShown: false,
              transparentCard: true,
              cardStyleInterpolator: forModal,
            }}
            mode="modal"
            name="Modal"
            component={Modal}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default AppNavigation;
