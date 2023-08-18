import React from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import { Button, Card } from "react-native-paper";
import Colors from "../constants/colors";
import { useThemeContext } from "../context/useThemeContext";
import diaryDao from "../utils/data/local/diaryDao";
import { IconButton } from "./button";

export const ToDoCard = ({ id, title, content, image, address, setReload }) => {
  const { themeValue } = useThemeContext();

  const styles = getStyle(themeValue);

  const handleDelete = async (id) => {
    try {
      const deletedRows = await diaryDao.deleteDiary(id);

      if (deletedRows > 0) {
        Alert.alert("Delete Succesful");
        setReload(true);
      }
    } catch (error) {
      Alert.alert("Delete Failed");
    }
  };
  return (
    // <View style={[styles.flexCol, styles.container]}>
    //   <Image
    //     style={styles.image}
    //     source={{
    //       uri: image,
    //     }}
    //   />
    //   <View style={[styles.flexCol, styles.contentContainer]}>
    //     <View style={[styles.flexCol, styles.headerContainer]}>
    //       <Text style={styles.header}>{title}</Text>
    //       <Text style={styles.text}>{content}</Text>
    //     </View>
    //     <View style={[styles.flexRow, { gap: 8 }]}>
    //       <IconButton
    //         icon="location-pin"
    //         size={16}
    //         color={Colors[themeValue].white}
    //       />
    //       <Text style={styles.text}>{address}</Text>
    //     </View>
    //     <Pressable
    //       style={[styles.flexRow, { gap: 8 }]}
    //       onPress={() => {
    //         handleDelete(id);
    //       }}
    //     >
    //       <IconButton icon="delete" size={16} color="red" />
    //       <Text style={styles.text}>Delete</Text>
    //     </Pressable>
    //   </View>
    // </View>
    <Card>
      <Card.Cover source={{ uri: image }} />

      <Card.Title title={title} />
      <Card.Content>
        <Text variant="bodyMedium">{content}</Text>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="delete" size={24} color="red" />
      </Card.Actions>
    </Card>
  );
};

const getStyle = (theme) =>
  StyleSheet.create({
    flexRow: { display: "flex", flexDirection: "row" },
    flexCol: {
      display: "flex",
      flexDirection: "column",
    },
    container: {
      width: "100%",
      height: 420,
      shadowColor: Colors[theme].white,
      borderColor: Colors[theme].white,
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
      color: Colors[theme].white,
    },
    text: {
      color: Colors[theme].white,
    },
  });
