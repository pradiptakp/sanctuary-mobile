/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @format
 */

import {ParamListBase, RouteProp} from "@react-navigation/core";
import {MaterialBottomTabNavigationProp} from "@react-navigation/material-bottom-tabs";
import {StackNavigationProp} from "@react-navigation/stack";
import {AppRoute, AppStackParamList} from "./navigations/routes";

declare global {
  interface NavigationProps<ParamList extends ParamListBase, Route extends keyof ParamList> {
    navigation: StackNavigationProp<ParamList, Route>;
    route: RouteProp<ParamList, Route>;
  }

  interface BottomNavigationProps<ParamList extends ParamListBase, Route extends keyof ParamList> {
    navigation: MaterialBottomTabNavigationProp<ParamList, Route>;
    route: RouteProp<ParamList, Route>;
  }

  type AppScreen<Route extends AppRoute> = React.FC<NavigationProps<AppStackParamList, Route>>;
}
