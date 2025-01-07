import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import AlertsScreen from "../screens/Alerts/AlertsScreen";
import MeScreen from "../screens/Me/MeScreen";

export type RootStackParamList = {
  Home: undefined;
  Alerts: undefined;
  Me: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Alerts" component={AlertsScreen} />
      <Stack.Screen name="Me" component={MeScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
