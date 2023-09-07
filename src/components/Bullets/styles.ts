import styled from 'styled-components/native';

interface ImageIndexProps {
  active: boolean;
}

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 6px;
  height: 6px;
  background-color: ${({ theme, active }) => 
    active ? theme.colors.title : theme.colors.shape  
  };
  border-radius: 3px;
`;