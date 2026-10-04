import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkOrders, type WorkOrder } from '../../context/WorkOrdersContext';

function statusLabel(status: WorkOrder['status']) {
  if (status === 'completed') return 'Relatório enviado';
  if (status === 'inProgress') return 'Em andamento';
  return 'Agendada';
}

export default function OrdersScreen() {
  const { orders } = useWorkOrders();
  const activeOrders = orders.filter((order) => order.status !== 'completed');
  const completedOrders = orders.length - activeOrders.length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="dark" />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={orders}
        keyExtractor={(order) => order.id}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Tudo em dia!</Text>
            <Text style={styles.emptyText}>Novas ordens de serviço aparecerão aqui.</Text>
          </View>
        }
        ListHeaderComponent={
          <View>
            <View style={styles.topBar}>
              <View style={styles.brand}>
                <View style={styles.brandMark}>
                  <Text style={styles.brandBolt}>ϟ</Text>
                </View>
                <Text style={styles.brandName}>LUMINA<Text style={styles.brandLight}> / EQUIPE</Text></Text>
              </View>
              <View style={styles.avatar}><Text style={styles.avatarText}>EL</Text></View>
            </View>
            <Text style={styles.eyebrow}>ÁREA DO PROFISSIONAL</Text>
            <Text style={styles.heading}>Ordens de serviço</Text>
            <Text style={styles.subtitle}>Acompanhe seus atendimentos de hoje.</Text>
            <View style={styles.summaryCard}>
              <View>
                <Text style={styles.summaryLabel}>EM ABERTO</Text>
                <Text style={styles.summaryValue}>{activeOrders.length}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View>
                <Text style={styles.summaryLabel}>RELATÓRIOS ENVIADOS</Text>
                <Text style={styles.summaryValue}>{completedOrders}</Text>
              </View>
              <Text style={styles.summaryBolt}>ϟ</Text>
            </View>
            <Text style={styles.sectionTitle}>SUAS ORDENS</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(`/orders/${item.id}`)}
            style={({ pressed }) => [styles.orderCard, pressed && styles.cardPressed]}
          >
            <View style={styles.cardTop}>
              <Text style={styles.orderId}>{item.id}</Text>
              <View
                style={[
                  styles.statusBadge,
                  item.status === 'inProgress' && styles.inProgressBadge,
                  item.status === 'completed' && styles.completedBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.status === 'inProgress' && styles.inProgressText,
                    item.status === 'completed' && styles.completedText,
                  ]}
                >
                  {statusLabel(item.status)}
                </Text>
              </View>
            </View>
            <Text style={styles.serviceTitle}>{item.service}</Text>
            <Text style={styles.customer}>{item.customer}</Text>
            <View style={styles.cardDivider} />
            <View style={styles.metaRow}>
              <Text style={styles.metaIcon}>◷</Text>
              <Text style={styles.metaText}>{item.scheduledFor}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaIcon}>⌖</Text>
              <Text style={styles.metaText}>{item.address}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardAction}>
                {item.status === 'completed' ? 'Ver registro' : 'Abrir ordem'}
              </Text>
              <Text style={styles.cardArrow}>→</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f7f8f5' },
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 28 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandMark: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: '#c0e77b' },
  brandBolt: { color: '#1a2821', fontSize: 24, fontWeight: '800', lineHeight: 28 },
  brandName: { color: '#1d2b23', fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  brandLight: { color: '#829087', fontWeight: '500' },
  avatar: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#e7ecdf' },
  avatarText: { color: '#506144', fontSize: 11, fontWeight: '700' },
  eyebrow: { color: '#628447', fontSize: 10, fontWeight: '700', letterSpacing: 1.3 },
  heading: { marginTop: 7, color: '#1d2b23', fontSize: 27, fontWeight: '700', letterSpacing: -0.6 },
  subtitle: { marginTop: 5, color: '#78837b', fontSize: 13 },
  summaryCard: { minHeight: 94, flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 22, paddingHorizontal: 18, borderRadius: 9, backgroundColor: '#1a2821' },
  summaryLabel: { color: '#a8b5aa', fontSize: 9, fontWeight: '700', letterSpacing: 0.8 },
  summaryValue: { marginTop: 5, color: '#f3f5ef', fontSize: 24, fontWeight: '700' },
  summaryDivider: { height: 40, borderLeftWidth: 1, borderColor: '#526157' },
  summaryBolt: { marginLeft: 'auto', color: '#c0e77b', fontSize: 38, fontWeight: '700' },
  sectionTitle: { marginTop: 27, marginBottom: 12, color: '#7d8980', fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  orderCard: { marginBottom: 12, padding: 16, borderWidth: 1, borderColor: '#e5e9e2', borderRadius: 9, backgroundColor: '#ffffff' },
  cardPressed: { opacity: 0.75 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  orderId: { color: '#859087', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  statusBadge: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12, backgroundColor: '#f0f2ed' },
  inProgressBadge: { backgroundColor: '#edf4e5' },
  completedBadge: { backgroundColor: '#e9f2ea' },
  statusText: { color: '#768077', fontSize: 9, fontWeight: '700' },
  inProgressText: { color: '#608044' },
  completedText: { color: '#437354' },
  serviceTitle: { marginTop: 12, color: '#26332b', fontSize: 16, fontWeight: '700' },
  customer: { marginTop: 4, color: '#79847c', fontSize: 12 },
  cardDivider: { marginVertical: 13, borderTopWidth: 1, borderColor: '#edf0eb' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 7 },
  metaIcon: { width: 14, color: '#71806e', fontSize: 14, textAlign: 'center' },
  metaText: { flex: 1, color: '#67736a', fontSize: 11 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, paddingTop: 11, borderTopWidth: 1, borderColor: '#edf0eb' },
  cardAction: { color: '#526e3e', fontSize: 12, fontWeight: '700' },
  cardArrow: { color: '#526e3e', fontSize: 18 },
  emptyState: { alignItems: 'center', paddingVertical: 36 },
  emptyTitle: { color: '#26332b', fontSize: 16, fontWeight: '700' },
  emptyText: { marginTop: 7, color: '#79847c', fontSize: 12, textAlign: 'center' },
});
