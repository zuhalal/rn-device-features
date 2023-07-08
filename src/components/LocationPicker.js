import React, { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview } from "../utils/location";
import { useNavigation } from "@react-navigation/native";

export const LocationPicker = () => {
  const [location, setLocation] = useState(null);
  const [locationPerm, requrestLocationPerm] = useForegroundPermissions();
  const navigation = useNavigation();

  const verifyPerm = async () => {
    if (locationPerm.status === PermissionStatus.UNDETERMINED) {
      const res = await requrestLocationPerm();

      return res.granted;
    }

    if (locationPerm.status === PermissionStatus.DENIED) {
      Alert.alert("Not Permitted to access location");
      return false;
    }

    return true;
  };

  const getCurrentLocation = async () => {
    const isAllowed = await verifyPerm();

    if (!isAllowed) {
      return;
    }

    const location = await getCurrentPositionAsync();

    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickLocation = () => {
    navigation.navigate("Maps");
  };

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {location && (
        <Image
          style={styles.image}
          source={{
            uri: getMapPreview(location?.lat, location?.lng),
          }}
        />
      )}
      <Button title="Pick from User Location" onPress={getCurrentLocation} />
      <Button title="Pick from Map" onPress={pickLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
  },
});
