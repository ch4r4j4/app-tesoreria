// MainStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/Tabs';
import RecibosFormScreen from './screens/RecibosFormScreen';
import RecibosFormScreenNew from './screens/RecibosFormScreennew';
import ArqueosFormScreen from './screens/ArqueosFormScreen';
import ConfigurationScreen from './screens/ConfigurationScreen';
import HeaderMenu from './screens/components/HeaderMenu';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={({ navigation }) => ({
          title: "Inicio",
          headerRight: () => <HeaderMenu navigation={navigation} />,
        })}
      />
      <Stack.Screen name="RecibosForm" component={RecibosFormScreen} options={{ title: 'Edit Recibo' }} />
      <Stack.Screen name="RecibosFormNew" component={RecibosFormScreenNew} options={{ title: 'Nuevo Recibo' }} />
      <Stack.Screen name='ArqueosForm' component={ArqueosFormScreen} options={{title:'Nuevo arqueo'}}/>
      {/*opciones de menu*/}
      <Stack.Screen name="Configuration" component={ConfigurationScreen} options={{ title: "Configuración" }}/>
    </Stack.Navigator>
  );
}
