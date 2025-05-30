import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

const HomeScreen = ({ navigation }) => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=62f5192c39f945f1b3c1aeceb471a8b6');
        setHeadlines(response.data.articles);
      } catch (error) {
        console.error('Haberler çekilemedi:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.navButtonText}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.navButtonText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList ile başlıkları göster */}
      <FlatList
        data={headlines}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            imageUrl={item.urlToImage}
            date={item.publishedAt}
            onPress={() => navigation.navigate('Detail', { article: item })}
            article={item}

          />
        )}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ekranın tamamını kapsar
    paddingTop: 20,
    backgroundColor: '#FAFAFA',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  navButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  navButtonText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
  },
  flatList: {
    flex: 1, // FlatList'i ekrana sığdırmak için
    marginBottom: 20,
  },
});

export default HomeScreen;
