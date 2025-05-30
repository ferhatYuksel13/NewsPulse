import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsCard = ({ title, imageUrl, date, onPress, article, handleRemove, isFavoritePage }) => {
  // Favorilere ekleme fonksiyonu
  const addToFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      const alreadyExists = parsedFavorites.some(item => item.url === article.url);
      if (alreadyExists) {
        alert('Zaten favorilerde');
        return;
      }

      const updatedFavorites = [...parsedFavorites, article];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert('Favorilere eklendi!');
    } catch (error) {
      console.error('Favorilere eklenemedi:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>

      {/* Favorilere ekleme butonu sadece favoriler sayfası dışındayken görünsün */}
      {!isFavoritePage && (
        <TouchableOpacity onPress={addToFavorites} style={styles.favoriteContainer}>
          <Text style={styles.favoriteIcon}>❤️</Text>
          <Text style={styles.favoriteText}>Favorile</Text>
        </TouchableOpacity>
      )}

      {/* Favoriler sayfasındaki çıkarma butonu */}
      {isFavoritePage && (
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(article)}>
          <Text style={styles.removeText}>Favorilerden Çıkar</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e5e5e5', // Soft light gray border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333', // Dark gray for title text
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#8a8a8a', // Light gray for the date
    marginBottom: 15,
  },
  favoriteContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#8a8a8a', // Soft gray color initially
    marginRight: 5,
  },
  favoriteText: {
    fontSize: 16,
    color: '#8a8a8a', // Soft gray color
  },
  removeButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'flex-start',
  },
  removeText: {
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default NewsCard;
