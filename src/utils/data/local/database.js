import * as SQLite from "expo-sqlite";
export const database = SQLite.openDatabase("diary.db");

export const initDb = () => {
  database.transaction((tx) => {
    return new Promise((resolve, reject) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS diary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
