import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Songbook App</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/shona")}>
        <Text style={styles.buttonText}>Shona</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/ndebele")}>
        <Text style={styles.buttonText}>Ndebele</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/english")}>
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push("/liked")}>
        <Text style={styles.buttonText}>liked</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 40 },
  button: { backgroundColor: "#f4511e", padding: 16, borderRadius: 8, marginVertical: 10 },
  buttonText: { color: "#fff", fontSize: 18 },
});