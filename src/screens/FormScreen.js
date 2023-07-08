import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { GalleryPicker } from "../components/GalleryPicker";
import { CameraPicker } from "../components/CameraPicker";
import { LocationPicker } from "../components/LocationPicker";

export const FormScreen = () => {
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [pickedImageUri, setPickedImageUri] = useState("");
  const [pickedLocation, setPickedLocation] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const handleTitle = (value) => {
    setTitleValue(value);
  };

  const handleContent = (value) => {
    setContentValue(value);
  };

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPicked = {
        lat: route.params.lat,
        lng: route.params.lng,
      };
      setPickedLocation(mapPicked);
    }
  }, [route, isFocused]);

  return (
    <SafeAreaView>
      <ScrollView>
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
          <View>
            <LocationPicker
              pickedLocation={pickedLocation}
              onPickLocation={setPickedLocation}
            />
          </View>
        </View>
        <View style={styles.submit}>
          <Button title="submit" />
        </View>
      </ScrollView>
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
