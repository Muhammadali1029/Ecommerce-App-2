import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CartScreen from '../screens/cartScreen.js';
import OrderPlacementScreen from '../screens/orderScreen.js';

const Stack = createNativeStackNavigator();

const OrderNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Cart">
      <Stack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ 
          title: 'Cart',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="OrderPlacement" 
        component={OrderPlacementScreen} 
        options={{ 
          headerShown: true, // Set headerShown to true to display the custom header
          headerLeft: () => null, // Hide the back button
          title: '',
        }} 
      />
    </Stack.Navigator>
  );
}

export default OrderNavigator;
