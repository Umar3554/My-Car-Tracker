// styles/authStyles.ts
import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF", // Adjust text color for better contrast
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 20,
    borderWidth: 0.5,
    borderColor: "#DDD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  linkText: {
    fontSize: 16,
    color: "#FF0000",
    textDecorationLine: "underline",
  },
});

export default authStyles;
