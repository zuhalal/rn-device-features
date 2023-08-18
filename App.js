import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import Router from "./Router";
import { ThemeContextProvider } from "./src/context/useThemeContext";
import { initDb } from "./src/utils/data/local/database";

export default function Main() {
  useEffect(() => {
    initDb();
  }, []);
  return (
    <ThemeContextProvider>
      <PaperProvider>
        <Router />
      </PaperProvider>
    </ThemeContextProvider>
  );
}
