import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const IconButton = ({ icon, size, color, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
