import axios from 'axios';
import { Platform } from 'react-native';

// When testing on physical device, use your computer's IP address
// When using emulator, you can use 10.0.2.2 for Android or localhost for iOS
const API_URL = Platform.select({
  android: 'http://10.0.2.2:3000/api',
  ios: 'http://localhost:3000/api',
  default: 'http://localhost:3000/api',
});

export const priceService = {
  // Get all prices for a specific location
  async getPrices(location?: string) {
    try {
      const response = await axios.get(`${API_URL}/prices`, {
        params: { location }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', {
          message: error.message,
          code: error.code,
          url: error.config?.url,
          method: error.config?.method,
          response: error.response?.data
        });
      } else {
        console.error('Error fetching prices:', error);
      }
      throw error;
    }
  },

  // Get prices for a specific crop
  async getCropPrices(cropName: string) {
    try {
      const response = await axios.get(`${API_URL}/prices/${cropName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching crop prices:', error);
      throw error;
    }
  },

  // Add new price
  async addPrice(priceData: {
    name: string;
    price: number;
    change: number;
    location: string;
  }) {
    try {
      const response = await axios.post(`${API_URL}/prices`, priceData);
      return response.data;
    } catch (error) {
      console.error('Error adding price:', error);
      throw error;
    }
  },

  // Update price
  async updatePrice(id: string, price: number) {
    try {
      const response = await axios.patch(`${API_URL}/prices/${id}`, { price });
      return response.data;
    } catch (error) {
      console.error('Error updating price:', error);
      throw error;
    }
  }
};
