import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import localDatabase from '../localDatabase.json';


const App = () => {
  return (
    <ScrollView>
      <View style={{padding: 20}}>
        {localDatabase.map((section, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
    {section.section} - {section.title}
  </Text>
            <Text style={{ fontSize: 14 }}>{section.subtitle}</Text>
            <Text style={{ fontSize: 14 }}>{section.theme}</Text>
            {section.hymn ? (
              <>
                <Text style={{ fontSize: 20, paddingBottom: 5, fontWeight: 'bold' }}>{section.hymn.title}</Text>
                <Text style={{ fontSize: 14 }}>{section.hymn.subtitle}</Text>
                <Text style={{ fontSize: 14 }}>Source: {section.hymn.source}</Text>
                {section.hymn.lyrics.map((line, index) => (
                  <Text key={index} style={{ fontSize: 16, paddingTop: 20 }}>{line}</Text>
                ))}
                <Text style={{ fontSize: 10, paddingTop: 10, marginLeft: "auto" }}>Author: {section.hymn.author}</Text>
              </>
            ) : (
              <Text style={{ fontSize: 16 }}>Hymn details are not available.</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default App;
