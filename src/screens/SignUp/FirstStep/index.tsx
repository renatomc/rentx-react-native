import React, { useState } from 'react';
import * as Yup from 'yup';

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { Bullets } from '../../../components/Bullets';

import { 
  Container, 
  Header, 
  StepsWrap,
  Title,
  SubTitle,
  Form,
  FormTitle,
 } from './styles';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function FirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation();

  function handleBackI(){
    navigation.goBack();
  }

  async function handleNextStep(){
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome é obrigatório'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        driverLicense: Yup.string()
          .required('CNH é obrigatória')
      });

      await schema.validate({ name, email, driverLicense });
      //@ts-expect-error
      navigation.navigate("SecondStep", { user: { name, email, driverLicense } });
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      } else {
        return Alert.alert('Erro', 'Ocorreu um erro ao tentar validar suas informações, tente novamente!');
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBackI} />
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
              1. Dados
            </FormTitle>
            <Input 
              iconName="user" 
              placeholder="Nome" 
              value={name}
             onChangeText={setName} 
             />
            <Input 
              iconName="mail" 
              placeholder="Email" 
              keyboardType='email-address' 
              value={email} 
              onChangeText={setEmail} 
            />
            <Input 
              iconName="credit-card" 
              placeholder="CNH" 
              keyboardType='numeric' 
              value={driverLicense} 
              onChangeText={setDriverLicense} 
            />
          </Form>
          <Button title='Próximo' onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}