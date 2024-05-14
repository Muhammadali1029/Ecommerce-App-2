import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LightScreen from '../screens/lightScreen.js';
import CeilingScreen from '../screens/ceilingScreen.js';
import CalculatorScreen from '../screens/calculatorScreen.js';
import CartButton from '../components/cartButton.js';


const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Lights">
      <Tab.Screen 
        name="Lights" 
        component={LightScreen} 
        options={{ 
          title: 'Lights',
          headerShown: true,
          headerRight: () => <CartButton />,
        }} 
      />
      <Tab.Screen 
        name="Ceilings" 
        component={CeilingScreen} 
        options={{ 
          title: 'Ceilings',
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
