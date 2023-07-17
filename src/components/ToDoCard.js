import React from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import diaryDao from "../utils/data/local/diaryDao";
import { IconButton } from "./button";

export const ToDoCard = ({ id, title, content, image, address, setReload }) => {
  const handleDelete = async (id) => {
    try {
      const deletedRows = await diaryDao.deleteDiary(id);

      if (deletedRows > 0) {
        Alert.alert("Delete Succesful");
        setReload(true);
      } else {
        Alert.alert("Delete Failed");
      }
    } catch (error) {
      Alert.alert("Delete Failed");
    }
  };
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
        <Pressable
          style={[styles.flexRow, { gap: 8 }]}
          onPress={() => {
            handleDelete(id);
          }}
        >
          <IconButton icon="delete" size={16} color="red" />
          <Text>Delete</Text>
        </Pressable>
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
