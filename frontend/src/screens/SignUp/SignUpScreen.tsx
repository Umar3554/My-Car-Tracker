import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import axios from "axios"; // Import axios
import { NavigationProp, useNavigation } from "@react-navigation/native";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import authStyles from "../../styles/authStyles";
import { RootStackParamList2 } from "../../navigation/AppNavigator";
import Config from "react-native-config";
const API_URL = Config.API_URL;

const SignUpScreen = () => {
  const api = axios.create({
    baseURL: "http://192.168.1.94:13000", // Use your local backend IP and port
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList2>>();

  const fields = [
    {
      type: "text",
      name: "name",
      placeholder: "Enter Your Name",
      label: "Name",
    },
    {
      type: "email",
      name: "email",
      placeholder: "Enter Email",
      label: "Email",
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter Password",
      label: "Password",
    },
    {
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      label: "Confirm Password",
    },
    {
      type: "text",
      name: "carName",
      placeholder: "Enter Car Name",
      label: "Car Name",
    },
    {
      type: "text",
      name: "carNumber",
      placeholder: "Enter Car Number",
      label: "Car Number",
    },

    { type: "button", name: "submit", label: "Sign Up" },
  ];

  const handleSubmit = async (values: { [key: string]: string }) => {
    // Password and Confirm Password Validation
    if (values.password !== values.confirmPassword) {
      alert(
        "Password Mismatch, Your passwords do not match. Please try again."
      );
      return;
    }

    if (
      values.name &&
      values.email &&
      values.password &&
      values.carName &&
      values.carNumber
    ) {
      try {
        console.log(api);
        // Send data to backend API
        const response = await api.post("/auth/signup", {
          name: values.name,
          email: values.email,
          password: values.password,
          carName: values.carName,
          carNumber: values.carNumber,
        });
        if (response.status === 201) {
          // On success, show message
          alert(
            "Sign Up Successful, You can now log in with your credentials."
          );
          // Navigate to Login screen
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error storing user data:", error);
        alert("Error, An error occurred while signing up. Please try again.");
      }
    } else {
      alert("Missing Fields, Please fill all required fields!");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/carBg/car.jpg")}
      style={authStyles.backgroundImage}
      resizeMode="cover"
    >
      <View style={authStyles.overlay}>
        <Text style={authStyles.heading}>Sign Up</Text>
        <View style={authStyles.formContainer}>
          <DynamicForm fields={fields} onSubmit={handleSubmit} />
        </View>
        <View>
          <Text style={authStyles.text}>
            Already have an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={authStyles.linkText}>Log in here</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;
