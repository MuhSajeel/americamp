import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Heading, BottomButtonLeft, Logo, Card } from '../../../components/common';
import { SETUP_INTERVIEWS, STAGE_ONE } from '../../../constants';
import styles from './styles';

const TripOfLifeTime = ({ navigation: { navigate } }) => {
  return (
    <Card>
      {/* Screen Content */}
      <View key="content">
        <Heading>READY TO TALK TO US ABOUT YOUR TRIP OF A LIFETIME?</Heading>
        <TouchableOpacity onPress={() => navigate(SETUP_INTERVIEWS)} style={styles.middleBox}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Text style={styles.middleBoxText}>YEAH, LET'S SETUP INTERVIEW</Text>
        </TouchableOpacity>
      </View>
      {/* Content end */}

      {/* Bottom buttons or logo */}
      <View key="bottomLeft">
        <BottomButtonLeft onPress={() => navigate(STAGE_ONE)}>HOME</BottomButtonLeft>
      </View>
      <View key="bottomRight">
        <Logo />
      </View>
      {/* bottom end */}
    </Card>
  );
};

export default TripOfLifeTime;
