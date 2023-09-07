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
    imagesUrl: {
      id: string;
      photo: string;
    }[]
 }

 interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
 }

export function ImageSlider({ imagesUrl }: Props) {
  const [index, setIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const indexImg = info.viewableItems[0].index!;
    setIndex(indexImg);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl?.length > 0 && imagesUrl.map((item, idx) => (
          <Bullets key={String(item.id)} active={index === idx} />
        ))}
      </ImageIndexes>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={imagesUrl}
          keyExtractor={({ id }) => id}
          onViewableItemsChanged={indexChanged.current}
          renderItem={({ item }) => (
            <CarImageWrapper>
              <CarImage
                source={{ uri: item.photo }}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )}
        />
    </Container>
  );
}``