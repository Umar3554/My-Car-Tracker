// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import TabNavigator from "./TabNavigator";

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <TabNavigator />
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

import React, { useState, createContext, useContext } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Appearance } from "react-native";
import TabNavigator from "./TabNavigator";

// Create a Theme Context
const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => void;
}>({
  isDark: true,
  toggleTheme: () => {},
});

const AppNavigator = () => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  const toggleTheme = () => setIsDark((prevTheme) => !prevTheme);

  const appTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <NavigationContainer theme={appTheme}>
        <TabNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); // Hook to use theme

export default AppNavigator;
