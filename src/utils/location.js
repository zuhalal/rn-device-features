import { GMAPS_API_KEY } from "../constants/location";

export const getMapPreview = (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x400&key=${GMAPS_API_KEY}`;
  return url;
};
