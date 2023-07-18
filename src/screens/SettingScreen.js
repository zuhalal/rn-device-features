import RadioButtonRN from "radio-buttons-react-native";
import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import { useThemeContext } from "../context/useThemeContext";

export const SettingScreen = () => {
  const { themeValue, initialValue, themeOperations } = useThemeContext();

  const options = [
    {
      label: "Light Mode",
      value: "light",
    },
    {
      label: "Dark Mode",
      value: "dark",
    },
    {
      label: "System Default",
      value: "default",
    },
  ];
  return (
    <View style={styles.container}>
      <RadioButtonRN
        data={options}
        selectedBtn={(e) => themeOperations(e?.value)}
        initial={initialValue}
        activeColor={Colors[themeValue]?.activeColor}
        deactiveColor={Colors[themeValue]?.deactiveColor}
        boxActiveBgColor={Colors[themeValue]?.boxActiveColor}
        boxDeactiveBgColor={Colors[themeValue]?.themeColor}
        textColor={Colors[themeValue]?.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
