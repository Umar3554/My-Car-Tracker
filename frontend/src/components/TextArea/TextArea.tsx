// components/TextArea.tsx
import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

const TextArea: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      style={[styles.textarea, props.style]}
      multiline={true}
      numberOfLines={4}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textarea: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: "top",
  },
});

export default TextArea;
