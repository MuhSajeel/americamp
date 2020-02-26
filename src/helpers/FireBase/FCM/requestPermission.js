import firebase from 'react-native-firebase';
import { getFcmToken } from './getFcmToken';

export const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    // User has authorised
    return getFcmToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
  return null;
};
