// components/Uploader.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const Uploader: React.FC<UploaderProps> = ({ onUpload, fileUri, label }) => {
  const handleUpload = () => {
    launchImageLibrary(
      {
        mediaType: "video",
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (uri) onUpload(uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload File</Text>
      </Pressable>
      {fileUri && <Image source={{ uri: fileUri }} style={styles.preview} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 10,
  },
});
export default Uploader;
