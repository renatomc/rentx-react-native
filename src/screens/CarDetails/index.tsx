import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
      <About>
        Este é automóvel desportivo. Surgiu do lendário 
        touro de lide indultado na praça Real Maestranza de Sevilla.
        É um belíssimo carro para quem gosta de acelerar.
      </About>
     </Content>
    </Container>
  );
}