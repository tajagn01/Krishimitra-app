import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FarmInfo {
  cropName: string;
  area: string;
}

const farmData: FarmInfo[] = [
  { cropName: 'गेहू', area: '2 एकड़' },
  { cropName: 'सरसो', area: '1.5 एकड़' },
  { cropName: 'चना', area: '1.5 एकड़' },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>राम कुमार</Text>
        <Text style={styles.location}>खजुआर गांव, उत्तर प्रदेश</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>कुल एकड़</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>फसल प्रकार</Text>
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>मेरी फसलें</Text>
        </View>

        {farmData.map((crop, index) => (
          <View key={index} style={styles.cropCard}>
            <View style={styles.cropIconContainer}>
              <Ionicons name="leaf" size={24} color="#166534" />
            </View>
            <View style={styles.cropInfo}>
              <Text style={styles.cropName}>{crop.cropName}</Text>
              <Text style={styles.cropArea}>{crop.area}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#166534" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addCropButton}>
          <Ionicons name="add-circle" size={24} color="#166534" />
          <Text style={styles.addCropText}>नई फसल जोड़ें</Text>
        </TouchableOpacity>

        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="notifications-outline" size={24} color="#374151" />
            <Text style={styles.settingsButtonText}>सूचनाएं</Text>
            <Ionicons name="chevron-forward" size={24} color="#374151" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="language-outline" size={24} color="#374151" />
            <Text style={styles.settingsButtonText}>भाषा बदलें</Text>
            <Ionicons name="chevron-forward" size={24} color="#374151" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="help-circle-outline" size={24} color="#374151" />
            <Text style={styles.settingsButtonText}>सहायता</Text>
            <Ionicons name="chevron-forward" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
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
    padding: 20,
    paddingTop: 48,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  location: {
    color: '#dcfce7',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionTitle: {
    padding: 16,
    paddingBottom: 8,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  cropCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cropIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cropName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  cropArea: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  editButton: {
    padding: 8,
  },
  addCropButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dcfce7',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#166534',
    borderStyle: 'dashed',
  },
  addCropText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#166534',
    fontWeight: '600',
  },
  settingsSection: {
    backgroundColor: 'white',
    marginTop: 16,
    paddingVertical: 8,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingsButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
  },
  scrollContent: {
    paddingBottom: 80, // Add padding for tab bar
  },
});
