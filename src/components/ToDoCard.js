import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { IconButton } from "./button";

export const ToDoCard = ({ title, content, image, address }) => {
  return (
    <View style={[styles.flexCol, styles.container]}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View style={[styles.flexCol, styles.contentContainer]}>
        <View style={[styles.flexCol, styles.headerContainer]}>
          <Text style={styles.header}>{title}</Text>
          <Text>{content}</Text>
        </View>
        <View style={[styles.flexRow, { gap: 8 }]}>
          <IconButton icon="location-pin" size={16} color="black" />
          <Text>{address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: { display: "flex", flexDirection: "row" },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    height: 420,
    shadowColor: "black",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 8,
    shadowRadius: 8,
  },
  image: {
    width: "100%",
    height: 210,
  },
  contentContainer: {
    gap: 20,
    padding: 12,
    justifyContent: "space-between",
  },
  headerContainer: {
    gap: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
