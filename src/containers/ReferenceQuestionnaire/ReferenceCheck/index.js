import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import {
  Screen,
  Heading,
  FooterWithLogo,
  NoOfPages,
  SubHeading,
  // NoOfPages,
} from '../../../components/common';
import styles from './styles';
import { BLUE_GRADIENT, STAGE_TWO, KNOWN_APPLICATION } from '../../../constants';

class ReferenceCheck extends Component {
  /* Will implement later */
  rightBtnClick = () => {
    return null;
  };

  render() {
    const {
      navigation,
      navigation: { navigate },
    } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>READY TO TALK TO US ABOUT YOUR TRIP OF A LIFETIME?</Heading>
          <SubHeading>CHARACTER & REFERENCE CHECKS</SubHeading>
        </View>

        <View key="content">
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate(KNOWN_APPLICATION)}
              style={styles.middleBox}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text style={styles.middleBoxText}>LET'S DO THIS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.lowerTextcontainer}>
            <Text style={styles.lowerText}>THERE ARE</Text>
            <NoOfPages color={BLUE_GRADIENT}>4</NoOfPages>
            <Text style={styles.lowerText}>PAGES FOR THIS SECTION</Text>
          </View>
        </View>
        <View key="footer">
          <FooterWithLogo navigate={() => navigate(STAGE_TWO)} btnTxt={{ leftBtnTxt: 'HOME' }} />
        </View>
      </Screen>
    );
  }
}

export default ReferenceCheck;
