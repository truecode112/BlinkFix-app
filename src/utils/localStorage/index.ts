import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
export const logout = async () => {
  await Keychain.resetGenericPassword();
};

export const getTokensKeychain = async (): Promise<{
  access_token: string;
  refresh_token: string;
} | null> => {
  const generic = await Keychain.getGenericPassword();
  if (!generic) return null;
  const pass = generic.password;
  const tokens = JSON.parse(pass);
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  };
};

export const setTokensToStorage = async (tokens: {
  access_token: string;
  refresh_token: string;
}) => {
  await Keychain.setGenericPassword('tokens', JSON.stringify(tokens));
};

export const getLocalStorageLanguage = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem('#Language');

    if (value !== null) {
      // value previously stored
      return value;
    } else {
      throw new Error('Could not find local storage language');
    }
  } catch (error: any) {
    console.warn(error.message);
    return null;
  }
};
export const setLocalStorageLanguage = async (
  lng: string,
): Promise<string | null> => {
  try {
    await AsyncStorage.setItem('#Language', lng);

    return lng;
  } catch (error: any) {
    console.warn(error.message);
    return null;
  }
};
