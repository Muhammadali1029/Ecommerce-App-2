import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const CeilingScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [noProductsMessage, setNoProductsMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://appserver-514886c85636.herokuapp.com/api/v1/products');
        const ceilingProducts = response.data.products.filter(product => product.category === 'ceiling');
        setProducts(ceilingProducts);

        // Check if there are no products in the "ceiling" category
        if (ceilingProducts.length === 0) {
          setNoProductsMessage('More stock coming soon...');
        }
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
      style={[styles.itemContainer, item.stock === 0 && styles.outOfStock]}
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
        {item.stock === 0 && <Text style={styles.stockStatus}>Not in stock</Text>}
        {item.stock > 0 && item.stock < 10 && <Text style={styles.stockStatus}>Only a few remain in stock</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {noProductsMessage ? (
        <Text style={styles.noProductsMessage}>{noProductsMessage}</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      )}
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
  outOfStock: {
    backgroundColor: '#ccc', // Grey scale for out of stock items
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
  stockStatus: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
  },
  imagePlaceholderText: {
    color: '#666',
    fontSize: 12,
  },
  noProductsMessage: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    color: '#333',
  },
});

export default CeilingScreen;
