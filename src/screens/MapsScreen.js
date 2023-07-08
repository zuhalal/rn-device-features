import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

export const MapsScreen = () => {
  return <MapView style={styles.maps}></MapView>;
};

const styles = StyleSheet.create({
  maps: {
    flex: 1,
  },
});
