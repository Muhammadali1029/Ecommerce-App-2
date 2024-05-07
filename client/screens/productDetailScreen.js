import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const response = await axios.get(`http://localhost:3333/api/v1/products/${productId}`);
        const response = await axios.get(`${process.env.SERVER_URI}/products/${productId}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
        setMessage('Failed to fetch product details');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      // Validate quantity input
      if (!Number.isInteger(quantity) || quantity <= 0) {
        setMessage('Please enter a valid quantity');
        return;
      }
  
      // Retrieve existing cart items from AsyncStorage
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
  
      // Check if the product already exists in the cart
      const existingItemIndex = cartItems.findIndex(item => item.id === productId);
  
      if (existingItemIndex !== -1) {
        // If the product exists, update its quantity
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // If the product doesn't exist, add it as a new item
        cartItems.push({ 
          id: productId, 
          name: product.name, 
          price: product.price,  // Add price to the cart item
          quantity: quantity,
          image: product.image
        });
      }
  
      // Store updated cart items in AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  
      setMessage('Product added to cart successfully!');

      // Clear message after 2 seconds
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setMessage('Failed to add product to cart');
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView style={{flex: 1}}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]}>
              <Text style={styles.imagePlaceholderText}>Image Not Available</Text>
            </View>
          )}
          <View style={styles.detailsContainer}>
            <View style={styles.titlePrice}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.price}>£{product.price}</Text>
            </View>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.messageContainer}>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <View style={styles.quantity}>
            <Text style={styles.quantityText}>Quantity:</Text>
            <TextInput
              style={styles.quantityInput}
              value={quantity.toString()}
              onChangeText={(text) => setQuantity(parseInt(text) || 0)}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 2,
  },
  imagePlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  imagePlaceholderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    // backgroundColor: 'green'
  },
  titlePrice: {
    width: '100%', // Take full width
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'left',
    color: '#666',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e1e1e',
  },
  messageContainer: {
    bottom: 0,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  quantityContainer: {
    width: '100%', // Take full width
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quantity: {
    flexDirection: 'row',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 600,
    marginRight: 10,
    color: '#333',
    alignContent: 'center'
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  message: {
    color: 'green',
    padding: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
