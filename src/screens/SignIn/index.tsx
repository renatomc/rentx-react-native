import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Container, Header, Title, SubTitle, Footer, Form } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const theme = useTheme();
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });
  
      await schema.validate({ email, password });
      // @TODO
      // Fazer o processo de login
      signIn({ email, password });
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais');
      }
      console.log({error});
    }
  }

  function handleNewAccount() {
    // @ts-expect-error
    navigation.navigate("FirstStep");

  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos{'\n'}quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input 
              iconName="mail" 
              placeholder="Email" 
              keyboardType="email-address" 
              autoCorrect={false} 
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput 
              iconName="lock" 
              placeholder="Senha" 
              value={password}
              onChangeText={setPassword}
            />
          </Form>
          <Footer>
            <Button
              title='Login'
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              light
              title='Criar conta gratuita'
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              color={theme.colors.background_secondary}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}