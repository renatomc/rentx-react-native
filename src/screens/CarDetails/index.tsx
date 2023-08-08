import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';

import { 
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer,
} from './styles';


interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  function handleConfirmRental(){
    //@ts-expect-error
    navigation.navigate('Scheduling', { car });
  }

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor="transparent"
      />
      <Animated.View style={[headerStyleAnimation]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <Animated.View style={[sliderCarStyleAnimation, { marginTop: getStatusBarHeight() + 42 }]}>
          <ImageSlider imagesUrl={car.photos} />
        </Animated.View>
      </Animated.View>
     <Animated.ScrollView
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight(),
      }}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
     >
      <Details>
        <Description>
          <Brand>
            {car.brand}
          </Brand>
          <Name>
          {car.name}
          </Name>
        </Description>
        <Rent>
          <Period>
          {car.rent.period}
          </Period>
          <Price>
          {`R$ ${car.rent.price}`}
          </Price>
        </Rent>
      </Details>
      <Acessories>
       {car.accessories.map(accesory => (
         <Accessory key={accesory.type} name={accesory.name} icon={getAccessoryIcon(accesory.type)} />
       ))}
      </Acessories>
      <About>
        {car.about}
      </About>
     </Animated.ScrollView>
     <Footer>
      <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
     </Footer>
    </Container>
  );
}