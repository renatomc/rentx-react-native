import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { css } from 'styled-components';
import styled from 'styled-components/native';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row; 
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled.TextInput<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)``;

/**
  SINOPSE COMPLETA DE CADA FILME ABAIXO: 
  5) FRATURA (Fractured) Depois que sua esposa e filha desaparecem do pronto-socorro, um homem fica convencido de que o hospital está escondendo alguma coisa. 
  4) O HOMEM DAS SOMBRAS (The Tall Man) Uma cidade isolada começa a se desfazer pouco a pouco, conforme as crianças vão desaparecendo sem deixar pistas. De acordo com uma lenda local, o responsável seria um homem alto e misterioso, que vive nos arredores. Mas a enfermeira Julia Denning não acredita em nada disso. Pelo menos até seu filho ser raptado no meio da noite e ela ser forçada a rever seus conceitos e enfrentar seus maiores medos para tentar salvá-lo. 
  3) MEU PAI (The Father) Um homem recusa toda a ajuda de sua filha à medida que envelhece. Ele começa a duvidar dos entes queridos, de sua própria mente e de sua realidade ao tentar compreender as mudanças que estão acontecendo em sua vida. 
  2) RASTROS DE UM SEQUESTRO (Forgotten) Um homem é raptado e retorna depois de 19 dias sem nenhuma memória do que aconteceu. Então seu irmão, Jin-seok, tenta descobrir a verdade sobre seu desaparecimento. 
  1) O AMIGO OCULTO (Hide and Seek) Logo após o suicídio de sua esposa, o psicólogo David Callaway decide levar sua filha Emily para uma casa no campo. Mas as coisas se complicam quando a menina, ainda de luto, desenvolve uma amizade imaginária com um personagem chamado Charlie. ME SIGAM PARA MAIS DICAS
 */
