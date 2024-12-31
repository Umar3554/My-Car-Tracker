// screens/SignUpScreen.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DynamicForm from "../../components/DynamicForm/DynamicForm";

const SignUpScreen = () => {
  const fields = [
    { type: "text", name: "name", placeholder: "Enter Your Name" },
    { type: "email", name: "email", placeholder: "Enter Email" },
    { type: "password", name: "password", placeholder: "Enter Password" },
    {
      type: "text",
      name: "confirmPassword",
      placeholder: "Confirm Password",
    },
    {
      type: "dropdown",
      name: "country",
      label: "Select Country",
      options: ["USA", "Canada", "UK", "India", "Australia"],
    },
    {
      type: "dropdown",
      name: "city",
      label: "Select City",
      options: ["New York", "Toronto", "London", "Mumbai", "Sydney"],
    },
    { type: "checkbox", name: "subscribe", label: "Subscribe to Newsletter" },
    {
      type: "uploader",
      name: "profilePicture",
      label: "Upload Profile Picture",
    },
    { type: "button", name: "submit", label: "Sign Up" },
  ];

  const handleSubmit = (values: { [key: string]: string }) => {
    console.log("Form Values:", values);
    // Add validation or submission logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.formContainer}>
        <DynamicForm fields={fields} onSubmit={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light background color
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Darker text color
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#FFF", // White form background
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#DDD", // Light border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
});

export default SignUpScreen;
