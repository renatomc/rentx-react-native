import React, { useState } from 'react';

import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from '../../components/Button';
import { useTheme } from 'styled-components';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Container, Header, Title, SubTitle, Footer, Form } from './styles';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();

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
              onPress={() => {}}
              enabled={false}
              loading={false}
            />
            <Button
              light
              title='Criar conta gratuita'
              onPress={() => {}}
              enabled={false}
              loading={false}
              color={theme.colors.background_secondary}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}