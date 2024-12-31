import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import Slider from "@react-native-community/slider";

const HomeScreen = () => {
  const [region, setRegion] = useState({
    latitude: 33.771542,
    longitude: 72.751091,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [circleData, setCircleData] = useState({
    latitude: 33.771542,
    longitude: 72.751091,
    radius: 500,
  });

  const handleMarkerDrag = (e: {
    nativeEvent: { coordinate: { latitude: any; longitude: any } };
  }) => {
    const newLatitude = e.nativeEvent.coordinate.latitude;
    const newLongitude = e.nativeEvent.coordinate.longitude;
    setCircleData({
      ...circleData,
      latitude: newLatitude,
      longitude: newLongitude,
    });
  };

  const handleResizeCircle = (newRadius: any) => {
    setCircleData({ ...circleData, radius: newRadius });
  };

  const handleMapPress = (e: {
    nativeEvent: { coordinate: { latitude: any; longitude: any } };
  }) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCircleData({
      ...circleData,
      latitude,
      longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        provider="google"
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress} // Handle taps on the map
      >
        <Circle
          center={{
            latitude: circleData.latitude,
            longitude: circleData.longitude,
          }}
          radius={circleData.radius}
          strokeWidth={2}
          strokeColor="rgba(255, 0, 0, 0.5)"
          fillColor="rgba(255, 0, 0, 0.2)"
        />
        <Marker
          coordinate={{
            latitude: circleData.latitude,
            longitude: circleData.longitude,
          }}
          draggable
          onDragEnd={handleMarkerDrag} // Handle drag events of the marker
        />
      </MapView>

      {/* Slider to resize the circle */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          Radius: {circleData.radius} meters
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={500}
          maximumValue={10000}
          step={50}
          value={circleData.radius}
          onValueChange={handleResizeCircle}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FF0000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sliderContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    alignItems: "center",
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
});

export default HomeScreen;
