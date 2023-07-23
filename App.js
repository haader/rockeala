import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import ScreenTurnos from './screen/turnos/screenTurnos';
import ScreenClientes from './screen/clientes/screenClientes';
import ScreenGastos from './screen/gastos/screenGastos';

import ScreenPrecios from './screen/precios/screenPrecios';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenStock from './screen/stock/screenStock';





const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Gastos" component={ScreenGastos} />
          <Tab.Screen name="Turnos" component={ScreenTurnos} />
          <Tab.Screen name="Ficha de Clientes" component={ScreenClientes} />
          
          <Tab.Screen name="Stock" component={ScreenStock} />
          <Tab.Screen name="Precios" component={ScreenPrecios} />
        </Tab.Navigator>
    </NavigationContainer>    
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
