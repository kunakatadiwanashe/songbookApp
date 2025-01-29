import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import localDatabase from '../localDatabase.json';

interface Section {
  section: number;
  title: string;
  subtitle?: string; // Marked as optional
  theme?: string; // Marked as optional
  hymn?: {
    title?: string; // Marked as optional
    subtitle?: string; // Marked as optional
    source?: string; // Marked as optional
    lyrics?: string[]; // Marked as optional
    author?: string; // Marked as optional
  };
}

const App = () => {
  const [isHymnVisible, setIsHymnVisible] = useState(false); // State for hymn visibility

  const toggleHymnVisibility = () => {
    setIsHymnVisible(!isHymnVisible); // Toggle visibility
  };

  const showDetails = (section: Section) => {
    Alert.alert("Details", `Title: ${section.title}\nSubtitle: ${section.subtitle || 'N/A'}\nTheme: ${section.theme || 'N/A'}`);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {Array.isArray(localDatabase) && localDatabase.length > 0 ? (
          localDatabase.map((section: Section, index: number) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <TouchableOpacity onPress={() => showDetails(section)}>
                <Text style={styles.title}>
                  {section.section} - {section.title}
                </Text>
                <Text style={styles.subtitle}>{section.subtitle || 'N/A'}</Text>
                {section.theme && <Text style={styles.subtitle}>{section.theme}</Text>}
              </TouchableOpacity>

              {section.hymn ? (
                <>
                  <Text style={styles.hymnTitle}>{section.hymn.title}</Text>
                  <Text style={styles.subtitle}>{section.hymn.subtitle || 'N/A'}</Text>
                  <Text style={styles.source}>Source: {section.hymn.source || 'N/A'}</Text>
                  {section.hymn.lyrics?.map((line, index) => (
                    <Text key={index} style={styles.lyric}>{line}</Text>
                  ))}
                  <Text style={styles.author}>Author: {section.hymn.author || 'N/A'}</Text>
                </>
              ) : (
                <Text style={styles.subtitle}>Hymn details are not available.</Text>
              )}
            </View>
          ))
        ) : (
          <Text>No sections available.</Text>
        )}
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
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
  hymnTitle: {
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  source: {
    fontSize: 14,
  },
  author: {
    fontSize: 10,
    paddingTop: 10,
    marginLeft: "auto",
  },
  lyric: {
    fontSize: 16,
    paddingTop: 20,
  },
});

export default App;
