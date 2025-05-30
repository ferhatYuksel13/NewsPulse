import React from 'react';
import { View, Text, StyleSheet, Image, Button, Linking } from 'react-native';

const DetailScreen = ({ route }) => {
  const { article } = route.params;

  const handleOpenInBrowser = () => {
    if (article.url) {
      console.log("URL Geçerli: ", article.url);  // URL'yi konsola yazdır

      Linking.openURL(article.url).catch((err) =>
        console.error("Bir hata oluştu", err)  // Hata mesajını konsola yazdır
      );
    } else {
      console.log("Geçersiz URL");  // URL yoksa konsola yazdır
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.date}>{new Date(article.publishedAt).toLocaleDateString()}</Text>
      <Text style={styles.description}>{article.description}</Text>
      <Button title="Tarayıcıda Aç" onPress={handleOpenInBrowser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default DetailScreen;
