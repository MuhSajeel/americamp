import React, { Component } from 'react';
import { View } from 'react-native';

import { Screen, Heading, FooterWithButtons, Input } from '../../../components/common';

import { KNOWN_APPLICATION_1, REFEREE_EMAIL } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class ApplicantRelationship extends Component {
  state = { text: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>RELATIONSHIP TO THE APPLICANT?</Heading>
          <View style={{ marginTop: 10 }}>
            <Input
              placeholder="I.E COLLEAGUE, TUTOR OR OTHER"
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(REFEREE_EMAIL)}
            rightBtnNavigation={() => navigation.navigate(KNOWN_APPLICATION_1)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default ApplicantRelationship;
