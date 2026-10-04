import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEMO_EMAIL = 'eletricista@lumina.com';
const DEMO_PASSWORD = 'eletrica2026';

export default function LoginScreen() {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  function handleLogin() {
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('Confira o e-mail e a senha de demonstração.');
      return;
    }

    router.replace('/orders');
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandPanel}>
            <View style={styles.brandLockup}>
              <View style={styles.brandMark}>
                <Text style={styles.brandBolt}>ϟ</Text>
              </View>
              <Text style={styles.brandName}>
                LUMINA<Text style={styles.brandLight}> / EQUIPE</Text>
              </Text>
            </View>

            <View style={styles.brandMessage}>
              <Text style={styles.eyebrowLight}>SEU TRABALHO, EM BOA CORRENTE</Text>
              <Text style={styles.brandTitle}>Pronto para{'\n'}mais um serviço?</Text>
              <Text style={styles.brandDescription}>
                Acesse suas ordens e registre cada etapa do trabalho em campo.
              </Text>
            </View>
            <Text style={styles.brandFooter}>GESTÃO ELÉTRICA · EQUIPE DE CAMPO</Text>
          </View>

          <View style={styles.formPanel}>
            <Text style={styles.eyebrowDark}>ÁREA DO PROFISSIONAL</Text>
            <Text style={styles.heading}>Entrar na sua conta</Text>
            <Text style={styles.intro}>Acesse suas ordens de serviço.</Text>

            <View style={styles.form}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                accessibilityLabel="E-mail"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(value) => {
                  setEmail(value);
                  setError('');
                }}
                returnKeyType="next"
                style={styles.input}
                textContentType="emailAddress"
                value={email}
              />

              <Text style={[styles.label, styles.passwordLabel]}>Senha</Text>
              <View style={styles.passwordControl}>
                <TextInput
                  accessibilityLabel="Senha"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  onChangeText={(value) => {
                    setPassword(value);
                    setError('');
                  }}
                  onSubmitEditing={handleLogin}
                  returnKeyType="go"
                  secureTextEntry={!passwordVisible}
                  style={[styles.input, styles.passwordInput]}
                  textContentType="password"
                  value={password}
                />
                <Pressable
                  accessibilityLabel={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                  accessibilityRole="button"
                  onPress={() => setPasswordVisible((visible) => !visible)}
                  style={styles.passwordToggle}
                >
                  <Text style={styles.passwordToggleText}>
                    {passwordVisible ? 'Ocultar' : 'Mostrar'}
                  </Text>
                </Pressable>
              </View>

              {error ? (
                <Text accessibilityLiveRegion="polite" style={styles.error}>
                  {error}
                </Text>
              ) : null}

              <Pressable
                accessibilityRole="button"
                onPress={handleLogin}
                style={({ pressed }) => [
                  styles.submitButton,
                  pressed && styles.submitButtonPressed,
                ]}
              >
                <Text style={styles.submitText}>Entrar</Text>
                <Text style={styles.submitArrow}>→</Text>
              </Pressable>
            </View>

            <View style={styles.demoCredentials}>
              <View style={styles.demoDot} />
              <View style={styles.demoCopy}>
                <Text style={styles.demoTitle}>Acesso de demonstração</Text>
                <Text selectable style={styles.demoText}>
                  {DEMO_EMAIL} · {DEMO_PASSWORD}
                </Text>
              </View>
            </View>
            <Text style={styles.disclaimer}>
              Login demonstrativo. Não use estas credenciais em produção.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1a2821' },
  keyboardAvoidingView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  brandPanel: {
    minHeight: 285,
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 22,
    backgroundColor: '#1a2821',
  },
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  brandMark: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#c0e77b',
  },
  brandBolt: { color: '#1a2821', fontSize: 26, fontWeight: '800', lineHeight: 30 },
  brandName: { color: '#f3f5ef', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  brandLight: { color: '#91a095', fontWeight: '500' },
  brandMessage: { paddingVertical: 26 },
  eyebrowLight: { color: '#c0e77b', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  brandTitle: {
    marginTop: 13,
    color: '#f3f5ef',
    fontSize: 34,
    fontWeight: '600',
    letterSpacing: -0.8,
    lineHeight: 39,
  },
  brandDescription: { maxWidth: 330, marginTop: 10, color: '#b4c0b6', fontSize: 13, lineHeight: 20 },
  brandFooter: { color: '#899a8e', fontSize: 9, fontWeight: '700', letterSpacing: 1.2 },
  formPanel: { flexGrow: 1, paddingHorizontal: 26, paddingTop: 28, paddingBottom: 22, backgroundColor: '#f7f8f5' },
  eyebrowDark: { color: '#628447', fontSize: 10, fontWeight: '700', letterSpacing: 1.4 },
  heading: { marginTop: 10, color: '#1d2b23', fontSize: 25, fontWeight: '700', letterSpacing: -0.5 },
  intro: { marginTop: 5, marginBottom: 24, color: '#78837b', fontSize: 13 },
  form: { gap: 9 },
  label: { color: '#344139', fontSize: 12, fontWeight: '700' },
  passwordLabel: { marginTop: 6 },
  input: {
    height: 48,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#dce3dc',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    color: '#26332b',
    fontSize: 14,
  },
  passwordControl: { justifyContent: 'center' },
  passwordInput: { paddingRight: 82 },
  passwordToggle: { position: 'absolute', right: 12, minHeight: 44, justifyContent: 'center', paddingHorizontal: 4 },
  passwordToggleText: { color: '#647568', fontSize: 12, fontWeight: '600' },
  error: { color: '#a33b31', fontSize: 12 },
  submitButton: {
    minHeight: 48,
    marginTop: 7,
    paddingHorizontal: 15,
    borderRadius: 6,
    backgroundColor: '#c0e77b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  submitButtonPressed: { backgroundColor: '#b3dc6c', opacity: 0.85 },
  submitText: { color: '#1d2b23', fontSize: 14, fontWeight: '700' },
  submitArrow: { color: '#1d2b23', fontSize: 22, lineHeight: 24 },
  demoCredentials: {
    flexDirection: 'row',
    gap: 11,
    marginTop: 24,
    padding: 13,
    borderWidth: 1,
    borderColor: '#e0e9d8',
    borderRadius: 6,
    backgroundColor: '#eef2e9',
  },
  demoDot: { width: 8, height: 8, marginTop: 3, borderRadius: 4, backgroundColor: '#8eae5a' },
  demoCopy: { flex: 1 },
  demoTitle: { marginBottom: 4, color: '#435341', fontSize: 11, fontWeight: '700' },
  demoText: { color: '#71806e', fontSize: 11 },
  disclaimer: { marginTop: 12, color: '#909990', fontSize: 10, lineHeight: 16 },
});
