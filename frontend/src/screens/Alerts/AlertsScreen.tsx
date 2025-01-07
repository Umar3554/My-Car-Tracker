import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { useTheme as useAppTheme } from "../../navigation/AppNavigator";
import io from "socket.io-client";

// Define the type for the alert object
interface Alert {
  id: string;
  message: string;
  icon: string;
}

const AlertsScreen = () => {
  const { colors } = useTheme();
  const { isDark } = useAppTheme();

  const borderColor = isDark ? "#fff" : "#333";
  const shadowColor = isDark ? "#444" : "#ccc";

  // Explicitly set the type of the alerts state to be an array of Alert objects
  const [alerts, setAlerts] = useState<Alert[]>([]); // Type is Alert[]

  const animatedValues = useRef(
    alerts.map(() => new Animated.Value(0))
  ).current;

  // Setup socket connection for real-time alerts
  useEffect(() => {
    const socket = io("http://your-backend-url"); // Replace with your backend URL
    // Listen for new alert messages
    socket.on("newAlert", (alertMessage: any) => {
      setAlerts((prevAlerts) => [
        ...prevAlerts,
        {
          id: String(prevAlerts.length + 1),
          message: alertMessage,
          icon: "alert-circle",
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Start animation for alerts
  const startAnimation = () => {
    const animations = animatedValues.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 200, // Staggered animation
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  };

  // Trigger animations when alerts data changes
  useEffect(() => {
    if (alerts.length > 0) {
      startAnimation();
    }
  }, [alerts]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Alerts</Text>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            style={[
              styles.optionBox,
              {
                backgroundColor: colors.card,
                borderColor: borderColor,
                shadowColor: shadowColor,
                transform: [
                  {
                    translateX: animatedValues[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-50, 0], // Start above and slide into position
                    }),
                  },
                ],
                opacity: animatedValues[index], // Fade in effect
              },
            ]}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color="#ff6347"
              style={styles.icon}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              {item.message}
            </Text>
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  optionBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default AlertsScreen;
