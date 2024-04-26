import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';


const OrderScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    pickupDate: '',
  });

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      phoneNumber.trim() !== '' &&
      validatePhoneNumber(phoneNumber) &&
      pickupDate.trim() !== ''
    );
  };

  const handlePlaceOrder = () => {
    if (!isFormValid()) {
      setErrors({
        name: name.trim() === '' ? 'Name is required' : '',
        phoneNumber:
          phoneNumber.trim() === ''
            ? 'Phone number is required'
            : !validatePhoneNumber(phoneNumber)
            ? 'Invalid phone number'
            : '',
        pickupDate: pickupDate.trim() === '' ? 'Pickup date is required' : '',
      });
      return;
    }

    console.log('Order placed:', { name, email, phoneNumber, company, pickupDate });
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
        <DatePicker
          style={{width: '100%'}}
          date={pickupDate}
          mode="datetime"
          placeholder="Select pickup date and time"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: styles.input,
            // You can customize other styles here
          }}
          onDateChange={(date) => setPickupDate(date)}
          iconSource={<Icon name="calendar" size={20} color="#000" />}
        />
        {errors.pickupDate !== '' && <Text style={styles.error}>{errors.pickupDate}</Text>}
      </View>
      <TouchableOpacity
        onPress={handlePlaceOrder}
        style={[styles.placeOrderButton, !isFormValid() && { backgroundColor: '#ccc' }]}
        disabled={!isFormValid()}
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
