import React, { useState, createContext, useContext, useEffect } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import LoginScreen from "../screens/Login/LoginScreen";
import SignUpScreen from "../screens/SignUp/SignUpScreen";

export type RootStackParamList2 = {
  SignUp: undefined;
  Login: undefined;
  MainApp: undefined;
};

const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => void;
}>({
  isDark: true,
  toggleTheme: () => {},
});

const Stack = createNativeStackNavigator<RootStackParamList2>();

const AppNavigator = () => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("accessToken"); // Check for the accessToken
      setIsLoggedIn(!!token); // If token exists, set logged in status to true
    };

    checkLoginStatus();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === "dark");
    });

    return () => listener.remove();
  }, []);

  const toggleTheme = () => setIsDark((prevTheme) => !prevTheme);

  const appTheme = isDark ? DarkTheme : DefaultTheme;

  if (isLoggedIn === null) {
    return null; // Optional loading spinner or splash screen
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <NavigationContainer theme={appTheme}>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "MainApp" : "Login"} // Navigate based on login status
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainApp" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default AppNavigator;
