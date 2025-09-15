import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import RecibosScreen from '../screens/RecibosScreen';
import ArqueoScreen from '../screens/Arqueosscreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Recibos" component={RecibosScreen} />
      <Tab.Screen name="Arqueos" component={ArqueoScreen} />
    </Tab.Navigator>
  );
}
