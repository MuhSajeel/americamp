import React from 'react';
import { View } from 'react-native';

import { Card, BottomButtonLeft, Logo } from '../../../components/common';
import { StarterScreen } from '../../../components/JobPreferences';
import { DASHBOARD, ROLE_YOU_PREFER } from '../../../constants';

const Starter = props => {
  return (
    <View style={{ flex: 1 }}>
      <Card>
        {/*  Screen content */}
        <View key="content">
          <StarterScreen navigate={() => props.navigation.navigate(ROLE_YOU_PREFER)} />
        </View>
        {/* content end */}

        {/* Bottom buttons or logo */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => props.navigation.navigate(DASHBOARD)}>
            HOME
          </BottomButtonLeft>
        </View>
        {/* <View key="bottomRight">
          <Logo />

        </View> */}
        {/* bottom end */}
      </Card>
    </View>
  );
};

export default Starter;
