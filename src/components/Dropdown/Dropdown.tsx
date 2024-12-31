// components/Dropdown.tsx
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder,
}) => {
  return (
    <RNPickerSelect
      onValueChange={onValueChange}
      items={options}
      value={selectedValue}
      placeholder={{
        label: placeholder || "Select an option",
        value: null,
      }}
      style={{
        inputIOS: styles.input,
        inputAndroid: styles.input,
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: "#000",
  },
});

export default Dropdown;
