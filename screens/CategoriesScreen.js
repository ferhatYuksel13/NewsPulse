// /screens/CategoriesScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

const CategoriesScreen = ({ navigation }) => {
  const [categoryNews, setCategoryNews] = useState([]);
  const [category, setCategory] = useState('technology');

  const fetchCategoryNews = async (category) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=62f5192c39f945f1b3c1aeceb471a8b6`
      );
      setCategoryNews(response.data.articles);
    } catch (error) {
      console.error('Kategori haberleri çekilemedi:', error);
    }
  };

  useEffect(() => {
    fetchCategoryNews(category);
  }, [category]);

  const categories = ['technology', 'sports', 'health', 'science', 'business'];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.buttonContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              category === cat && styles.activeButton
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[
              styles.categoryText,
              category === cat && styles.activeText
            ]}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={categoryNews}
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
    backgroundColor: '#FAFAFA',
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeButton: {
    backgroundColor: '#333',
  },
  categoryText: {
    color: '#333',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
});

export default CategoriesScreen;
