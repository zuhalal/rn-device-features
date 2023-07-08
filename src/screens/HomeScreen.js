import { useIsFocused, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToDoCard } from "../components/ToDoCard";
import INITIAL_DATA from "../constants/data.json";

export const HomeScreen = () => {
  const [data, setData] = useState(INITIAL_DATA);

  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    // spread operator
    if (isFocused && route.params) {
      setData([...data, route.params.place]);
    }
  }, [isFocused, route]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ToDoCard
            address={item.location.address}
            content={item.content}
            image={item.image}
            title={item.title}
            key={`${item.title}${item.location.address}${item.image}`}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
