import React, { useState } from 'react';
import LoginUI from './LoginUI';
import { useAuthLogic } from './useAuthLogic';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, loading, error } = useAuthLogic();
  const navigation = useNavigation<any>();

  return (
    <LoginUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onLogin={() => handleLogin(email, password)}
      onSignUp={() => navigation.navigate('SignUp')}
      loading={loading}
      error={error}
    />
  );
};

export default LoginScreen;
