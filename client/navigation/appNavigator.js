// AppNavigator.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/homeScreen.js';
import ProductDetailScreen from '../screens/productDetailScreen.js';
import OrderNavigator from './orderNavigator'; // Import OrderNavigator component
import CartButton from '../components/cartButton.js';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            headerShown: true,
            headerRight: () => <CartButton />,
          }} 
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={{ 
            headerShown: true,
            headerRight: () => <CartButton />,
          }} 
        />
        <Stack.Screen 
          name="Order" // Update to a meaningful name like "Order" instead of "Cart"
          component={OrderNavigator} // Render the OrderNavigator component
          options={{ 
            headerShown: false, // Optionally hide the header of OrderNavigator
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
