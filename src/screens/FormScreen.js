import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, View, StyleSheet, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GalleryPicker } from "../components/GalleryPicker";
import { CameraPicker } from "../components/CameraPicker";

export const FormScreen = () => {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [pickedImageUri, setPickedImageUri] = useState("");
  const [pickedLocation, setPicketLocation] = useState(null);
  const navigation = useNavigation();

  const handleTitle = (value) => {
    setTitleValue(value);
  };

  const handleContent = (value) => {
    setContentValue(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={titleValue}
          onChange={handleTitle}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          value={contentValue}
          onChange={handleContent}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Picture</Text>
        {pickedImageUri ? (
          <Image
            style={styles.image}
            source={{
              uri: pickedImageUri,
            }}
          />
        ) : (
          <View>
            <Text>No Image Yet.</Text>
          </View>
        )}
        <View style={[styles.flexCol, { gap: 8 }]}>
          <GalleryPicker onPickImage={setPickedImageUri} />
          <CameraPicker onPickImage={setPickedImageUri} />
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Location</Text>
        {pickedLocation ? (
          <View>{/* To DO: use map view */}</View>
        ) : (
          <Text>No Location Yet.</Text>
        )}
      </View>
      <View style={styles.submit}>
        <Button title="submit" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    color: "black",
  },
  submit: {
    margin: 16,
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 200,
  },
});
