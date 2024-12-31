// components/TextInput.tsx
import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

const TextInput: React.FC<TextInputProps> = (props) => {
  return <RNTextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default TextInput;
