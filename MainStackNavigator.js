// MainStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/Tabs';
import RecibosFormScreen from './screens/RecibosFormScreen';
import RecibosFormScreenNew from './screens/RecibosFormScreennew';
import ArqueosFormScreen from './screens/ArqueosFormScreen';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="RecibosForm" component={RecibosFormScreen} options={{ title: 'Edit Recibo' }} />
      <Stack.Screen name="RecibosFormNew" component={RecibosFormScreenNew} options={{ title: 'Nuevo Recibo' }} />
      <Stack.Screen name='ArqueosForm' component={ArqueosFormScreen} options={{title:'Nuevo arqueo'}}/>
    </Stack.Navigator>
  );
}
