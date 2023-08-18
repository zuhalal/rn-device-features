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
import { Controller, useFieldArray, useForm } from "react-hook-form";

export const FormScreen = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      activities: [{ name: "" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "activities",
    }
  );

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
        {/* <Button
          title="Reset"
          onPress={() => {
            resetField("title");
          }}
        /> */}
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
          {errors && <Text style={styles.error}>{errors?.title?.message}</Text>}
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
          {errors && (
            <Text style={styles.error}>{errors?.content?.message}</Text>
          )}
        </View>
        <View style={[styles.form, styles.flexCol, { gap: 12 }]}>
          <Text style={styles.label}>Activity</Text>
          {fields.map((item, index) => (
            <View key={item.id} style={[styles.flexCol, { gap: 12 }]}>
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
                name={`activities.${index}.name`}
              />
              <Button
                color="#841584"
                title="Remove"
                onPress={() => {
                  remove(index);
                }}
              />
            </View>
          ))}
          <Button
            title="Add Activity"
            onPress={() => {
              append({ name: "" });
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
          <Button title="submit" onPress={handleSubmit(submit)} />
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
