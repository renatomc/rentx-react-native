import React from 'react';
import LottieView from 'lottie-react-native';
import LoadCar from '../../assets/loadCar.json';

import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView 
        source={LoadCar} 
        style={{ height: 200 }} 
        resizeMode="contain" 
        autoPlay 
        loop 
      />
    </Container>
  );
}