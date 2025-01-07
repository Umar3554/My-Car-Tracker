import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import axios from "axios"; // Import axios
import { NavigationProp, useNavigation } from "@react-navigation/native";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import { RootStackParamList2 } from "../../navigation/AppNavigator";
import authStyles from "../../styles/authStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const api = axios.create({
    baseURL: "http://192.168.1.91:13000", // Use your local backend IP and port
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList2>>();

  const fields = [
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter Email",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter Password",
    },

    { type: "button", name: "submit", label: "Log In" },
  ];

  const handleSubmit = async (values: { [key: string]: string }) => {
    if (values.email && values.password) {
      try {
        // Send login data to backend API
        const response = await api.post("/auth/signin", {
          email: values.email,
          password: values.password,
        });

        if (response.status === 201) {
          // On success, navigate to the main app
          const { accessToken } = response.data; // Assuming the token is in response.data.accessToken
          await AsyncStorage.setItem("accessToken", accessToken);
          navigation.navigate("MainApp");
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please fill in both email and password!");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/carBg/car.jpg")}
      style={authStyles.backgroundImage}
      resizeMode="cover"
    >
      <View style={authStyles.overlay}>
        <Text style={authStyles.heading}>Log In</Text>
        <View style={authStyles.formContainer}>
          <DynamicForm fields={fields} onSubmit={handleSubmit} />
        </View>
        <View>
          <Text style={authStyles.text}>
            Not having an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={authStyles.linkText}>Create One</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
