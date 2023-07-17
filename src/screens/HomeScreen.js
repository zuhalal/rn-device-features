import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToDoCard } from "../components/ToDoCard";
import diaryDao from "../utils/data/local/diaryDao";
export const HomeScreen = () => {
  const [data, setData] = useState([]);

  // const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    // spread operator
    const getData = async () => {
      try {
        const promises = await diaryDao.getAllDiary();
        if (isFocused) {
          setData(promises);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
