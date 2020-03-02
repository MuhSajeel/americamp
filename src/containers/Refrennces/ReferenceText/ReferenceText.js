import React from 'react';
import { View } from 'react-native';
import { Card, BottomButtonLeft, BottomButtonRight } from '../../../components/common';
import { REFERENCE_NAME } from '../../../constants';
import { ReferenceContent } from './ReferenceContent';

const ReferenceText = ({ navigation }) => {
  return (
    <Card>
      <View key="content">
        <ReferenceContent />
      </View>
      <View key="bottomLeft">
        <BottomButtonLeft onPress={() => navigation.goBack(null)}>CANCEL</BottomButtonLeft>
      </View>
      <View key="bottomRight">
        <BottomButtonRight onPress={() => navigation.navigate(REFERENCE_NAME)}>
          NEXT
        </BottomButtonRight>
      </View>
    </Card>
  );
};

export default ReferenceText;
