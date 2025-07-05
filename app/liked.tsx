import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

interface Hymn {
  title: string;
  subtitle?: string;
}

const LikedHymns = ({ route }: { route?: { params?: { likedHymns: Hymn[] } } }) => {
  const likedHymns = route?.params?.likedHymns || [];

  return (
    <ScrollView>
      <View style={styles.container}>
        {likedHymns.length > 0 ? (
          likedHymns.map((hymn, index) => (
            <View key={index} style={styles.hymnContainer}>
              <Text style={styles.title}>{hymn.title}</Text>
              <Text style={styles.subtitle}>{hymn.subtitle || "N/A"}</Text>
            </View>
          ))
        ) : (
          <Text>No liked hymns.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  hymnContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
});

export default LikedHymns;