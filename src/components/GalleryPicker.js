import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const GalleryPicker = ({ onPickImage }) => {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    onPickImage(image);
  }, [image]);

  return (
    <View style={{ width: "100%" }}>
      <Button title="Pick an image from Gallery" onPress={pickImage} />
    </View>
  );
};
