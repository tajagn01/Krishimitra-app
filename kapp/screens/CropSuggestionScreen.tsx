import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function CropSuggestionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>फसल सुझाव</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="sprout" size={32} color="#166534" />
          <Text style={styles.cropTitle}>गेहूँ की बुवाई</Text>
          <Text style={styles.cropDescription}>
            रबी सीजन के लिए गेहूँ की बुवाई का सर्वोत्तम समय अक्टूबर-नवंबर है。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>महत्वपूर्ण बिंदु</Text>
          <View style={styles.pointsList}>
            <View style={styles.pointItem}>
              <MaterialCommunityIcons name="water" size={24} color="#3B82F6" />
              <Text style={styles.pointText}>सिंचाई: 15-20 दिन के अंतराल पर</Text>
            </View>
            <View style={styles.pointItem}>
              <MaterialCommunityIcons name="seed" size={24} color="#22C55E" />
              <Text style={styles.pointText}>बीज दर: 100-125 किग्रा/हेक्टेयर</Text>
            </View>
            <View style={styles.pointItem}>
              <MaterialCommunityIcons name="thermometer" size={24} color="#F97316" />
              <Text style={styles.pointText}>उपयुक्त तापमान: 20-25°C</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#166534',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  infoCard: {
    margin: 16,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
  },
  cropTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534',
    marginTop: 12,
  },
  cropDescription: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  pointsList: {
    gap: 16,
  },
  pointItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  pointText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
  },
});