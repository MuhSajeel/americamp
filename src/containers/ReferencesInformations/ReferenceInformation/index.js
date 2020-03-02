import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Screen, Heading, FooterWithLogo, NoOfPages, SubHeading } from '../../../components/common';
import styles from './styles';
import { STAGE_TWO, RED_GRADIENT, REFEREE_NAME } from '../../../constants';

class ReferencesInformations extends Component {
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
          <Heading>Reference Information </Heading>
          <SubHeading>CHARACTER & REFERENCE CHECKS</SubHeading>
        </View>

        <View key="content">
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate(REFEREE_NAME)}
              style={styles.middleBox}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text style={styles.middleBoxText}>LET'S DO THIS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.lowerTextcontainer}>
            <Text style={styles.lowerText}>THERE ARE</Text>
            <NoOfPages color={RED_GRADIENT}>6</NoOfPages>
            <Text style={styles.lowerText}>PAGES FOR THIS SECTION</Text>
          </View>
        </View>
        <View key="footer">
          <FooterWithLogo
            navigate={() => navigation.navigate(STAGE_TWO)}
            btnTxt={{ leftBtnTxt: 'HOME' }}
          />
        </View>
      </Screen>
    );
  }
}

export default ReferencesInformations;
