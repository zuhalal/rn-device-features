import { GMAPS_API_KEY } from "../constants/location";

export const getMapPreview = (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&markers=color:red%7Clabel:A%7C40.7128,-74.0060&zoom=14&size=400x400&key=${GMAPS_API_KEY}`;
  return url;
};

export const getAddressFromMap = async (lat, lng) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GMAPS_API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      return false;
    }

    const data = await res.json();
    return data.results[0].formatted_address;
  } catch (error) {
    return false;
  }
};
