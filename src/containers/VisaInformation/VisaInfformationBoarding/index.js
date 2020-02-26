import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card, BottomButtonLeft, Logo, Heading, SubHeading } from '../../../components/common';
import { VISA_INFORMATION_COUNTRY_OF_RESIDENCE, STAGE_ONE } from '../../../constants';
import styles from './styles';

const VisaInformationBoarding = ({ navigation }) => {
  return (
    <Card>
      {/* Screen Content */}
      <View key="content">
        <Heading>YOUR VISA INFORMATION</Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>GETTING THE BALL ROLLING FOR YOU</SubHeading>
        <TouchableOpacity
          onPress={() => navigation.navigate(VISA_INFORMATION_COUNTRY_OF_RESIDENCE)}
          style={styles.middleBox}
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Text style={styles.middleBoxText}>LET&apos;S DO THIS!</Text>
        </TouchableOpacity>
      </View>
      {/* Content end */}

      {/* Bottom buttons or logo */}
      <View key="bottomLeft">
        <BottomButtonLeft onPress={() => navigation.navigate(STAGE_ONE)}>HOME</BottomButtonLeft>
      </View>
      <View key="bottomRight">
        <Logo />
      </View>
      {/* bottom end */}
    </Card>
  );
};

export default VisaInformationBoarding;
