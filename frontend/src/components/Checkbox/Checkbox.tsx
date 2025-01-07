// components/Checkbox.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handlePress = () => {
    onChange(!checked); // Toggle the checkbox value
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#007BFF",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  label: {
    fontSize: 16,
  },
});

export default Checkbox;
