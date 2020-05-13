import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MainNavigator} from '../navigators/MainNavigator';
import LoginScreen from '../../screens/Login';

const Stack = createStackNavigator();

export const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
