import React, { useState } from 'react';
import SignUpUI from './SignUpUI';
import { useAuthLogic } from './useAuthLogic';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const { handleRegister, loading, error, verificationSent } = useAuthLogic();

  return (
    <SignUpUI
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      phone={phone}
      setPhone={setPhone}
      avatar={avatar}
      setAvatar={setAvatar}
      onRegister={() => handleRegister(name, email, password, phone, avatar)}
      loading={loading}
      error={error}
      verificationSent={verificationSent}
    />
  );
};

export default SignUpScreen;
