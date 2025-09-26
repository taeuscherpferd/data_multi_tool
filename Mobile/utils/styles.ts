import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState, useEffect} from "react";

interface ThemedValues {
  backgroundColor: string;
  textColor: string;
}

enum Themes {
  Light = "light",
  Dark = "dark",
}

export const useTheme =  () => {
  const [theme, setTheme] = useState<ThemedValues>(ThemeValues[Themes.Light]);

  useEffect(() => {
    (async () => {
      const currentTheme = await getTheme();
      setThemeState(currentTheme);
    })();
  }, []);

  const changeTheme = (theme: Themes) => {
    AsyncStorage.setItem("theme", theme);
    setTheme(ThemeValues[theme]);
  }

  return [ theme, changeTheme ];
}

export const getTheme = async (override?: Themes) => {
  const theme = await AsyncStorage.getItem("theme") as Themes || Themes.Light;
  return ThemeValues[override || theme];
}

export const setTheme = (theme: Themes) => {
  AsyncStorage.setItem("theme", theme);
}

const ThemeValues: Record<Themes, ThemedValues> = {
  light: {
    backgroundColor: "#FFF",
    textColor: "#000",
  },
  dark: {
    backgroundColor: "#000000",
    textColor: "#FFFFFF",
  },
}