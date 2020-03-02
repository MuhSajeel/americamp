/* eslint-disable react/no-unused-state */
import React from 'react';
import { View } from 'react-native';

import { BottomButtonLeft, Card } from '../../components/common';
import { CalendarPickerScreen } from '../../components/PersonalInformationScreens';

const DateIfProblemToWork = props => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1 }}>
      <Card>
        {/*  Screen content */}
        <View key="content">
          <CalendarPickerScreen
            title="DATES AVAILABLE TO WORK"
            text2="HOUSTONE WE HAVE A PROBLEM!"
          />
        </View>
        {/* content end */}

        {/* Bottom buttons or logo */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.goBack()}>PREVIOUS</BottomButtonLeft>
        </View>
        {/* bottom end */}
      </Card>
    </View>
  );
};

export default DateIfProblemToWork;
