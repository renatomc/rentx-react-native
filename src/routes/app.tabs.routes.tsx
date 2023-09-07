import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import HomeSvg from '../assets/arrow.svg';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes(){
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        }
      }}
      initialRouteName='Home'
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          )
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          )
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          )
        }}
      />
    </Navigator>
  );
}