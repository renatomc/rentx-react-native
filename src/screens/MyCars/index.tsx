import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import api from '../../services/api';
import { FlatList, StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car as CarModel } from '../../database/model/Car';

import { 
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFotterPeriod,
  CarFooterDate,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { format, parseISO } from 'date-fns';

interface DataProps {
  id: string;
  car: CarModel;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [cars, setCars] = useState<DataProps[]>([] as DataProps[]);
  const [loading, setLoading] = useState(true);
  const isFocus = useIsFocused();

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get(`/rentals`);
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          }
        });
        setCars(dataFormatted);
      } catch (error) {
        console.log({error});
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [isFocus]);

  return (
    <Container>
       <StatusBar 
        barStyle='light-content'
        backgroundColor="transparent"
        translucent 
      />
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Histórico
        </Title>
        <SubTitle>
          Detalhes de agendamentos
        </SubTitle>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>
        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => 
            <CarWrapper>
              <Car data={item.car} />
              <CarFooter>
                <CarFooterTitle>Período</CarFooterTitle>
                <CarFotterPeriod>
                  <CarFooterDate>
                    {item.start_date}
                  </CarFooterDate>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={theme.colors.title}
                    style={{ marginHorizontal: 10 }}
                  />
                   <CarFooterDate>
                    {item.end_date}
                  </CarFooterDate>
                </CarFotterPeriod>
              </CarFooter>
            </CarWrapper>
          }
        />
      </Content>
      )}

    </Container>
  );
}