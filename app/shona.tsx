import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import localDatabase from "../localDatabase.json";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";



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

const Shona = (navigation: any) => {
  const router = useRouter()
  const [visibleHymnIndex, setVisibleHymnIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likedHymns, setLikedHymns] = useState<Hymn[]>([]);



  const toggleHymnVisibility = (index: number) => {
    setVisibleHymnIndex(visibleHymnIndex === index ? null : index);
  };

  const toggleLikeHymn = (hymn: Hymn) => {
    setLikedHymns((prevLikedHymns) =>
      prevLikedHymns.some((likedHymn) => likedHymn.id === hymn.id)
        ? prevLikedHymns.filter((likedHymn) => likedHymn.id !== hymn.id)
        : [...prevLikedHymns, hymn]
    );
  };

  const filteredHymns = localDatabase.filter((hymn: Hymn) => {
    return (
      hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hymn.subtitle &&
        hymn.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search hymns..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.button}>
              <FontAwesome name="search" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {filteredHymns.length > 0 ? (
          filteredHymns.map((hymn: Hymn, index: number) => (
            <View key={hymn.id} style={{ marginBottom: 20 }}>
              <TouchableOpacity onPress={() => toggleHymnVisibility(index)}>
                <Text style={styles.title}>{hymn.title}</Text>
                <Text style={styles.subtitle}>{hymn.subtitle || "N/A"}</Text>
              </TouchableOpacity>

              {visibleHymnIndex === index && (
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    Author: {hymn.author || "N/A"}
                  </Text>
                  {hymn.verses.map((verse, vIdx) => (
                    <View key={vIdx} style={{ marginTop: 10 }}>
                      <Text style={styles.detailsText}>{verse.stanza}</Text>
                      {verse.lines.map((line, lIdx) => {
                        const isItalic =
                          line.startsWith("*") && line.endsWith("*");
                        const cleanLine = isItalic ? line.slice(1, -1) : line;
                        return (
                          <Text
                            key={lIdx}
                            style={[
                              styles.lyric,
                              { paddingLeft: 10 },
                              isItalic && {
                                fontStyle: "italic",
                                paddingLeft: 40,
                                paddingTop: 5,
                              },
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
                      name={
                        likedHymns.some((likedHymn) => likedHymn.id === hymn.id)
                          ? "heart"
                          : "heart-o"
                      }
                      size={20}
                      color="red"
                    />
                    <Text style={styles.likeButtonText}>
                      {likedHymns.some((likedHymn) => likedHymn.id === hymn.id)
                        ? "Unlike"
                        : "Like"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text>No hymns available.</Text>
        )}



      <TouchableOpacity style={styles.button} onPress={() => router.push("/liked")}>
        <Text style={styles.buttonText}>Liked Hymn</Text>
      </TouchableOpacity>








      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
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
    backgroundColor: "white",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 5,
    width: 290,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#4B5563",
    borderRadius: 50,
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#4B5563",
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
  viewLikedButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#4B5563",
    borderRadius: 5,
    alignItems: "center",
  },
  viewLikedButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Shona;