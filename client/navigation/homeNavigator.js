import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/homeScreen.js';
import CalculatorScreen from '../screens/calculatorScreen.js';
import CartButton from '../components/cartButton.js';


const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Home',
          headerShown: true,
          headerRight: () => <CartButton />,
        }} 
      />
      <Tab.Screen 
        name="Calculator" 
        component={CalculatorScreen} 
        options={{ 
          title: 'Calculator',
          headerShown: true,
          headerRight: () => <CartButton />,  
        }} 
      />
    </Tab.Navigator>
  );
}

export default HomeNavigator;
