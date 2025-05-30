import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=62f5192c39f945f1b3c1aeceb471a8b6`
      );
      setSearchResults(response.data.articles);
    } catch (error) {
      console.error('Arama hatası:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Anahtar kelime ile ara..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Ara</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            imageUrl={item.urlToImage}
            date={item.publishedAt}
            onPress={() => navigation.navigate('Detail', { article: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
  },
  searchBox: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default SearchScreen;
