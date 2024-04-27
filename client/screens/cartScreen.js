import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0); // State to hold total price
  const [showMessage, setShowMessage] = useState(false); // State to control conditional rendering

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Calculate total price whenever cart items change
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);

    // Show message if there are no items in the cart
    setShowMessage(cartItems.length === 0);
  }, [cartItems]);

  const removeFromCart = async (id) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await AsyncStorage.removeItem('cartItems'); // Remove cart items from AsyncStorage
      navigation.navigate('OrderPlacement', { cartItems }); // Pass cartItems to OrderPlacement screen
    } catch (error) {
      console.error(error);
    }
  };  

  console.log('Cart Items:', cartItems);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {showMessage ? (
        <Text style={styles.emptyCartMessage}>No items in cart</Text>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              ) : (
                <View style={[styles.itemImage, styles.imagePlaceholder]}>
                  <Text style={styles.imagePlaceholderText}>Image Not Available</Text>
                </View>
              )}
              <View style={styles.itemInfo}>
                <Text>{item.name}</Text>
                <Text>Price: £{item.price}</Text> {/* Display item price */}
                <Text>Quantity: {item.quantity}</Text>
                <Text>Total: £{item.price * item.quantity}</Text> {/* Calculate and display total price */}
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          {/* Display Total Price */}
          <Text style={styles.totalPrice}>Total Price: £{totalPrice}</Text>
          <TouchableOpacity onPress={handlePlaceOrder} style={styles.placeOrderButton}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  imagePlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemInfo: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emptyCartMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CartScreen;
