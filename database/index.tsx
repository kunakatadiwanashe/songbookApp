import AsyncStorage from '@react-native-async-storage/async-storage';

const LIKED_HYMN_KEY = '@liked_hymns';

export const saveLikedHymns = async (likedHymns: any) => {
  try {
    const jsonValue = JSON.stringify(likedHymns);
    await AsyncStorage.setItem(LIKED_HYMN_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save liked hymns:', e);
  }
};

export const getLikedHymns = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(LIKED_HYMN_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch liked hymns:', e);
    return [];
  }
};