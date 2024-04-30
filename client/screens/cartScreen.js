import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0); 
  const [showMessage, setShowMessage] = useState(false); 

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
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);

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
      await AsyncStorage.removeItem('cartItems');
      navigation.navigate('OrderPlacement', { cartItems });
    } catch (error) {
      console.error(error);
    }
  };  

  console.log("Cart Items:", cartItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetail}>Price: £{item.price}</Text> 
                    <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
                    <Text style={styles.itemDetail}>Total: £{item.price * item.quantity}</Text> 
                  </View>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </ScrollView>
        <View style={styles.buttonPriceContainer}>
          <Text style={styles.totalPrice}>Total Price: £{totalPrice}</Text>
          <TouchableOpacity onPress={handlePlaceOrder} style={styles.placeOrderButton}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
    textAlign: 'justify',
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  buttonPriceContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'justify',
  },
  emptyCartMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  placeOrderButton: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 0,
    resizeMode: 'cover', // Ensure that the image fills the specified dimensions
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
  itemName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    marginBottom: 3,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;
