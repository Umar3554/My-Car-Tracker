// components/TextInput.tsx
import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <RNTextInput
      style={styles.input}
      placeholderTextColor="#D3D3D3"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: "#fff", // Typed text color
  },
});

export default TextInput;
