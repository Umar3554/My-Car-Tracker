import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import StackNavigator from "./StackNavigator";
import AlertsScreen from "../screens/Alerts/AlertsScreen";
import MeScreen from "../screens/Me/MeScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home Page") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Alerts") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Me") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Ionicons
              name={iconName || "alert-circle"}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Hide the default header
      })}
    >
      <Tab.Screen name="Home Page" component={StackNavigator} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />

      <Tab.Screen name="Me" component={MeScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
