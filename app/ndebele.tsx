import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import localDatabaseNdebele from "../localDatabaseNdebele.json";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { saveLikedHymns, getLikedHymns } from "../database/index";

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

const Ndebele = () => {
  const router = useRouter();
  const [visibleHymnIndex, setVisibleHymnIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likedHymns, setLikedHymns] = useState<Hymn[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await getLikedHymns();
      setLikedHymns(stored);
    })();
  }, []);

  useEffect(() => {
    saveLikedHymns(likedHymns);
  }, [likedHymns]);

  const toggleHymnVisibility = (index: number) => {
    setVisibleHymnIndex(visibleHymnIndex === index ? null : index);
  };

  const toggleLikeHymn = (hymn: Hymn) => {
    setLikedHymns((prev) =>
      prev.some((h) => h.id === hymn.id)
        ? prev.filter((h) => h.id !== hymn.id)
        : [...prev, hymn]
    );
  };

  const filteredHymns = (localDatabaseNdebele as any[]).filter((hymn) => {
    const title = (hymn.title || hymn.title_ndebele || '').toLowerCase();
    const subtitle = (hymn.subtitle || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || subtitle.includes(query);
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search hymns..."
              placeholderTextColor="#ccc"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.button}>
              <FontAwesome name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {filteredHymns.length > 0 ? (
          filteredHymns.map((hymn, index: number) => (
            <View key={hymn.id} style={{ marginBottom: 20 }}>
              <TouchableOpacity onPress={() => toggleHymnVisibility(index)}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.titleN, { paddingRight: 10 }]}>{hymn.id}</Text>
                  <Text style={styles.title}>{hymn.title || hymn.title_ndebele}</Text>
                </View>
                <Text style={styles.subtitle}>{hymn.subtitle || "N/A"}</Text>
              </TouchableOpacity>

              {visibleHymnIndex === index && (
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    Author: {hymn.author || "N/A"}
                  </Text>
                  {(hymn.verses || hymn.stanzas || []).map((verse: any, vIdx: number) => (
                    <View key={vIdx} style={{ marginTop: 10 }}>
                      <Text style={styles.detailsText}>{verse.stanza || verse}</Text>
                      {(verse.lines || []).map((line: string, lIdx: number) => {
                        const isItalic = line.startsWith("*") && line.endsWith("*");
                        const cleanLine = isItalic ? line.slice(1, -1) : line;
                        return (
                          <Text
                            key={lIdx}
                            style={[
                              styles.lyric,
                              { paddingLeft: isItalic ? 40 : 10, paddingTop: isItalic ? 5 : 0 },
                              isItalic && { fontStyle: "italic" },
                            ]}
                          >
                            {cleanLine}
                          </Text>
                        );
                      })}
                    </View>
                  ))}
                  <TouchableOpacity
                    onPress={() => toggleLikeHymn(hymn)}
                    style={styles.likeButton}
                  >
                    <FontAwesome
                      name={likedHymns.some((h) => h.id === hymn.id) ? "heart" : "heart-o"}
                      size={20}
                      color="red"
                    />
                    <Text style={styles.likeButtonText}>
                      {likedHymns.some((h) => h.id === hymn.id) ? "Unlike" : "Like"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text>No hymns available.</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/liked")}
      >
        <FontAwesome name="heart" size={30} color="#EF3E46" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100, // So content doesn't get hidden behind floating button
  },
  titleN: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EF3E46",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#002056",
  },
  subtitle: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#4f4f4f",
    paddingLeft: 20,
  },
  detailsContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  detailsText: {
    fontSize: 14,
  },
  lyric: {
    fontSize: 16,
    paddingTop: 5,
  },
  searchContainer: {
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#002056",
    borderRadius: 50,
    shadowColor: "#EF3E46",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 5,
    width: "100%",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#fff",
    borderRadius: 50,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  likeButtonText: {
    marginLeft: 5,
    color: "red",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#002056",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    padding: 10,
    color: "#EF3E46",
    marginLeft: 10,
  },
});

export default Ndebele;
