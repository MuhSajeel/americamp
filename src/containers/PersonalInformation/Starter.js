import React from 'react';
import { View } from 'react-native';

import { Card, BottomButtonLeft, Logo } from '../../components/common';
import { StarterScreen } from '../../components/PersonalInformationScreens';
import { DASHBOARD, LAST_NAME } from '../../constants';

const Starter = props => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1 }}>
      <Card>
        {/*  Screen content */}
        <View key="content">
          <StarterScreen navigate={() => navigation.navigate(LAST_NAME)} />
        </View>
        {/* content end */}

        {/* Bottom buttons or logo */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(DASHBOARD)}>HOME</BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <Logo />
        </View>
        {/* bottom end */}
      </Card>
    </View>
  );
};

export default Starter;
