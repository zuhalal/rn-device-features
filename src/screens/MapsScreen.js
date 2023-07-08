import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IconButton } from "../components/button";

export const MapsScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState();
  const navigation = useNavigation();

  const region = {
    latitude: 38.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat,
      lng,
    });
  };

  const saveLocation = () => {
    if (!selectedLocation) {
      Alert.alert("Choose location first!");
      return;
    }

    navigation.navigate("Form", {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add-location"
          size={24}
          color={tintColor}
          onPress={saveLocation}
        />
      ),
    });
  }, [saveLocation]);

  return (
    <MapView
      style={styles.maps}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="marked"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  maps: {
    flex: 1,
  },
});
