import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import localDatabase from '../localDatabase.json';

const App = () => {
  // Access section one from the local database
  const sectionOne = localDatabase.find(item => item.section === 1);

  return (
    <ScrollView>
      <View style={{padding: 20}}>
        {sectionOne ? (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{sectionOne.title}</Text>
            <Text style={{ fontSize: 14 }}>{sectionOne.subtitle}</Text>
            <Text style={{ fontSize: 14 }}>{sectionOne.theme}</Text>
            <Text style={{ fontSize: 14 }}>{sectionOne.translation}</Text>
            {sectionOne.hymn ? (
              <>
                <Text style={{ fontSize: 20,paddingBottom: 5, fontWeight: 'bold' }}>{sectionOne.hymn.title}</Text>
                <Text style={{ fontSize: 14 }}>{sectionOne.hymn.subtitle}</Text>
                <Text style={{ fontSize: 14, }}>Source: {sectionOne.hymn.source}</Text>
                {/* <Text style={{ fontSize: 16,paddingBottom: 15, }}>Lyrics:</Text> */}
                {sectionOne.hymn.lyrics.map((line, index) => (
                  <Text key={index} style={{ fontSize: 16,paddingTop: 20 }}>{line}</Text>
                ))}
                <Text style={{ fontSize: 10,paddingTop: 10,marginLeft: "auto" }}>Author: {sectionOne.hymn.author}</Text>
              </>
            ) : (
              <Text style={{ fontSize: 16 }}>Hymn details are not available.</Text>
            )}
          </>
        ) : (
          <Text style={{ fontSize: 16 }}>Section one is not available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default App;
