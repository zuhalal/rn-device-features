import { useIsFocused } from "@react-navigation/native";
import RadioButtonRN from "radio-buttons-react-native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ToDoCard } from "../components/ToDoCard";
import Colors from "../constants/colors";
import { useThemeContext } from "../context/useThemeContext";
import diaryDao from "../utils/data/local/diaryDao";

export const HomeScreen = () => {
  const [data, setData] = useState([]);
  const { themeValue } = useThemeContext();

  // const route = useRoute();
  const isFocused = useIsFocused();
  const [reload, setReload] = useState(false);

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
        Alert.alert(error);
      }
    };

    getData();

    return () => {
      setReload(false);
    };
  }, [isFocused, reload]);

  const styles = getStyle(themeValue);

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
            id={item.id}
            setReload={setReload}
          />
        )}
      />
    </SafeAreaView>
  );
};

const getStyle = (theme) =>
  StyleSheet.create({
    container: {
      padding: 12,
      backgroundColor: Colors[theme].themeColor,
    },
  });
