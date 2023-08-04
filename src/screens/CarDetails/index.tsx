import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';

import { 
  Container,
  Header,
  CarImages,
  Content,
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
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental(){
    //@ts-expect-error
    navigation.navigate('Scheduling', { car });
  }

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container>
     <Header>
      <BackButton onPress={handleBack} />
     </Header>
     <CarImages>
      <ImageSlider imagesUrl={car.photos} />
     </CarImages>
     <Content>
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
     </Content>
     <Footer>
      <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
     </Footer>
    </Container>
  );
}