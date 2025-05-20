import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface SignUpUIProps {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  avatar: string;
  setAvatar: (v: string) => void;
  onRegister: () => void;
  loading: boolean;
  error: string | null;
  verificationSent: boolean;
}

const SignUpUI: React.FC<SignUpUIProps> = ({
  name, setName, email, setEmail, password, setPassword, phone, setPhone, avatar, setAvatar,
  onRegister, loading, error, verificationSent,
}) => (
  <View style={styles.container}>
    <Text style={styles.header}>Sign Up</Text>
    <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#888" />
    <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} placeholderTextColor="#888" keyboardType="email-address" autoCapitalize="none" />
    <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} placeholderTextColor="#888" secureTextEntry />
    <TextInput placeholder="Phone (optional)" value={phone} onChangeText={setPhone} style={styles.input} placeholderTextColor="#888" keyboardType="phone-pad" />
    <TextInput placeholder="Avatar URL (optional)" value={avatar} onChangeText={setAvatar} style={styles.input} placeholderTextColor="#888" />
    {error && <Text style={styles.error}>{error}</Text>}
    <TouchableOpacity style={styles.button} onPress={onRegister} disabled={loading || verificationSent}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
    </TouchableOpacity>
    {verificationSent && (
      <Text style={styles.success}>
        Verification email sent! Please check your inbox and verify your email before logging in.
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f4f4f9' },
  header: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 32, color: '#333' },
  input: {
    borderBottomWidth: 1, marginBottom: 20, fontSize: 16,
    paddingVertical: 10, paddingHorizontal: 12, borderColor: '#ccc', backgroundColor: '#fff', borderRadius: 6,
  },
  button: { backgroundColor: '#4CAF50', paddingVertical: 15, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 18 },
  error: { color: 'red', textAlign: 'center', marginBottom: 8 },
  success: { color: 'green', textAlign: 'center', marginTop: 16, fontSize: 16 },
});

export default SignUpUI;
