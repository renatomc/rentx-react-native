import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';
import { useTheme } from 'styled-components';
import Animated, { 
  useAnimatedGestureHandler, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

import { Container, Header, TotalCars, HeaderContent, CarList, MyCarButtonWrapper } from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ],
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positonX = positionX.value;
      ctx.positonY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positonX + event.translationX;
      positionY.value = ctx.positonY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const theme = useTheme();
  const navigation = useNavigation();

  function handleCarDetaikls(car: CarDTO){
    //@ts-expect-error
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars(){
    //@ts-expect-error
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function getData() {
     try {
      const reponse = await api.get('/cars');
      setCars(reponse.data);
     } catch (error) {
      console.log(error);
     } finally {
      setLoading(false);
     }
    }
    getData();
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  },[]);

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor="transparent"
        translucent 
      />
     <Header>
      <HeaderContent>
        <Logo 
          width={RFValue(108)}
          height={RFValue(12)} 
          />
          {!loading && (
              <TotalCars>
                {`Total de ${cars.length} carros`}
              </TotalCars>
            )}
        </HeaderContent>
     </Header>
     {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>  <Car data={item} onPress={() => handleCarDetaikls(item)}/>}
        />
     )}
     <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.buttonWrap, myCarsButtonStyle]}>
          <ButtonAnimated onPress={handleOpenMyCars}>
            <Ionicons 
              name='ios-car-sport'
              size={32}
              color={theme.colors.shape}
              />
          </ButtonAnimated>
        </Animated.View >
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.main,
    position: 'absolute',
    bottom: 13,
    right: 22,
    alignItems: 'center',
    justifyContent: 'center',
  }
});