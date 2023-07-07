import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Pressable,
  Button,
} from "react-native";

export const FormScreen = () => {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [pickedImageUri, setPickedImageUri] = useState("");
  const [pickedLocation, setPicketLocation] = useState(null);

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
          <Text>No Image Yet.</Text>
        )}
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Location</Text>
        {pickedLocation ? (
          <View>{/* To DO: use map view */}</View>
        ) : (
          <Text>No Image Yet.</Text>
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
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    color: "black",
  },
  submit: {
    margin: 16,
  },
});
