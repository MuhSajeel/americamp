import React, { Component } from 'react';
import { View } from 'react-native';

import { Screen, Heading, SubHeading, FooterWithButtons, Input } from '../../../components/common';

import { REFEREE_CNUM, APPLICANT_RELATIONSHIP } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class RefereeEmail extends Component {
  state = { text: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>REFEREE</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}> EMAIL ADDRESS </SubHeading>
          <View style={{ marginTop: 10 }}>
            <Input
              placeholder="Email address"
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(REFEREE_CNUM)}
            rightBtnNavigation={() => navigation.navigate(APPLICANT_RELATIONSHIP)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default RefereeEmail;
