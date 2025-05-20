import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface LoginUIProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
  loading: boolean;
  error: string | null;
}

const LoginUI: React.FC<LoginUIProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onSignUp,
  loading,
  error,
}) => (
  <View style={styles.container}>
    <Text style={styles.header}>Login</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
      keyboardType="email-address"
      placeholderTextColor="#888"
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
      placeholderTextColor="#888"
    />
    {error && <Text style={styles.error}>{error}</Text>}
    <TouchableOpacity style={styles.loginButton} onPress={onLogin} disabled={loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
    </TouchableOpacity>
    <View style={styles.footer}>
      <Text style={styles.text}>Don't have an account? </Text>
      <TouchableOpacity onPress={onSignUp}>
        <Text style={styles.link}>Sign up</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f7f7f7' },
  header: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#333' },
  input: {
    height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 15,
    paddingHorizontal: 15, borderRadius: 8, fontSize: 16, backgroundColor: '#fff', elevation: 1,
  },
  loginButton: { backgroundColor: '#4CAF50', paddingVertical: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 18 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  text: { fontSize: 16, color: '#333' },
  link: { fontSize: 16, color: '#007BFF', textDecorationLine: 'underline' },
  error: { color: 'red', textAlign: 'center', marginBottom: 8 },
});

export default LoginUI;
