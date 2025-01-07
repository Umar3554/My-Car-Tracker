import { StyleSheet } from "react-native";
const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sliderContainer: {
    backgroundColor: "rgba(255,255,255,0.7)",
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
    borderRadius: 15,
    padding: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabel: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 5,
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 18,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  carIcon: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
  },
  carIconText: {
    fontSize: 20,
  },
});
export default homeStyles;
