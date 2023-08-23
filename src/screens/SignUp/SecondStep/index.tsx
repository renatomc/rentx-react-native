import React, { useState } from 'react';

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Bullets } from '../../../components/Bullets';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import { 
  Container, 
  Header, 
  StepsWrap,
  Title,
  SubTitle,
  Form,
  FormTitle,
 } from './styles';
import { useTheme } from 'styled-components';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleRegister() {
    if(!password || !passwordConfirm) {
      Alert.alert('Informe a senha e a confirmação de senha');
    }
    if(password !== passwordConfirm) {
      Alert.alert('As senhas não são iguais');
    }
    // Enviar para a api e cadastrar
    // Chamar tela de confirmação de cadastro

    // @ts-expect-error
    navigation.navigate('Confirmation', {
      title: 'Conta Criada!',
      message: `Agora é só fazer login${'\n'} e aproveitar`,
      nextScreenRoute: 'SignIn'
    });
  }

  function handleBack(){
    navigation.goBack();
  } 

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <StepsWrap>
              <Bullets active />
              <Bullets />
            </StepsWrap>
          </Header>
          <Title>
            Cria sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}forma rápida e fácil
          </SubTitle>
          <Form>
            <FormTitle>
              2. Senha
            </FormTitle>
            <PasswordInput 
              iconName="lock" 
              placeholder="Senha" 
              onChangeText={setPassword} 
              value={password} 
            />
            <PasswordInput 
              iconName="lock" 
              placeholder="Repetir senha" 
              onChangeText={setPasswordConfirm} 
              value={passwordConfirm}  
            />
          </Form>
          <Button title='Cadastrar' color={theme.colors.success} onPress={handleRegister} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}