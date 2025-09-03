import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Platform, ActivityIndicator 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

function HomeScreen() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const WEATHER_API_KEY = "2fd93913159ca115fa7e89d3f24a7878"; // Get from https://openweathermap.org/api

  useEffect(() => {
    (async () => {
      try {
        // Ask permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        // Get current position
        let pos = await Location.getCurrentPositionAsync({});
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(coords);

        // Reverse geocode to get place name
        let place = await Location.reverseGeocodeAsync({
          latitude: coords.lat,
          longitude: coords.lon,
        });

        if (place.length > 0) {
          setPlaceName(
            place[0].district || place[0].city || place[0].region || place[0].country
          );
        }

        // Fetch weather
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=hi&appid=${WEATHER_API_KEY}`
        );
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setErrorMsg("कुछ गलत हो गया।");
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#166534"
        translucent={true}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="leaf" size={32} color="white" />
            <Text style={styles.headerTitle}>स्मार्ट कृषि सलाहकार</Text>
          </View>
          <Ionicons name="settings-outline" size={24} color="white" />
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#BBF7D0" />
          <Text style={styles.locationText}>
            {placeName ? placeName : "स्थान प्राप्त हो रहा है..."}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        bounces={false}>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          {loading ? (
            <ActivityIndicator size="large" color="#166534" />
          ) : errorMsg ? (
            <Text style={{ color: "red" }}>{errorMsg}</Text>
          ) : weather ? (
            <>
              <View style={styles.weatherLeft}>
                <Ionicons name="cloud-outline" size={40} color="#22C55E" />
                <View style={styles.weatherInfo}>
                  <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
                  <Text style={styles.weatherText}>{weather.weather[0].description}</Text>
                </View>
              </View>
              <View style={styles.weatherDetails}>
                <View style={styles.weatherDetail}>
                  <Ionicons name="water-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{weather.main.humidity}%</Text>
                </View>
                <View style={styles.weatherDetail}>
                  <Ionicons name="cloud-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{weather.clouds.all}%</Text>
                </View>
              </View>
            </>
          ) : null}
        </View>

        {/* Advice Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>आज की सलाह</Text>
          
          <TouchableOpacity style={[styles.alertCard, { backgroundColor: '#FFF9E5' }]}>
            <View style={styles.alertContent}>
              <Ionicons name="cloudy-outline" size={24} color="#F59E0B" />
              <View style={styles.alertTextContent}>
                <Text style={styles.alertTitle}>मौसम चेतावनी</Text>
                <Text style={styles.alertDescription}>अगले 3 दिनों में बारिश संभव</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('WeatherPreparation')}>
              <Text style={styles.actionButtonText}>तैयारी करें</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.alertCard, { backgroundColor: '#F0FDF4' }]}>
            <View style={styles.alertContent}>
              <MaterialCommunityIcons name="leaf" size={24} color="#22C55E" />
              <View style={styles.alertTextContent}>
                <Text style={styles.alertTitle}>फसल सुझाव</Text>
                <Text style={styles.alertDescription}>रबी सीजन के लिए गेहूँ बुवाई का समय</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CropSuggestion')}>
              <Text style={styles.actionButtonText}>और जानें</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.alertCard, { backgroundColor: '#FEF2F2' }]}>
            <View style={styles.alertContent}>
              <MaterialCommunityIcons name="bug-outline" size={24} color="#EF4444" />
              <View style={styles.alertTextContent}>
                <Text style={styles.alertTitle}>कीट चेतावनी</Text>
                <Text style={styles.alertDescription}>आपके क्षेत्र में कीट का प्रकोप देखा गया</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('PestWarning')}>
              <Text style={styles.actionButtonText}>उपाय देखें</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Quick Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>त्वरित सेवाएं</Text>
          <View style={styles.servicesGrid}>
            <TouchableOpacity style={styles.serviceCard}>
              <Ionicons name="camera-outline" size={28} color="#22C55E" />
              <Text style={styles.serviceText}>फसल फोटो</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard}>
              <Ionicons name="mic-outline" size={28} color="#3B82F6" />
              <Text style={styles.serviceText}>आवाज़ से पूछें</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard}>
              <Ionicons name="stats-chart-outline" size={28} color="#F97316" />
              <Text style={styles.serviceText}>बाजार दरें</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard}>
              <Ionicons name="chatbubble-ellipses-outline" size={28} color="#A855F7" />
              <Text style={styles.serviceText}>सलाह चैट</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#388E3C' },
  header: { padding: 16, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 16 : 16 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 8 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  locationText: { color: '#BBF7D0', fontSize: 14, marginLeft: 4 },
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  weatherCard: {
    margin: 16, padding: 16, backgroundColor: 'white', borderRadius: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  weatherLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  weatherInfo: { marginLeft: 12 },
  temperature: { fontSize: 32, fontWeight: 'bold', color: '#1F2937' },
  weatherText: { color: '#6B7280' },
  weatherDetails: { gap: 4 },
  weatherDetail: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { color: '#6B7280', marginLeft: 4 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  alertCard: {
    padding: 16, borderRadius: 12, marginBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  alertContent: { flexDirection: 'row', alignItems: 'center' },
  alertTextContent: { marginLeft: 12, flex: 1 },
  alertTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  alertDescription: { color: '#6B7280', marginTop: 2 },
  actionButton: {
    marginTop: 12, paddingVertical: 6, paddingHorizontal: 12,
    borderRadius: 16, borderWidth: 1, borderColor: '#D1D5DB', alignSelf: 'flex-start',
  },
  actionButtonText: { color: '#6B7280', fontSize: 12, fontWeight: '600' },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  serviceCard: {
    width: '48%', backgroundColor: 'white', padding: 16,
    borderRadius: 12, alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  serviceText: { marginTop: 8, color: '#374151', fontWeight: '600' },
  scrollContent: { paddingBottom: 90 },
});

export default HomeScreen;