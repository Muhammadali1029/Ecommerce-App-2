import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [isStockAvailable, setIsStockAvailable] = useState(false); // State to track stock availability

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://appserver-514886c85636.herokuapp.com/api/v1/products/${productId}`);
        setProduct(response.data.product);

        // Check if stock is available
        setIsStockAvailable(response.data.product.stock > 0);
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
      
      // Validate stock availability
      if (!isStockAvailable) {
        setMessage('This product is out of stock');
        return;
      }
      
      // Retrieve existing cart items from AsyncStorage
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
  
      // Check if the product already exists in the cart
      const existingItemIndex = cartItems.findIndex(item => item.id === productId);
  
      if (existingItemIndex !== -1) {
        // If the product exists, update its quantity
        const totalQuantity = cartItems[existingItemIndex].quantity + quantity;
        if (totalQuantity <= product.stock) {
          cartItems[existingItemIndex].quantity = totalQuantity;
        } else {
          setMessage('You cannot add more than the available stock');
          return;
        }
      } else {
        // If the product doesn't exist, add it as a new item
        if (quantity <= product.stock) {
          cartItems.push({ 
            id: productId, 
            name: product.name, 
            price: product.price,  // Add price to the cart item
            quantity: quantity,
            image: product.image,
            originalStock: product.stock
          });
        } else {
          setMessage('You cannot add more than the available stock');
          return;
        }
      }
  
      // Update the product stock quantity
      const updatedProduct = { ...product, stock: product.stock - quantity };
      setProduct(updatedProduct);
  
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
  
  // Function to handle removing an item from the cart
  const handleRemoveFromCart = async (cartItemId) => {
    try {
      // Retrieve existing cart items from AsyncStorage
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];
  
      // Find the index of the item to remove
      const itemIndexToRemove = cartItems.findIndex(item => item.id === cartItemId);
  
      if (itemIndexToRemove !== -1) {
        // Restore the original stock quantity of the product
        const originalStock = cartItems[itemIndexToRemove].originalStock;
        const updatedProduct = { ...product, stock: originalStock + cartItems[itemIndexToRemove].quantity };
        setProduct(updatedProduct);
  
        // Remove the item from the cart
        cartItems.splice(itemIndexToRemove, 1);
  
        // Store updated cart items in AsyncStorage
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  
        setMessage('Product removed from cart successfully!');
  
        // Clear message after 2 seconds
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      setMessage('Failed to remove product from cart');
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
        <ScrollView style={{ flex: 1 }}>
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
            <Text style={styles.productCode}>{product.productCode}</Text>
            {/* Render specs based on category */}
            {product.category === 'light' && (
              <View style={styles.specsContainer}>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Material:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.material}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Input Voltage:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.inputVoltage}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Wattage:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.wattage}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Lumen:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.lumen}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Colour Temperature:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.colourTemperature}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>IP Rating:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.IPRating}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Beam Angle:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.beamAngle}°</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Dimension:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.dimension}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Working Temperature:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.workingTemperature}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Warranty:</Text>
                  <Text style={styles.specsValue}>{product.specsLight.warranty} Years</Text>
                </View>
              </View>
            )}
            {product.category === 'ceiling' && (
              <View style={styles.specsContainer}>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Material:</Text>
                  <Text style={styles.specsValue}>{product.specsCeiling.material}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Size:</Text>
                  <Text style={styles.specsValue}>{product.specsCeiling.size}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Colour:</Text>
                  <Text style={styles.specsValue}>{product.specsCeiling.colour}</Text>
                </View>
                <View style={styles.specsItem}>
                  <Text style={styles.specsLabel}>Thickness:</Text>
                  <Text style={styles.specsValue}>{product.specsCeiling.thickness}</Text>
                </View>
              </View>
            )}

          </View>
        </ScrollView>
      </View>
      <View style={styles.messageContainer}>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.button, !isStockAvailable && styles.disabledButton]} // Conditional styling for the button
            onPress={handleAddToCart}
            disabled={!isStockAvailable} // Disable button if stock is not available
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <Text style={styles.stockText}>Stock: {product.stock}</Text> {/* Show current stock */}
          <View style={styles.quantity}>
            <Text style={styles.quantityText}>Quantity:</Text>
            <TextInput
              style={styles.quantityInput}
              value={quantity.toString()}
              onChangeText={(text) => setQuantity(parseInt(text) || 0)}
              keyboardType="numeric"
              maxLength={String(product.stock).length} // Limit input to the length of stock
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
  productCode: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'left',
    color: '#666',
    fontWeight: '800',
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
    fontWeight: '600',
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
  stockText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
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
  disabledButton: {
    backgroundColor: '#ccc',
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    // backgroundColor: 'green'
  },
  specsContainer: {
    flex: 1,
    width: '100%',
    padding: 5,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
  },
  specsItem: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea'
  },
  specsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    flex: 1,
    textAlign: 'left',
    // backgroundColor: 'red'
  },
  specsValue: {
    fontSize: 18,
    flex: 1,
    textAlign: 'left',
    // backgroundColor: 'green'
  },
});

export default ProductDetailScreen;
