import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
  setData(key, value) {
    try {
      if (value) {
        value = JSON.stringify(value);
        AsyncStorage.setItem(key, value);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        return JSON.parse(value);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async clearData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default LocalStorage;
