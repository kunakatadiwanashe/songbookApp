
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

export default function LanguageScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")} 
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Text style={styles.title}>The Salvation Army</Text>
          <Text style={styles.title}>Hymn Book</Text>
          <Text style={styles.subtitle}>Choose your language</Text>


          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/shona")}
          >
            <Text style={styles.buttonText}>Shona</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/ndebele")}
          >
            <Text style={styles.buttonText}>Ndebele</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/english")}
          >
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>


        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // Position image bottom-right
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: "#8400ffff",
    marginBottom: 50,
  },
  button: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
