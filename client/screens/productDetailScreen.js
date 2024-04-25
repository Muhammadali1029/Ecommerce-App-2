// screens/ProductDetailScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;

  return (
    <View>
      <Text>Product Detail Screen</Text>
      <Text>Product ID: {productId}</Text>
    </View>
  );
};

export default ProductDetailScreen;
