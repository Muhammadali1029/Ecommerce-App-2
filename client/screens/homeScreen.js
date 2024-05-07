import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get('http://localhost:3333/api/v1/products');
        const response = await axios.get(`${process.env.SERVER_URI}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const navigateToProductDetail = (productId) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const renderItem = ({ item }) => (
  <TouchableOpacity
    onPress={() => navigateToProductDetail(item._id)}
    style={styles.itemContainer}
  >
    <View style={styles.imageContainer}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Image Not Available</Text>
        </View>
      )}
    </View>
    <View style={styles.itemDetails}>
      <View style={styles.itemTitle}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View style={styles.itemPrice}>
        <Text style={styles.price}>£{item.price}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 1,
  },
  itemDetails: {
    flex: 1,
    padding: 10, 
    justifyContent: 'space-between',
  },
  itemTitle: {
    justifyContent: 'flex-start', // Align title to top left
    alignItems: 'flex-start', // Align title to top left
  },
  itemPrice: {
    justifyContent: 'flex-end', // Align price to bottom right
    alignItems: 'flex-end', // Align price to bottom right
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Arial', // Example font family
  },
  price: {
    fontSize: 20,
    color: '#777',
    fontFamily: 'Helvetica', // Example font family
  },
});


export default HomeScreen;
