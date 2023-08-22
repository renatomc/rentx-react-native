import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';

import { Container, IconContainer, InputText, ChangePasswordVisibilityButton } from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({ iconName, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setShowPassword(!showPassword);
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
          />
      </IconContainer>
      <InputText secureTextEntry={showPassword} {...rest} />
      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
            />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
}