import { Linking, Alert, Platform } from 'react-native';

const makeText = phone => {
  const bodyOp = Platform.OS === 'ios' ? '&' : '?';
  const phoneNumber = `sms:${phone}${bodyOp}body=${'Your Message'}`;

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

export { makeText };
