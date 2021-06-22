import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import {MainNavigator} from "../navigators/MainNavigator";
import LoginScreen from "../../screens/Login";
import HostInputScreen from "../../screens/Login/HostInput";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Stack = createStackNavigator();

export const AppContainer = () => {
  const {
    app: {hostUrl},
    auth: {user},
  } = useSelector((state: RootState) => state);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "MainNavigator" : hostUrl ? "LoginScreen" : "HostInputScreen"}>
        <Stack.Screen
          name="HostInputScreen"
          component={HostInputScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
