import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsCard from '../components/NewsCard';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Favoriler yüklenemedi:', error);
    }
  };

  // Favorilerden bir öğeyi kaldırma işlemi
  const removeFromFavorites = async (article) => {
    try {
      // Favoriler listesinden öğeyi çıkar
      const updatedFavorites = favorites.filter(item => item.url !== article.url);
      setFavorites(updatedFavorites);  // State'i güncelle

      // Güncellenmiş favorileri AsyncStorage'a kaydet
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Favori silme hatası:', error);
    }
  };

  // Favorilerden çıkarma işlemi için Alert
  const handleRemove = (article) => {
    Alert.alert(
      'Favorilerden Çıkar',
      'Bu haberi favorilerinizden çıkarmak istediğinizden emin misiniz?',
      [
        { text: 'Hayır' },
        { text: 'Evet', onPress: () => removeFromFavorites(article) },  // Evet butonuna tıklayınca favori silinir
      ]
    );
  };

  // FlatList için her bir öğeyi render etme
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <NewsCard
        title={item.title}
        imageUrl={item.urlToImage}
        date={item.publishedAt}
        onPress={() => navigation.navigate('Detail', { article: item })}
        handleRemove={handleRemove}  // handleRemove fonksiyonunu prop olarak geçiyoruz
        isFavoritePage={true}  // Favoriler sayfası olduğunu belirtiyoruz
        article={item}  // Article bilgisi gönderilir
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noFavorites}>Favori haberiniz yok.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  noFavorites: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesScreen;
