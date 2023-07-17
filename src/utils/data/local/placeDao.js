import { database } from "./database";

export default {
  insertPlaces: (place) => {
    database.transaction((tx) => {
      return new Promise((resolve, reject) => {
        tx.executeSql(
          `INSERT INTO places VALUES (?, ?, ?, ?, ?)`,
          [
            place.title,
            place.content,
            place.image,
            place.location.lang,
            place.location.lng,
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
  getAllPlaces: () => {
    return new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM places`,
          [],
          (_, resultSet) => {
            const places = resultSet.rows._array.map((place) => {
              return {
                id: place.id,
                title: place.title,
                content: place.content,
                location: {
                  lat: place.lat,
                  lng: place.lng,
                },
              };
            });
            resolve(places);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  },
  getPlace: (id) => {
    return new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM places WHERE id=?`,
          [id],
          (_, resultSet) => {
            if (resultSet.rows.length > 0) {
              const { title, content, lat, lng, id } = resultSet.rows._array[0];
              const place = {
                title,
                content,
                location: { lat, lng },
                id,
              };
              resolve(place);
            } else {
              reject("Places Not Found");
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
