import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import ListView from './ListView';
import text from './text';

const ReferenceContent = () => {
  const { firstPara, secondPara, thirdPara, list } = text[0];
  return (
    <View>
      <Text style={styles.textPara}>{firstPara}</Text>
      {renderList(list)}
      <Text style={styles.textPara}>{secondPara}</Text>
      <Text style={styles.thirdPara}>{thirdPara}</Text>
    </View>
  );
};

const renderList = list => {
  return list.map(listItem => {
    return <ListView key={Math.random()} listItem={listItem} />;
  });
};

export { ReferenceContent };
