import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { FlatList, StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

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


interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  start: string;
  end: string;
}


export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([] as CarProps[]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log({error});
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

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
                    {item.start}
                  </CarFooterDate>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={theme.colors.title}
                    style={{ marginHorizontal: 10 }}
                  />
                   <CarFooterDate>
                    {item.end}
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