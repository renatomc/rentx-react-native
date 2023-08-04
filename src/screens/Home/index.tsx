import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';
import { Car } from '../../components/Car';

export function Home() {
  const navigation = useNavigation();

  const carData = {
    brand: 'Audi',
    name: 'RS Coupé',
    rent: {
      period: 'Ao dia',
      price: 500,
    },
    thumbnail: 'https://pensecarros.com.br/cms/uploads/audi-rs5-2-9-v6-tfsi-gasolina-sportback-quattro-s-tronic-6130309e27d5e.png'
  };

  function handleCarDetaikls(){
    //@ts-expect-error
    navigation.navigate('CarDetails');
  }

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
      <CarList
        data={[1,2,3]}
        keyExtractor={item => String(item)}
        renderItem={({item}) =>  <Car data={carData} onPress={handleCarDetaikls}/>}
      />
    </Container>
  );
}