import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "./src/components/button";
import { useThemeContext } from "./src/context/useThemeContext";
import { FormScreen } from "./src/screens/FormScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MapsScreen } from "./src/screens/MapsScreen";
import { SettingScreen } from "./src/screens/SettingScreen";

const Stack = createNativeStackNavigator();

const Router = () => {
  const { themeValue } = useThemeContext();

  return (
    <NavigationContainer
      theme={themeValue == "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: ({ tintColor }) => (
              <View style={styles.headerRight}>
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("Form")}
                />
                <IconButton
                  icon="settings"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("Settings")}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{
            title: "Add New Diary",
          }}
        />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="Maps" component={MapsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});

export default Router;
