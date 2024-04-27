import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import axios from 'axios'; // Import Axios for making HTTP requests

const OrderScreen = ({ route }) => {
  const { cartItems } = route.params; // Extracting cartItems from navigation route

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [items, setItems] = useState(cartItems); // Populate items with cartItems
  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    pickupDate: '',
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    setItems(cartItems); // Update items when cartItems change
  }, [cartItems]);

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  const isFormValid = () => {
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('Pickup Date:', pickupDate);
    console.log('Items:', items);
    
    return (
      name.trim() !== '' &&
      phoneNumber.trim() !== '' && 
      validatePhoneNumber(phoneNumber) &&
      pickupDate.trim() !== '' &&
      items.length > 0 // Check if there are items in the cart
    );
  };
  

const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
};

const handlePlaceOrder = async () => {
    console.log('Attempting to place order...');
    if (!isFormValid()) {
      console.log('Form is not valid.');
      setErrors({
        name: name.trim() === '' ? 'Name is required' : '',
        phoneNumber:
          phoneNumber.trim() === ''
            ? 'Phone number is required'
            : !validatePhoneNumber(phoneNumber)
            ? 'Invalid phone number'
            : '',
        pickupDate: pickupDate.trim() === '' ? 'Pickup date is required' : '',
        items: items.length === 0 ? 'Please add items to the cart' : '',
      });
      return;
    }
  
    // Log the payload before sending the request
    console.log('Sending order request with payload:', {
      name: name,
      phoneNumber,
      email,
      company,
      pickupDateTime: pickupDate,
      items,
      totalPrice: calculateTotalPrice(),
    });
  
    try {
      // Make an HTTP POST request to the server to create the order
      console.log('Form is valid. Sending order request...');
      const response = await axios.post('http://localhost:3333/api/v1/orders', {
        name: name,
        email,
        phoneNumber,
        company,
        pickupDateTime: pickupDate,
        items,
        totalPrice: calculateTotalPrice(), // Calculate total price
      });
      
      // Handle success response
      console.log('Order placed:', response.data.newOrder);
      // Optionally, you can show an alert or navigate to a success screen
      Alert.alert('Success', 'Order placed successfully');
    } catch (error) {
      // Handle error response
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order. Please try again later.');
    }
  };
  

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event, date) => {
    if (date) {
      setPickupDate(Moment(date).format('YYYY-MM-DD HH:mm'));
    }
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Order</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        {errors.name !== '' && <Text style={styles.error}>{errors.name}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {errors.phoneNumber !== '' && <Text style={styles.error}>{errors.phoneNumber}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Company</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your company name"
          value={company}
          onChangeText={setCompany}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pickup Date *</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.input}>{pickupDate}</Text>
        </TouchableOpacity>
        {((Platform.OS === 'ios' || Platform.OS === 'android') && isDatePickerVisible) && (
          <DateTimePicker
            value={new Date()}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={handleConfirm}
          />
        )}
        {Platform.OS === 'web' && isDatePickerVisible && (
          <input
            type="datetime-local"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        )}
        {errors.pickupDate !== '' && <Text style={styles.error}>{errors.pickupDate}</Text>}
      </View>
      <TouchableOpacity
        onPress={handlePlaceOrder}
        style={styles.placeOrderButton}
      >
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 5,
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
});

export default OrderScreen;
