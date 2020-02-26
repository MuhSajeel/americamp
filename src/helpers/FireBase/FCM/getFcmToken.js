import firebase from 'react-native-firebase';

export const getFcmToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  return fcmToken;
};
