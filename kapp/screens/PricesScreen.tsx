import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { priceService } from '../services/priceService';

type PriceItem = {
  _id: string;
  name: string;
  price: number;
  change: number;
  location: string;
  lastUpdated: string;
};

export default function PricesScreen() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchPrices = async () => {
    try {
      const data = await priceService.getPrices('खजुआर गांव, उत्तर प्रदेश');
      setPrices(data);
      setError('');
    } catch (err) {
      setError('मूल्य लोड करने में त्रुटि हुई');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPrices();
  };

  useEffect(() => {
    fetchPrices();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>बाज़ार दरें</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#166534" />
          <Text style={styles.locationText}>खजुआर गांव, उत्तर प्रदेश</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.dateText}>आज की दरें (कृषि विक्रय)</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>फिल्टर करें</Text>
          <Ionicons name="chevron-down" size={20} color="#166534" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.priceList}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#166534" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchPrices}>
              <Text style={styles.retryButtonText}>पुन: प्रयास करें</Text>
            </TouchableOpacity>
          </View>
        ) : (
          prices.map((item) => (
            <View key={item._id} style={styles.priceCard}>
              <View style={styles.leftContent}>
                <View style={styles.cropIconContainer}>
                  <Ionicons name="leaf" size={24} color="#166534" />
                </View>
                <Text style={styles.cropName}>{item.name}</Text>
              </View>
              <View style={styles.rightContent}>
                <Text style={styles.price}>₹{item.price.toLocaleString('hi-IN')}</Text>
                <View style={[
                  styles.changeContainer,
                  { backgroundColor: item.change >= 0 ? '#dcfce7' : '#fee2e2' }
                ]}>
                  <Text style={[
                    styles.changeText,
                    { color: item.change >= 0 ? '#166534' : '#dc2626' }
                  ]}>
                    {item.change >= 0 ? '+' : ''}{item.change}
                  </Text>
                  <Ionicons
                    name={item.change >= 0 ? 'arrow-up' : 'arrow-down'}
                    size={16}
                    color={item.change >= 0 ? '#166534' : '#dc2626'}
                  />
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#388E3C',
    padding: 16,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  locationText: {
    marginLeft: 8,
    color: '#166534',
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dateText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#166534',
    marginRight: 4,
  },
  priceList: {
    flex: 1,
  },
  priceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cropName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    marginRight: 4,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#166534',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 90, // Increased padding for tab bar
  },
});
