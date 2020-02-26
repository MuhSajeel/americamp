import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
  Card,
  BottomButtonLeft,
  Logo,
  Heading,
  SubHeading,
  NoOfPages,
} from '../../../components/common';
import { PURPLE_GRADIENT, REFERENCE_TEXT, STAGE_TWO } from '../../../constants';
import styles from './styles';

const RefrenceBoarding = ({ navigation }) => {
  return (
    <Card>
      {/* Screen Content */}
      <View key="content">
        <Heading>REFERENCES</Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>
          ALL YOU NEED TO DO IS GIVE US YOUR REFEREE&apos;S
          <Text style={{ color: 'red' }}> NAME AND EMAIL</Text> ADDRESS AND WE&apos;LL DO THE REST!
        </SubHeading>
        <TouchableOpacity
          onPress={() => navigation.navigate(REFERENCE_TEXT)}
          style={styles.middleBox}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Text style={styles.middleBoxText}>NO PROBS, LET&apos;S CRACK ON!</Text>
        </TouchableOpacity>
        {/* <View style={styles.lowerTextcontainer}>
          <Text style={styles.lowerText}>THERE ARE</Text>
          <NoOfPages color={PURPLE_GRADIENT}>9</NoOfPages>
          <Text style={styles.lowerText}>PAGES FOR THIS SECTION</Text> */}
        {/* </View> */}
      </View>
      {/* Content end */}

      {/* Bottom buttons or logo */}
      <View key="bottomLeft">
        <BottomButtonLeft onPress={() => navigation.navigate(STAGE_TWO)}>HOME</BottomButtonLeft>
      </View>
      <View key="bottomRight">
        <Logo />
      </View>
      {/* bottom end */}
    </Card>
  );
};

export default RefrenceBoarding;
