import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const RoomCalculator = () => {
  const [squareMeterage, setSquareMeterage] = useState('');
  const [results, setResults] = useState(null);
  const [showAddToCartButton, setShowAddToCartButton] = useState(false);

  const calculateResults = () => {
    const A = Math.sqrt(squareMeterage); // Nearest even room length
    const L = Math.ceil(A / 0.6) * 0.6; // Room length
    const W = Math.ceil(A / 0.6) * 0.6; // Room width
    const numberOfTrim = (L * 2 + W * 2) / 3 + 1; // Number of trim
    const numberOfMainTee = squareMeterage * 0.25 + 1; // Number of main tee
    const numberOf1200XTs = squareMeterage * 1.4 + 1; // Number of 1200 XT's
    const numberOf600XTs = squareMeterage * 1.4 + 1; // Number of 600 XT's
    const numberOfTiles600 = squareMeterage / 0.36; // Number of tiles (600's)

    setResults({
      L,
      W,
      numberOfTrim,
      numberOfMainTee,
      numberOf1200XTs,
      numberOf600XTs,
      numberOfTiles600
    });
    setShowAddToCartButton(true);
  };

  const checkAvailabilityAndAddToCart = () => {
    // Logic to check availability and add items to cart
    // For demonstration purposes, let's just show an alert
    Alert.alert('Checking Availability', 'Items will be added to cart if available.');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.heading}>Enter Room Square Meterage:</Text>
          <TextInput
            style={styles.input}
            value={squareMeterage}
            onChangeText={setSquareMeterage}
            keyboardType="numeric"
          />
          <Button title="Calculate" onPress={calculateResults} />
        </View>

        {results && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultHeading}>Results:</Text>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>ROOM LENGTH (M):</Text>
              <Text style={styles.resultValue}>{results.L.toFixed(1)} meters</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>ROOM WIDTH:</Text>
              <Text style={styles.resultValue}>{results.W.toFixed(1)} meters</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>NUMBER OF TRIM (AVERAGE AMOUNT):</Text>
              <Text style={styles.resultValue}>{Math.round(results.numberOfTrim)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>NUMBER OF MAIN TEE:</Text>
              <Text style={styles.resultValue}>{Math.round(results.numberOfMainTee)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>NUMBER OF 1200 XT'S:</Text>
              <Text style={styles.resultValue}>{Math.round(results.numberOf1200XTs)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>NUMBER OF 600 XT'S:</Text>
              <Text style={styles.resultValue}>{Math.round(results.numberOf600XTs)}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>NUMBER OF TILES (600'S):</Text>
              <Text style={styles.resultValue}>{Math.round(results.numberOfTiles600)}</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.addToCartButtonContainer}>
        {showAddToCartButton && (
          <TouchableOpacity onPress={checkAvailabilityAndAddToCart} style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Check Availability and Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {},
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  resultsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    elevation: 3,
  },
  resultHeading: {
    fontSize: 18, // Increased font size for the heading
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Increased space between result items
  },
  resultLabel: {
    fontSize: 16, // Increased font size for result labels
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 16, // Increased font size for result values
  },
  addToCartButtonContainer: {
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  addToCartButton: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RoomCalculator;
