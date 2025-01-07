// components/RadioButton.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          key={index}
          style={styles.optionContainer}
          onPress={() => onChange(option)}
        >
          <View
            style={[
              styles.circle,
              selected === option && styles.selectedCircle,
            ]}
          />
          <Text style={styles.label}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007BFF",
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: "#007BFF",
  },
  label: {
    fontSize: 16,
  },
});

export default RadioButton;
