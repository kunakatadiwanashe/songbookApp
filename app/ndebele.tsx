import { View, Text, StyleSheet } from "react-native";

export default function Ndebele() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Song 1</Text>
      <Text style={styles.lyrics}>Here are the lyrics for Song 1...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  lyrics: { fontSize: 18 },
});