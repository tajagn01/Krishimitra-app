import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from 'react-native'; // Add this for error fallback

// Import screens with error handling
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const CropSuggestionScreen = React.lazy(() => import('./screens/CropSuggestionScreen'));
const WeatherPreparationScreen = React.lazy(() => import('./screens/WeatherPreparationScreen'));
const PestWarningScreen = React.lazy(() => import('./screens/PestWarningScreen'));

export type RootStackParamList = {
  Home: undefined;
  CropSuggestion: undefined;
  WeatherPreparation: undefined;
  PestWarning: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Error boundary component
const ErrorFallback = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Something went wrong</Text>
  </View>
);

export default function App() {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer fallback={<ErrorFallback />}>
        <React.Suspense fallback={<ErrorFallback />}>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CropSuggestion" component={CropSuggestionScreen} />
            <Stack.Screen name="WeatherPreparation" component={WeatherPreparationScreen} />
            <Stack.Screen name="PestWarning" component={PestWarningScreen} />
          </Stack.Navigator>
        </React.Suspense>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
