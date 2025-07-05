import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "light" ? DefaultTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "The Salvation Army Shona SongBook" }}
        />
        <Stack.Screen name="shona" options={{ title: "Shona" }} />
        <Stack.Screen name="ndebele" options={{ title: "Ndebele" }} />
        <Stack.Screen name="english" options={{ title: "English" }} />
        <Stack.Screen name="liked" options={{ title: "Liked"}} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
