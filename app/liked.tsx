import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { getLikedHymns } from "../database/index";
import { useRouter } from "expo-router";

interface Hymn {
  id: string;
  title: string;
  subtitle?: string;
  verses: {
    stanza: number;
    lines: string[];
  }[];
  author?: string;
}

const Liked = () => {
  const [likedHymns, setLikedHymns] = useState<Hymn[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const hymns = await getLikedHymns();
      setLikedHymns(hymns);
    })();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Liked Hymns</Text>
        {likedHymns.length === 0 ? (
          <Text>No liked hymns yet.</Text>
        ) : (
          likedHymns.map((hymn) => (
            <View key={hymn.id} style={styles.hymnContainer}>
              <Text style={styles.title}>{hymn.title}</Text>
              <Text style={styles.subtitle}>{hymn.subtitle || "N/A"}</Text>
              <Text style={styles.author}>Author: {hymn.author || "N/A"}</Text>
            </View>
          ))
        )}

        {/* <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity> */}



      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  hymnContainer: { marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14 },
  author: { fontSize: 12, color: "#666" },
  button: { marginTop: 20, padding: 10, backgroundColor: "#4B5563", borderRadius: 5, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16 },
});

export default Liked;