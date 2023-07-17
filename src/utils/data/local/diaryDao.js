import { database } from "./database";

export default {
  insertDiary: (diary) => {
    return new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO diary(title, content, address, imageUri, lat, lng) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            diary.title,
            diary.content,
            diary.location.address,
            diary.image,
            diary.location.lat,
            diary.location.lng,
          ],
          (_, resultSet) => {
            resolve(resultSet);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  getAllDiary: () => {
    return new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM diary`,
          [],
          (_, resultSet) => {
            const diary = resultSet.rows._array.map((diary) => {
              return {
                id: diary.id,
                title: diary.title,
                content: diary.content,
                image: diary.imageUri,
                location: {
                  lat: diary.lat,
                  lng: diary.lng,
                  address: diary.address,
                },
              };
            });
            resolve(diary);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  getDiary: (id) => {
    return new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM diary WHERE id=?`,
          [id],
          (_, resultSet) => {
            if (resultSet.rows.length > 0) {
              const { title, content, address, lat, lng, id } =
                resultSet.rows._array[0];
              const diary = {
                title,
                content,
                address,
                location: { lat, lng },
                id,
              };
              resolve(diary);
            } else {
              reject("Diary Not Found");
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
};
