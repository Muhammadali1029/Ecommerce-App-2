// OrderNavigator.js

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
          title: 'Place Order',
          headerShown: false,
        }} 
      />
    </Stack.Navigator>
  );
}

export default OrderNavigator;