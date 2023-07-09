import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { IconButton } from "./src/components/button";
import { FormScreen } from "./src/screens/FormScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MapsScreen } from "./src/screens/MapsScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#black",
    alignItems: "center",
    justifyContent: "center",
  },
});
