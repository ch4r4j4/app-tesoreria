// MainStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/Tabs';
import RecibosFormScreen from './screens/RecibosFormScreen'; // importa tu pantalla extra

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="RecibosForm" component={RecibosFormScreen} options={{ title: 'Nuevo Recibo' }} />
    </Stack.Navigator>
  );
}
