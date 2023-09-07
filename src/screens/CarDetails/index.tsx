import React, { useEffect, useState } from 'react';
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
import { Car as CarModel } from '../../database/model/Car';

import { 
  Container,
  Header,
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
  OfflineInfo,
} from './styles';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';


interface Params {
  car: CarModel;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const navigation = useNavigation();
  const route = useRoute();
  const netInfo = useNetInfo();

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

  useEffect(() => {
    async function getCarUpdated(){
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }
    if(netInfo.isConnected === true) {
      getCarUpdated();
    }
  }, [netInfo.isConnected]);

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
          <ImageSlider 
            imagesUrl={
              !!carUpdated?.photos 
              ? carUpdated.photos
            : [{ id: car.thumbnail, photo: car.thumbnail }]}
          />
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
          {car.period}
          </Period>
          <Price>
            {netInfo.isConnected === true ? (
              <>
                {`R$ ${carUpdated.price}`}
              </>
              ) : (
                <>
                  {`...`}
                </>
              )}
          </Price>
        </Rent>
      </Details>
      <Acessories>
       {carUpdated?.accessories?.length > 0 && carUpdated.accessories.map(accesory => (
         <Accessory key={accesory.type} name={accesory.name} icon={getAccessoryIcon(accesory.type)} />
       ))}
      </Acessories>
      <About>
        {car.about}
      </About>
     </Animated.ScrollView>
     <Footer>
      <Button 
        title="Escolher período do aluguel" 
        onPress={handleConfirmRental}
        enabled={netInfo.isConnected === true}
      />
      {netInfo.isConnected === false && (
        <OfflineInfo>
          Conect-se a Internet para ver mais detalhes e agendar seu carro!
        </OfflineInfo>
      )}
     </Footer>
    </Container>
  );
}