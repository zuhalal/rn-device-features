import { useEffect } from "react";
import Router from "./Router";
import { ThemeContextProvider } from "./src/context/useThemeContext";
import { initDb } from "./src/utils/data/local/database";

export default function App() {
  useEffect(() => {
    initDb();
  }, []);
  return (
    <ThemeContextProvider>
      <Router />
    </ThemeContextProvider>
  );
}
