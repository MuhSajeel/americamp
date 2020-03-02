import firebase from 'react-native-firebase';

export const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  return enabled || false;
};
