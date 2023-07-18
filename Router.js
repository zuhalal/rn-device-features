import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { IconButton } from "./src/components/button";
import { useThemeContext } from "./src/context/useThemeContext";
import { FormScreen } from "./src/screens/FormScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MapsScreen } from "./src/screens/MapsScreen";

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
              <IconButton
                icon="add"
                color={tintColor}
                size={24}
                onPress={() => navigation.navigate("Form")}
              />
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
        <Stack.Screen name="Maps" component={MapsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
