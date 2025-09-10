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

const Shona = (navigation: any) => {
  const router = useRouter();
  const [visibleHymnIndex, setVisibleHymnIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likedHymns, setLikedHymns] = useState<Hymn[]>([]);

  React.useEffect(() => {
    (async () => {
      const stored = await getLikedHymns();
      setLikedHymns(stored);
    })();
  }, []);

  React.useEffect(() => {
    saveLikedHymns(likedHymns);
  }, [likedHymns]);

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
              <FontAwesome name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {filteredHymns.length > 0 ? (
          filteredHymns.map((hymn: Hymn, index: number) => (
            <View key={hymn.id} style={{ marginBottom: 20 }}>
              <TouchableOpacity onPress={() => toggleHymnVisibility(index)}>
                <View style={{ flexDirection: "row", alignItems: "" }}>
                  {" "}
                  <Text style={[styles.titleN, { paddingRight: 10 }]}>{hymn.id}</Text>
                  <Text style={styles.title}>{hymn.title}</Text>
                </View>
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

<TouchableOpacity
  style={styles.floatingButton}
  onPress={() => router.push("/liked")}
>
  <FontAwesome name="heart" size={30} color="#EF3E46" />
</TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleN: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EF3E46"
  },
    title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#002056"
  },
  subtitle: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#4f4f4fff",
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
    width: 290,
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
    fontWeight: "bold",
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
    marginRight: 12,
  },

});

export default Shona;


