import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, View } from "react-native";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={options}
        value={selectedValue}
        placeholder={{
          label: placeholder || "Select an option",
          value: null,
        }}
        style={{
          inputIOS: styles.input, // iOS text styling
          inputAndroid: styles.input, // Android text styling
          placeholder: styles.placeholder, // Placeholder text styling
          chevronContainer: styles.chevronContainer, // Arrow container styling
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5, // Border width for the dropdown
    borderColor: "#FFF", // White border
    borderRadius: 5, // Rounded corners
    backgroundColor: "transparent", // Optional: ensure background is transparent
  },
  input: {
    padding: 0, // Adjust padding for better appearance
    fontSize: 14, // Font size
    color: "#FFF", // White text color
  },
  placeholder: {
    color: "#D3D3D3", // Gray placeholder text color
    fontWeight: "100",
  },
  chevronContainer: {
    transform: [{ rotate: "90deg" }], // Adjust if the chevron is in a different orientation
    // No need for color property here, if you want to change its appearance
  },
});

export default Dropdown;
