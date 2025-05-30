// /components/CategoryButton.js
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const CategoryButton = ({ category, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title={category.charAt(0).toUpperCase() + category.slice(1)} onPress={() => onPress(category)} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
  },
});

export default CategoryButton;
