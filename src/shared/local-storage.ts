import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save data to AsyncStorage
export async function saveToStorage(key: string, data: any): Promise<void> {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
    console.log(`Data saved to AsyncStorage with key: ${key}`);
  } catch (error) {
    console.error('Failed to save data to AsyncStorage:', error);
    throw error;
  }
}

// Function to retrieve data from AsyncStorage
export async function getFromStorage<T>(key: string): Promise<T | null> {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData !== null) {
      return JSON.parse(jsonData) as T;
    }
    return null;
  } catch (error) {
    console.error('Failed to retrieve data from AsyncStorage:', error);
    throw error;
  }
}
