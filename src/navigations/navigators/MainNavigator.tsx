import 'react-native-gesture-handler';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../../containers/Home';
import ProfileScreen from '../../containers/Profile';
import {globalStyles} from '../../constants/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      shifting={true}
      barStyle={{backgroundColor: globalStyles.colors.primary}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color="white"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={focused ? 'account' : 'account-outline'}
              size={24}
              color="white"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
