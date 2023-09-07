import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Car as CarModel } from '../../database/model/Car';

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
 } from './styles';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { useNetInfo } from '@react-native-community/netinfo';

 interface Props extends RectButtonProps {
  data: CarModel;
 }

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);
  const netInfo = useNetInfo();
  
  return (
    <Container {...rest}>
      <Details>
        <Brand>
          {data.brand}
        </Brand>
        <Name>
          {data.name}
        </Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>
              {netInfo.isConnected === true ? (
                <>
                  {`R$ ${data.price}`}
                </>
                )
              : (
                <>
                  {`R$ ...`}
                </>
              )}
            </Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}