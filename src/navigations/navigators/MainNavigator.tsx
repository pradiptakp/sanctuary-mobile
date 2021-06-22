import "react-native-gesture-handler";
import React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

import HomeScreen from "../../screens/Home";
import ProfileScreen from "../../screens/Profile";
import {globalStyles} from "../../constants/globalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator shifting={true} barStyle={{backgroundColor: "white"}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={globalStyles.colors.primary}
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
              name={focused ? "account" : "account-outline"}
              size={24}
              color={globalStyles.colors.primary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
