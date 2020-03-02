import React from 'react';
import { Text, View } from 'react-native';
import { Screen, FooterWithLogo } from '../../../../components/common';
import { DASHBOARD } from '../../../../constants';

const StaticText = ({ navigation: { navigate } }) => {
  return (
    <Screen>
      <View key="header" />
      <View key="content">
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000' }}>
          “Whoops” You need to be in full time education starting from September to be eligible for
          the support staff role, have you thought about applying as a Camp Counselor?
        </Text>

        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000', marginTop: 15 }}>
          Please give the office a call if you want to chat about the role!
        </Text>
      </View>
      <View key="footer">
        <FooterWithLogo navigate={() => navigate(DASHBOARD)} btnTxt={{ leftBtnTxt: 'HOME' }} />
      </View>
    </Screen>
  );
};
export default StaticText;
