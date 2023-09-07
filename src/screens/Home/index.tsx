import React, { useEffect, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { Car as CarModel } from '../../database/model/Car';

import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';


import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';

export function Home() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarModel[]>([]);

  const netInfo = useNetInfo();

  const navigation = useNavigation();

  function handleCarDetaikls(car: CarDTO){
    //@ts-expect-error
    navigation.navigate('CarDetails', { car });
  }

  async function offLineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post(`/users/sync`, user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;
    async function getData() {
     try {

      const carCollection = database.get<CarModel>('cars');
      const cars = await carCollection.query().fetch();

      if(isMounted) {
        setCars(cars);
      }
     } catch (error) {
      console.log(error);
     } finally {
      if(isMounted) {
        setLoading(false);
      }
     }
    }
    getData();
    return () => {
      isMounted = false;
    }
  }, [])

  useEffect(() => {
    if(netInfo.isConnected === true) {
      offLineSynchronize();
    }
  }, [netInfo]);

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
          renderItem={({ item }) =>  
            <Car 
              data={item} 
              // @ts-ignore
              onPress={() => handleCarDetaikls(item)}
            />
          }
        />
     )}
    </Container>
  );
}