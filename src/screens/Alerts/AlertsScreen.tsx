import React, { useRef } from "react";
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

const dummyAlerts = [
  { id: "1", message: "Engine temperature is too high.", icon: "thermometer" },
  { id: "2", message: "Scheduled maintenance is due.", icon: "construct" },
  { id: "3", message: "Low tire pressure detected.", icon: "speedometer" },
  { id: "4", message: "Battery level is low.", icon: "battery-dead" },
  { id: "5", message: "Oil change is required soon.", icon: "water" },
];

const AlertsScreen = () => {
  const { colors } = useTheme();
  const { isDark } = useAppTheme();

  const borderColor = isDark ? "#fff" : "#333";
  const shadowColor = isDark ? "#444" : "#ccc";

  // Animation references
  const animatedValues = useRef(
    dummyAlerts.map(() => new Animated.Value(0))
  ).current;

  // Start animation
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

  // Trigger animations on mount
  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Alerts</Text>
      <FlatList
        data={dummyAlerts}
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
                    translateY: animatedValues[index].interpolate({
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
