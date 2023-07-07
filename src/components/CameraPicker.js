import React, { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const CameraPicker = ({ onPickImage }) => {
  const [image, setImage] = useState("");
  const [cameraPerm, requestCameraPerm] = ImagePicker.useCameraPermissions();

  const verifyPerm = async () => {
    if (cameraPerm.status === ImagePicker.PermissionStatus.UNDETERMINED) {
      const res = await requestCameraPerm();

      return res.granted;
    }

    if (cameraPerm.status === ImagePicker.PermissionStatus.DENIED) {
      Alert.alert("Not Permitted to access camera");
      return false;
    }

    return true;
  };

  const pickImage = async () => {
    const isAllowed = await verifyPerm();

    if (!isAllowed) {
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
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
      <Button title="Pick an image from Camera" onPress={pickImage} />
    </View>
  );
};
