import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const ListView = ({ listItem }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.listBullet}>{'\u2022'}</Text>
      <Text style={styles.listText}>{listItem}</Text>
    </View>
  );
};

export default ListView;
