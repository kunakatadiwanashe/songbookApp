import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@liked_hymns';

export const saveLikedHymns = async (likedHymns: any[]) => {
  try {
    const jsonValue = JSON.stringify(likedHymns);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save liked hymns:', e);
  }
};

export const getLikedHymns = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch liked hymns:', e);
    return [];
  }
};