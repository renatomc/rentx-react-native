import React from 'react';

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
  About,
  Acessories,
  Footer,
} from './styles';


export function CarDetails() {
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
      <About>
        Este é automóvel desportivo. Surgiu do lendário 
        touro de lide indultado na praça Real Maestranza de Sevilla.
        É um belíssimo carro para quem gosta de acelerar.
      </About>
     </Content>
     <Footer>
      <Button title="Confirmar" />
     </Footer>
    </Container>
  );
}