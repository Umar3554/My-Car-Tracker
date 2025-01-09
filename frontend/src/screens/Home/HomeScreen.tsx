import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import Slider from "@react-native-community/slider";
import Geolocation from "react-native-geolocation-service";
import io from "socket.io-client";
import homeStyles from "../../styles/homeStyles";

const HomeScreen = () => {
  const [region, setRegion] = useState({
    latitude: 33.771542,
    longitude: 72.751091,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [circleData, setCircleData] = useState({
    latitude: region.latitude,
    longitude: region.longitude,
    radius: 500,
  });

  const [carLocation, setCarLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "We need access to your location to show it on the map.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to proceed."
          );
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setCircleData({
            latitude,
            longitude,
            radius: 500,
          });
        },
        (error) => {
          Alert.alert("Error", "Failed to get current location.");
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();

    // // Establish socket connection
    // const socket = io("https://your-backend-api.com"); // Replace with your backend socket URL

    // socket.on(
    //   "carLocationUpdate",
    //   (location: { latitude: any; longitude: any }) => {
    //     setCarLocation({
    //       latitude: location.latitude,
    //       longitude: location.longitude,
    //     });
    //   }
    // );

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // const handleMarkerDrag = (e: {
  //   nativeEvent: { coordinate: { latitude: any; longitude: any } };
  // }) => {
  //   const newLatitude = e.nativeEvent.coordinate.latitude;
  //   const newLongitude = e.nativeEvent.coordinate.longitude;
  //   setCircleData({
  //     ...circleData,
  //     latitude: newLatitude,
  //     longitude: newLongitude,
  //   });
  // };

  const handleResizeCircle = (newRadius: number) => {
    setCircleData((prevState) => ({ ...prevState, radius: newRadius }));
  };

  const handleMapPress = (e: {
    nativeEvent: { coordinate: { latitude: any; longitude: any } };
  }) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCircleData((prevState) => ({
      ...prevState,
      latitude,
      longitude,
    }));
  };

  const handleSaveLocation = async () => {
    const { latitude, longitude, radius } = circleData;
    try {
      const response = await fetch(
        "https://your-backend-api.com/save-location",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude, radius }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Location and radius saved successfully!");
      } else {
        Alert.alert("Error", "Failed to save location.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={homeStyles.container}>
      <MapView
        style={homeStyles.map}
        initialRegion={region}
        provider="google"
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
      >
        <Circle
          key={`${circleData.latitude}-${circleData.longitude}-${circleData.radius}`}
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
          key="admin-location-marker"
          coordinate={{
            latitude: circleData.latitude,
            longitude: circleData.longitude,
          }}
          draggable
          // onDragEnd={handleMarkerDrag}
        />
        {carLocation.latitude && carLocation.longitude && (
          <Marker
            key="car-location-marker"
            coordinate={{
              latitude: carLocation.latitude,
              longitude: carLocation.longitude,
            }}
            title="Car Location"
          >
            <View style={homeStyles.carIcon}>
              <Text style={homeStyles.carIconText}>🚗</Text>
            </View>
          </Marker>
        )}
      </MapView>

      <View style={homeStyles.sliderContainer}>
        <Text style={homeStyles.sliderLabel}>
          Radius: {circleData.radius} meters
        </Text>
        <Slider
          style={homeStyles.slider}
          minimumValue={500}
          maximumValue={20000}
          step={50}
          value={circleData.radius}
          onValueChange={handleResizeCircle}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FF0000"
        />
        <TouchableOpacity
          style={homeStyles.saveButton}
          onPress={handleSaveLocation}
        >
          <Text style={homeStyles.saveButtonText}>Save Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
