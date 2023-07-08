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
  Alert,
} from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { GalleryPicker } from "../components/GalleryPicker";
import { CameraPicker } from "../components/CameraPicker";
import { LocationPicker } from "../components/LocationPicker";
import { getAddressFromMap } from "../utils/location";

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
    const getAddr = async () => {
      if (isFocused && route.params) {
        const address = await getAddressFromMap(
          route.params.lat,
          route.params.lng
        );

        const mapPicked = {
          lat: route.params.lat,
          lng: route.params.lng,
          address,
        };
        setPickedLocation(mapPicked);
      }
    };

    getAddr();
  }, [route, isFocused]);

  const submit = () => {
    if (!titleValue || !contentValue || !pickedLocation || !pickedImageUri) {
      Alert.alert("Fill all the required forms", "All forms must be filled");
      return;
    }
    const objData = {
      title: titleValue,
      content: contentValue,
      location: pickedLocation,
      image: pickedImageUri,
    };

    navigation.navigate("Home", {
      place: objData,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={titleValue}
            onChangeText={handleTitle}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            value={contentValue}
            onChangeText={handleContent}
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
            {pickedLocation && <Text>{pickedLocation?.address}</Text>}
          </View>
        </View>
        <View style={styles.submit}>
          <Button title="submit" onPress={submit} />
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
