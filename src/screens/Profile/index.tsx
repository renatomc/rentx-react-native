import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { 
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
 } from './styles';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

export function Profile() {
  const { user, signOut, updateUser } = useAuth();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    Alert.alert('Tem certeza?', 'Se você sair, irá prcisar de internet para conectar-se novamente.', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: () =>  signOut(),
        style: 'destructive'
      }
    ]);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(result.canceled) {
      return;
    }

    if(result.assets) {
      const [assets] = result.assets;
      console.log({teste: assets.uri});
      setAvatar(assets.uri);
    }
  }

  async function handleUpdateUser() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH é obrigatória'),
        name: Yup.string()
          .required('Nome é obrigatório'),
      });
      
      await schema.validate({ name, driverLicense });

      const result = await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });
      console.log({result});
    } catch (error) {
      console.log({error});
      if(error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
      return Alert.alert('Não foi possível alterar suas informações');
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
             {avatar && (
               <Photo source={{ uri: avatar }} />
             )}
              <PhotoButton onPress={() => handleAvatarSelect()}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option active={option === 'dataEdit'} onPress={() => setOption('dataEdit')}>
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option active={option === 'passwordEdit'}>
                <OptionTitle active={option === 'passwordEdit'} onPress={() => setOption('passwordEdit')}>Trocar senha</OptionTitle>
              </Option>
            </Options>
            {option === 'dataEdit' && (
              <Section>
                <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={user.name}
                  value={name}
                  onChangeText={setName}
                />
                <Input
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                  value={driverLicense}
                  onChangeText={setDriverLicense}
                />
              </Section>
              )}
            {option === 'passwordEdit' && (
              <Section>
                <PasswordInput
                  iconName='lock'
                  placeholder='Senha atual'
                  autoCorrect={false}
                />
                <PasswordInput
                  iconName='lock'
                  placeholder='Nova senha'
                  autoCorrect={false}
                />
                <PasswordInput
                    iconName='lock'
                    placeholder='Repetir senha'
                    autoCorrect={false}
                />
              </Section>
            )}
            <Button
              title='Salvar alterações'
              onPress={handleUpdateUser}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}