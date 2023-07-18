import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { getFromStorage, saveToStorage } from "../utils/data/themeStorage";

const ThemeContext = createContext({});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  // https://medium.com/simform-engineering/manage-dark-mode-in-react-native-application-2a04ba7e76d0
  const [themeValue, setThemeValue] = useState("light");
  const [initialValue, setInitialValue] = useState(0);
  const themes = useColorScheme();

  const getAppTheme = useCallback(async () => {
    const theme = await getFromStorage("Theme");
    const isDefault = await getFromStorage("IsDefault");
    isDefault ? themeOperations("default") : themeOperations(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set theme for the first time and when changes
  const setTheme = useCallback(async (theme, isDefault) => {
    saveToStorage("Theme", theme);
    saveToStorage("IsDefault", isDefault);
    setThemeValue(theme);
  }, []);

  const themeOperations = (theme) => {
    switch (theme) {
      case "dark":
        setTheme(theme, false);
        setInitialValue(2);
        return;
      case "light":
        setTheme(theme, false);
        setInitialValue(1);
        return;
      case "default":
        setTheme(themes, true);
        setInitialValue(3);
        return;
    }
  };

  useEffect(() => {
    getAppTheme();
  }, [getAppTheme]);

  const value = {
    getAppTheme,
    themeValue,
    initialValue,
    themeOperations,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
