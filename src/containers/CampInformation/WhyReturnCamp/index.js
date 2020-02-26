import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

import { Screen, Heading, FooterWithLogo, SubHeading } from '../../../components/common';

import { STAGE_ONE, CAMP_DETAILS, APP_COLOR } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class CampInformation extends Component {
  /* Will implement later */

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>camp information</Heading>
        </View>
        <View key="content">
          <SubHeading
            extraStyling={{
              color: APP_COLOR,
              fontSize: 20,
            }}
          >
            what we need to know about your return to camp
          </SubHeading>
          <TouchableOpacity onPress={() => navigate(CAMP_DETAILS)} style={styles.middleBox}>
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

export default CampInformation;
