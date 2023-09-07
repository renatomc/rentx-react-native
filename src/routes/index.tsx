import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import { LoadAnimation } from '../components/LoadAnimation';

import { AppTabRoutes } from './app.tabs.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user, loading } = useAuth();
  console.log({loading})
  return (
   <>
    {loading ? (
      <LoadAnimation />
    ) : (
      <NavigationContainer>
        {user?.id
          ? (
            <AppTabRoutes />
          )
          : (
           <AuthRoutes />
        )}
      </NavigationContainer>
    )}
   </>
  )
}