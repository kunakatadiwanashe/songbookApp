import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import localDatabase from '../localDatabase.json';
import { FontAwesome } from '@expo/vector-icons';

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
  const [visibleSectionIndex, setVisibleSectionIndex] = useState<number | null>(null); // State for visible section index
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  const toggleSectionVisibility = (index: number) => {
    setVisibleSectionIndex(visibleSectionIndex === index ? null : index); // Toggle visibility
  };

  // Filter sections based on the search query
  const filteredSections = localDatabase.filter((section: Section) => {
    return (
      section.hymn?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      section.title.toLowerCase().includes(searchQuery.toLowerCase())
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


        {filteredSections.length > 0 ? (
          filteredSections.map((section: Section, index: number) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <TouchableOpacity onPress={() => toggleSectionVisibility(index)}>
                <Text style={styles.title}>
                  {section.section} - {section.title}
                </Text>
                <Text style={styles.subtitle}>{section.subtitle || 'N/A'}</Text>
                {section.hymn && (
                  <>
                    <Text style={styles.hymnTitle}>{section.hymn.title || 'N/A'}</Text>
                    <Text style={styles.subtitle}>{section.hymn.subtitle || 'N/A'}</Text>
                  </>
                )}
              </TouchableOpacity>

              {visibleSectionIndex === index && ( // Show details only for the clicked section
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>Details:</Text>
                  <Text style={styles.detailsText}>Theme: {section.theme || 'N/A'}</Text>
                  {section.hymn && (
                    <>
                      <Text style={styles.detailsText}>Source: {section.hymn.source || 'N/A'}</Text>
                      <Text style={styles.detailsText}>Author: {section.hymn.author || 'N/A'}</Text>
                      {section.hymn.lyrics?.map((line, index) => (
                        <Text key={index} style={styles.lyric}>{line}</Text>
                      ))}
                    </>
                  )}
                </View>
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
    fontSize: 14,
    paddingBottom: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 5,
    width: 290, // Tailwind's w-80
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#4B5563', // Tailwind's gray-600
    borderRadius: 50,
  },
  button: {
    padding: 8,
  },








});

export default App;