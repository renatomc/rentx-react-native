import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';

import { Container, IconContainer, InputText, ChangePasswordVisibilityButton } from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setShowPassword(!showPassword);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
          />
      </IconContainer>
      <InputText secureTextEntry={!showPassword} {...rest} onFocus={handleInputFocus} onBlur={handleInputBlur} isFocused={isFocused} />
      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather
            name={!showPassword ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
            />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
}