import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToDoCard } from "../components/ToDoCard";
import INITIAL_DATA from "../constants/data.json";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={INITIAL_DATA}
        renderItem={({ item }) => (
          <ToDoCard
            address={item.location.address}
            content={item.content}
            image={item.image}
            title={item.title}
            key={item.id}
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
