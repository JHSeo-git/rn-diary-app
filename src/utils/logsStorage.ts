import AsyncStorage from '@react-native-community/async-storage';

const key = '__logs__';

const logsStorage = {
  async get<T>(): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(key);

      if (!raw) {
        return null;
      }

      return JSON.parse(raw);
    } catch (e: unknown) {
      throw new Error('Failed to get logs');
    }
  },
  async set<T>(data: T) {
    try {
      if (!data) {
        return;
      }

      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e: unknown) {
      throw new Error('Failed to set logs');
    }
  },
};

export default logsStorage;
