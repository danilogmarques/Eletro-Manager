import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Image,
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
import { useWorkOrders } from '../../context/WorkOrdersContext';

export default function OrderDetailsScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { orders, saveReport } = useWorkOrders();
  const order = orders.find((item) => item.id === orderId);
  const [report, setReport] = useState(order?.report ?? '');
  const [photos, setPhotos] = useState<string[]>(order?.photos ?? []);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!order) router.replace('/orders');
  }, [order]);

  if (!order) return null;
  const currentOrderId = order.id;

  async function takePhoto() {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Permissão necessária',
          'Autorize o acesso à câmera nas configurações do aparelho para tirar fotos do serviço.',
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPhotos((currentPhotos) => [...currentPhotos, result.assets[0].uri]);
      }
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Não foi possível abrir a câmera.';
      Alert.alert('Erro ao abrir a câmera', message);
    }
  }

  function removePhoto(uri: string) {
    setPhotos((currentPhotos) => currentPhotos.filter((photo) => photo !== uri));
  }

  function submitReport() {
    const trimmedReport = report.trim();
    if (!trimmedReport) {
      setError('Descreva o serviço realizado antes de salvar.');
      return;
    }

    saveReport(currentOrderId, trimmedReport, photos);
    Alert.alert('Registro salvo', 'O relatório foi salvo nesta demonstração.', [
      { text: 'Voltar às ordens', onPress: () => router.replace('/orders') },
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Todas as ordens</Text>
          </Pressable>

          <Text style={styles.eyebrow}>{order.id}</Text>
          <Text style={styles.heading}>{order.service}</Text>
          <Text style={styles.customer}>{order.customer}</Text>

          <View style={styles.orderInfo}>
            <Text style={styles.infoLabel}>LOCAL DO ATENDIMENTO</Text>
            <Text style={styles.infoValue}>{order.address}</Text>
            <View style={styles.infoDivider} />
            <Text style={styles.infoLabel}>DESCRIÇÃO DA ORDEM</Text>
            <Text style={styles.infoValue}>{order.description}</Text>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Serviço realizado</Text>
              <Text style={styles.sectionHint}>Conte o que foi feito durante o atendimento.</Text>
            </View>
          </View>
          <TextInput
            accessibilityLabel="Descrição do serviço realizado"
            multiline
            onChangeText={(value) => {
              setReport(value);
              setError('');
            }}
            placeholder="Ex.: luminárias instaladas e testadas. Foi necessário substituir..."
            placeholderTextColor="#98a198"
            style={styles.reportInput}
            textAlignVertical="top"
            value={report}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={[styles.sectionHeader, styles.photoSectionHeader]}>
            <View>
              <Text style={styles.sectionTitle}>Fotos do serviço</Text>
              <Text style={styles.sectionHint}>Registre o antes e depois do atendimento.</Text>
            </View>
            <View style={styles.photoCount}>
              <Text style={styles.photoCountText}>{photos.length}</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={takePhoto}
            style={({ pressed }) => [styles.cameraButton, pressed && styles.pressed]}
          >
            <View style={styles.cameraIcon}>
              <Text style={styles.cameraIconText}>+</Text>
            </View>
            <View style={styles.cameraCopy}>
              <Text style={styles.cameraTitle}>Tirar foto</Text>
              <Text style={styles.cameraHint}>Use a câmera do aparelho</Text>
            </View>
            <Text style={styles.cameraArrow}>→</Text>
          </Pressable>

          {photos.length > 0 ? (
            <View style={styles.photoGrid}>
              {photos.map((uri, index) => (
                <View key={`${uri}-${index}`} style={styles.photoWrapper}>
                  <Image source={{ uri }} style={styles.photo} />
                  <Pressable
                    accessibilityLabel={`Remover foto ${index + 1}`}
                    accessibilityRole="button"
                    onPress={() => removePhoto(uri)}
                    style={styles.removePhoto}
                  >
                    <Text style={styles.removePhotoText}>×</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noPhotos}>As fotos adicionadas aparecerão aqui.</Text>
          )}

          <Pressable
            accessibilityRole="button"
            onPress={submitReport}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
            ]}
          >
            <Text style={styles.submitText}>Salvar registro do serviço</Text>
            <Text style={styles.submitArrow}>→</Text>
          </Pressable>
          <Text style={styles.disclaimer}>
            Registro salvo apenas nesta demonstração. A integração com a API será
            necessária para enviar os dados e as fotos.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f7f8f5' },
  keyboardAvoidingView: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 30 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', paddingVertical: 8 },
  backArrow: { color: '#526e3e', fontSize: 20 },
  backText: { color: '#526e3e', fontSize: 12, fontWeight: '700' },
  eyebrow: { marginTop: 16, color: '#628447', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  heading: { marginTop: 7, color: '#1d2b23', fontSize: 25, fontWeight: '700', letterSpacing: -0.6 },
  customer: { marginTop: 5, color: '#78837b', fontSize: 13 },
  orderInfo: { marginTop: 20, padding: 15, borderWidth: 1, borderColor: '#e5e9e2', borderRadius: 8, backgroundColor: '#ffffff' },
  infoLabel: { color: '#879187', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  infoValue: { marginTop: 5, color: '#39463d', fontSize: 12, lineHeight: 18 },
  infoDivider: { marginVertical: 12, borderTopWidth: 1, borderColor: '#edf0eb' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 10 },
  photoSectionHeader: { marginTop: 23 },
  sectionTitle: { color: '#26332b', fontSize: 15, fontWeight: '700' },
  sectionHint: { marginTop: 4, color: '#859087', fontSize: 11 },
  reportInput: {
    minHeight: 130,
    padding: 13,
    borderWidth: 1,
    borderColor: '#dce3dc',
    borderRadius: 7,
    backgroundColor: '#ffffff',
    color: '#26332b',
    fontSize: 13,
    lineHeight: 19,
  },
  error: { marginTop: 6, color: '#a33b31', fontSize: 11 },
  photoCount: { minWidth: 27, height: 27, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, borderRadius: 14, backgroundColor: '#e9efdf' },
  photoCountText: { color: '#526e3e', fontSize: 11, fontWeight: '700' },
  cameraButton: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#dce5d4',
    borderStyle: 'dashed',
    borderRadius: 7,
    backgroundColor: '#f1f5ec',
  },
  pressed: { opacity: 0.7 },
  cameraIcon: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: '#dceacb' },
  cameraIconText: { color: '#526e3e', fontSize: 24, fontWeight: '500', lineHeight: 27 },
  cameraCopy: { flex: 1, marginLeft: 11 },
  cameraTitle: { color: '#344139', fontSize: 12, fontWeight: '700' },
  cameraHint: { marginTop: 3, color: '#859087', fontSize: 10 },
  cameraArrow: { color: '#6a8054', fontSize: 19 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginTop: 12 },
  photoWrapper: { position: 'relative', width: '31%', aspectRatio: 1 },
  photo: { width: '100%', height: '100%', borderRadius: 7, backgroundColor: '#e6e9e2' },
  removePhoto: { position: 'absolute', top: 4, right: 4, width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: 'rgba(26,40,33,0.8)' },
  removePhotoText: { color: '#ffffff', fontSize: 19, lineHeight: 21 },
  noPhotos: { marginTop: 10, color: '#919b92', fontSize: 10 },
  submitButton: {
    minHeight: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    paddingHorizontal: 15,
    borderRadius: 7,
    backgroundColor: '#c0e77b',
  },
  submitButtonPressed: { backgroundColor: '#b3dc6c', opacity: 0.85 },
  submitText: { color: '#1d2b23', fontSize: 13, fontWeight: '700' },
  submitArrow: { color: '#1d2b23', fontSize: 21 },
  disclaimer: { marginTop: 10, color: '#909990', fontSize: 10, lineHeight: 15 },
});
