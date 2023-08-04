import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import { 
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueWrap,
  Content,
  Footer,
 } from './styles';

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleConfirm(){
    //@ts-expect-error
    navigation.navigate('SchedulingDetails');
  }

  return (
    <Container>
       <StatusBar 
        barStyle='light-content'
        backgroundColor="transparent"
        translucent 
      />
      <Header>
        <BackButton onPress={() => {}} color={theme.colors.shape} />
        <Title>
          Escolha uma {'\n'} data de início e {'\n'} fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueWrap selected={true}>
              <DateValue>23/12/2023</DateValue>
            </DateValueWrap>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueWrap selected={false}>
              <DateValue />
            </DateValueWrap>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar />
      </Content>
      <Footer>
        <Button title='Confirmar' onPress={handleConfirm}/>
      </Footer>
    </Container>
  );
}