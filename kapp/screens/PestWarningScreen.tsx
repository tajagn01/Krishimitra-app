import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PestWarning'>;
};

const PestWarningScreen: React.FC<Props> = ({ navigation }) => {
  const pestWarnings = [
    {
      pest: 'Aphids',
      threat: 'High',
      crops: 'Tomatoes, Peppers',
      symptoms: 'Curled leaves, yellowing, sticky residue',
      solution: 'Use neem oil or introduce ladybugs as natural predators'
    },
    {
      pest: 'Caterpillars',
      threat: 'Medium',
      crops: 'Cabbage, Lettuce',
      symptoms: 'Holes in leaves, droppings on leaves',
      solution: 'Handpick, use Bt (Bacillus thuringiensis) spray'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pest Warnings</Text>
      </View>

      <ScrollView style={styles.warningList}>
        {pestWarnings.map((warning, index) => (
          <View key={index} style={styles.warningCard}>
            <Text style={styles.pestName}>{warning.pest}</Text>
            <Text style={styles.threatLevel}>Threat Level: {warning.threat}</Text>
            <Text style={styles.detail}>Affected Crops: {warning.crops}</Text>
            <Text style={styles.detail}>Symptoms: {warning.symptoms}</Text>
            <Text style={styles.detail}>Solution: {warning.solution}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  warningList: {
    padding: 16,
  },
  warningCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pestName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  threatLevel: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '500',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default PestWarningScreen;