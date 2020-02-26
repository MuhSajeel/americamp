import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card, BottomButtonLeft, Logo, Heading, SubHeading } from '../../../components/common';
import { WORKED_BEFORE, STAGE_ONE } from '../../../constants';
import styles from './styles';

const RefrenceBoarding = ({ navigation }) => {
  return (
    <Card>
      {/* Screen Content */}
      <View key="content">
        <Heading>PLEASE TELL US ABOUT YOUR WORK EXPERIENCE</Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>LET US KNOW WHAT YOU&apos;VE DONE</SubHeading>
        <TouchableOpacity
          onPress={() => navigation.navigate(WORKED_BEFORE)}
          style={styles.middleBox}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Text style={styles.middleBoxText}>LET&apos;S COMPLETE THIS!</Text>
        </TouchableOpacity>
      </View>
      {/* Content end */}

      {/* Bottom buttons or logo */}
      <View key="bottomLeft">
        <BottomButtonLeft onPress={() => navigation.navigate(STAGE_ONE)}>HOME</BottomButtonLeft>
      </View>
      {/* <View key="bottomRight">
        <Logo />
      </View> */}
      {/* bottom end */}
    </Card>
  );
};

export default RefrenceBoarding;
