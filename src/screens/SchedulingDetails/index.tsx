import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

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
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';


interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = useMemo(() => {
    return Number(dates.length * car.rent.price);
  }, [dates, car]);


  function handleConfirm(){
    //@ts-expect-error
    navigation.navigate('SchedulingComplete');
  }

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, [dates]);


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
            R$ {car.rent.price}
          </Price>
        </Rent>
      </Details>
      <Acessories>
        {car.accessories.map(accesory => (
          <Accessory key={accesory.type} name={accesory.name} icon={getAccessoryIcon(accesory.type)} />
        ))}
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
          <DateValue>{rentalPeriod.start}</DateValue>
        </DateInfo>
        <Feather
          name='chevron-right'
          size={RFValue(10)}
          color={theme.colors.text}
        />
        <DateInfo>
          <DateTitle>ATÉ</DateTitle>
          <DateValue>{rentalPeriod.end}</DateValue>
        </DateInfo>
      </RentalPeriod>
      <RentalPrice>
        <RentalPriceLabel>TOTAL</RentalPriceLabel>
        <RentalPriceDetails>
          <RentalPriceQuota>{`R$ ${car.rent.price} x ${dates.length} diárias`}</RentalPriceQuota>
          <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
        </RentalPriceDetails>
      </RentalPrice>
     </Content>
     <Footer>
      <Button title="Alugar agora"  color={theme.colors.success} onPress={handleConfirm}/>
     </Footer>
    </Container>
  );
}