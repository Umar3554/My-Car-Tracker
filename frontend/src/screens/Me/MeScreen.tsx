import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import {
  RootStackParamList2,
  useTheme as useAppTheme,
} from "../../navigation/AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const options = [
  {
    id: "1",
    title: "Change Theme",
    icon: "color-palette",
    action: "toggleTheme",
  },
  { id: "2", title: "Username: John Doe", icon: "person", action: "username" },
  { id: "3", title: "Logout", icon: "log-out", action: "logout" },
];

const MeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList2>>();
  const { colors } = useTheme();
  const { isDark, toggleTheme } = useAppTheme();

  const handleAction = async (action: string) => {
    if (action === "toggleTheme") {
      toggleTheme();
    } else if (action === "logout") {
      try {
        // Clear user authentication data from storage
        await AsyncStorage.removeItem("userToken");
        console.log("User logged out");
        // Navigate to the Login screen
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  // Dynamic border and shadow colors
  const borderColor = isDark ? "#fff" : "#333";
  const shadowColor = isDark ? "#444" : "#ccc";

  // Animation references
  const animatedValues = useRef(
    options.map(() => new Animated.Value(0))
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
      <Text style={[styles.header, { color: colors.text }]}>Me</Text>
      <FlatList
        data={options}
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
            <TouchableOpacity
              onPress={() => handleAction(item.action)}
              style={styles.touchable}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color="#FF4500" // Neon orange color for icons
                style={styles.icon}
              />
              <Text style={[styles.optionText, { color: colors.text }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
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
  touchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MeScreen;
