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
import diaryDao from "../utils/data/local/diaryDao";
import { useThemeContext } from "../context/useThemeContext";
import Colors from "../constants/colors";
import { Controller, useForm } from "react-hook-form";

export const FormScreen = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
    resetField,
    getFieldState,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const [pickedImageUri, setPickedImageUri] = useState("");
  const [pickedLocation, setPickedLocation] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

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

  const submit = (value) => {
    console.log(value);
    if (!value.title || !value.content || !pickedLocation || !pickedImageUri) {
      Alert.alert("Fill all the required forms", "All forms must be filled");
      return;
    }
    const objData = {
      title: titleValue,
      content: contentValue,
      location: pickedLocation,
      image: pickedImageUri,
    };

    diaryDao
      .insertDiary(objData)
      .then(() => {
        // navigation.navigate("Home", {
        //   place: objData,
        // });
        navigation.navigate("Home");
      })
      .catch((err) => Alert.alert(err));
  };

  const { themeValue } = useThemeContext();

  const styles = getStyle(themeValue);

  return (
    <SafeAreaView>
      <ScrollView>
        <Button
          title="Reset"
          onPress={() => {
            resetField("title");
          }}
        />
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="title"
            rules={{ required: { message: "Title is required", value: true } }}
          />
          <Text style={styles.error}>{errors?.title?.message}</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Content</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                multiline={true}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="content"
            rules={{
              required: { message: "Content is required", value: true },
            }}
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
          <Button
            title="submit"
            onPress={() => {
              handleSubmit(submit);
              errors &&
                Alert.alert(
                  "Fill all the required forms",
                  "All forms must be filled"
                );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyle = (theme) =>
  StyleSheet.create({
    form: {
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    error: {
      color: "red",
    },
    label: {
      fontWeight: "bold",
      color: Colors[theme].white,
    },
    input: {
      borderBottomColor: Colors[theme].white,
      borderBottomWidth: 1,
      color: Colors[theme].white,
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
