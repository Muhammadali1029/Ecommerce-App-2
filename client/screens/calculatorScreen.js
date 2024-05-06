import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const RoomCalculator = () => {
  const [squareMeterage, setSquareMeterage] = useState('');
  const [results, setResults] = useState(null);

  const calculateResults = () => {
    const A = Math.sqrt(squareMeterage); // Nearest even room length
    const L = Math.ceil(A / 0.6) * 0.6; // Room length
    const W = Math.ceil(A / 0.6) * 0.6; // Room width
    const numberOfTrim = (L * 2 + W * 2) / 3 + 1; // Number of trim
    const numberOfMainTee = squareMeterage * 0.25 + 1; // Number of main tee
    const numberOf1200XTs = squareMeterage * 1.4 + 1; // Number of 1200 XT's
    const numberOf600XTs = squareMeterage * 1.4 + 1; // Number of 600 XT's
    const numberOfTiles1200 = squareMeterage / 0.72; // Number of tiles (1200's)
    const numberOfTiles600 = squareMeterage / 0.36; // Number of tiles (600's)
    const numberOfBrackets = numberOfMainTee * 3 + 1; // Number of brackets
    const numberOfWireSpins = numberOfBrackets / 3; // Number of wire spins

    setResults({
      L,
      W,
      numberOfTrim,
      numberOfMainTee,
      numberOf1200XTs,
      numberOf600XTs,
      numberOfTiles1200,
      numberOfTiles600,
      numberOfBrackets,
      numberOfWireSpins
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
            <Text style={styles.resultLabel}>NUMBER OF TILES (1200'S):</Text>
            <Text style={styles.resultValue}>{Math.round(results.numberOfTiles1200)}</Text>
          </View>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>NUMBER OF TILES (600'S):</Text>
            <Text style={styles.resultValue}>{Math.round(results.numberOfTiles600)}</Text>
          </View>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>NUMBER OF BRACKETS :</Text>
            <Text style={styles.resultValue}>{Math.round(results.numberOfBrackets)}</Text>
          </View>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>NUMBER OF WIRE SPINS :</Text>
            <Text style={styles.resultValue}>{Math.round(results.numberOfWireSpins)}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40, // Adjust this to your liking for top spacing
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
  },
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
    padding: 20, // Increased padding for better spacing
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
});

export default RoomCalculator;
