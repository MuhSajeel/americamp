import { Linking, Alert, Platform } from 'react-native';

const makeCall = phone => {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }

  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Can not open app');
      } else {
        return Linking.openURL(phoneNumber);
      }
      return null;
    })
    .catch(error => console.log(error));
};

export { makeCall };
