import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

import Logo from '../../assets/logo.svg';
import api from '../../services/api';

import { Container, Header, TotalCars, HeaderContent, CarList, MyCarButton, MyCarButtonWrapper } from './styles';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';


export function Home() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);

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
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
     </Header>
     {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>  <Car data={item} onPress={() => handleCarDetaikls(item)}/>}
        />
     )}
     <MyCarButtonWrapper>
        <MyCarButton onPress={handleOpenMyCars}>
          <Ionicons 
            name='ios-car-sport'
            size={32}
            color={theme.colors.shape}
            />
        </MyCarButton>
      </MyCarButtonWrapper>
    </Container>
  );
}