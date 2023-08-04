import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

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
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

export function SchedulingDetails() {
  const theme = useTheme();

  return (
    <Container>
     <Header>
      <BackButton onPress={() => {}} />
     </Header>
     <CarImages>
      <ImageSlider imagesUrl={['https://pensecarros.com.br/cms/uploads/audi-rs5-2-9-v6-tfsi-gasolina-sportback-quattro-s-tronic-6130309e27d5e.png']} />
     </CarImages>
     <Content>
      <Details>
        <Description>
          <Brand>
            Lamborghini
          </Brand>
          <Name>
            Huracan
          </Name>
        </Description>
        <Rent>
          <Period>
            Ao dia
          </Period>
          <Price>
            R$ 580
          </Price>
        </Rent>
      </Details>
      <Acessories>
        <Accessory name='380Km/h' icon={SpeedSvg} />
        <Accessory name='3.2s' icon={AccelerationSvg} />
        <Accessory name='800 HP' icon={ForceSvg} />
        <Accessory name='Gasoline' icon={GasolineSvg} />
        <Accessory name='Auto' icon={ExchangeSvg} />
        <Accessory name='2 pessoas' icon={PeopleSvg} />
      </Acessories>
      <RentalPeriod>
        <CalendarIcon>
          <Feather
            name='calendar'
            size={RFValue(24)}
            color={theme.colors.shape}
          />
        </CalendarIcon>
        <DateInfo>
          <DateTitle>DE</DateTitle>
          <DateValue>18/08/2023</DateValue>
        </DateInfo>
        <Feather
          name='chevron-right'
          size={RFValue(10)}
          color={theme.colors.text}
        />
        <DateInfo>
          <DateTitle>ATÉ</DateTitle>
          <DateValue>18/09/2023</DateValue>
        </DateInfo>
      </RentalPeriod>
      <RentalPrice>
        <RentalPriceLabel>TOTAL</RentalPriceLabel>
        <RentalPriceDetails>
          <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
          <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
        </RentalPriceDetails>
      </RentalPrice>
     </Content>
     <Footer>
      <Button title="Alugar"  color={theme.colors.success}/>
     </Footer>
    </Container>
  );
}