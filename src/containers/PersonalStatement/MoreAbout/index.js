import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

import { Screen, Heading, FooterWithLogo, SubHeading } from '../../../components/common';

import { STAGE_ONE, PERSONAL_BACKGROUND } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class PersonalStatement extends Component {
  /* Will implement later */

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>PERSONAL STATEMENT</Heading>
        </View>
        <View key="content">
          <SubHeading
            extraStyling={{
              fontSize: 20,
            }}
          >
            YOUR CHANCE TO TELL US MORE ABOUT YOU!
          </SubHeading>
          <TouchableOpacity onPress={() => navigate(PERSONAL_BACKGROUND)} style={styles.middleBox}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Text style={styles.middleBoxText}>LET'S DO THIS!</Text>
          </TouchableOpacity>
        </View>
        <View key="footer">
          <FooterWithLogo navigate={() => navigate(STAGE_ONE)} btnTxt={{ leftBtnTxt: 'HOME' }} />
        </View>
      </Screen>
    );
  }
}

export default PersonalStatement;
