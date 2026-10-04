import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WorkOrdersProvider } from '../context/WorkOrdersContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <WorkOrdersProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
      </WorkOrdersProvider>
    </SafeAreaProvider>
  );
}
