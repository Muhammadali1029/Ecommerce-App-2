// cartButton.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartButton = () => {
  const navigation = useNavigation();

  const handleGoToCart = () => {
    navigation.navigate('Order', { screen: 'Cart' }); // Navigate to the Cart screen within the nested navigator
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoToCart} style={styles.button}>
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10, // Adjust the positioning as needed
  },
  button: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartButton;
