import React, { useRef, useState } from 'react';

import { 
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
 } from './styles';
import { FlatList, ViewToken } from 'react-native';
import { Bullets } from '../Bullets';

 interface Props {
  imagesUrl: string[];
 }

 interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
 }

export function ImageSlider({ imagesUrl }: Props) {
  const [index, setIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const indexImg = info.viewableItems[0].index!;
    console.log({indexImg});
    setIndex(indexImg);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, idx) => (
          <Bullets key={String(idx)} active={index === idx} />
        ))}
      </ImageIndexes>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={imagesUrl}
          keyExtractor={key => key}
          onViewableItemsChanged={indexChanged.current}
          renderItem={({ item }) => (
            <CarImageWrapper>
              <CarImage
                source={{ uri: item }}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )}
        />
    </Container>
  );
}``