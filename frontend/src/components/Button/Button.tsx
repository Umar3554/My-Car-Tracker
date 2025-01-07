// components/Button.tsx
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#FFA500", // Orange shadow color
    shadowOffset: { width: 0, height: 0 }, // Shadow spreads equally in all directions
    shadowOpacity: 1, // Fully opaque shadow
    shadowRadius: 90, // Adjust for a glowing effect
    elevation: 5, // Required for Android to render shadow
  },
  disabled: {
    backgroundColor: "#A9A9A9",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Button;
