import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { FirstStep } from '../screens/SignUp/FirstStep';
import { SecondStep } from '../screens/SignUp/SecondStep';
import { Confirmation } from '../screens/Confirmation';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
  return (
    <Navigator initialRouteName='Splash'>
      <Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false
        }}
      />
      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false
        }}
      />
      <Screen
        name="FirstStep"
        component={FirstStep}
        options={{
          headerShown: false
        }}
      />
      <Screen
        name="SecondStep"
        component={SecondStep}
        options={{
          headerShown: false
        }}
      />
      <Screen
        name="Confirmation"
        component={Confirmation}
        options={{
          headerShown: false
        }}
      />
    </Navigator>
  );
}