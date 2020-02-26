import React, { Component } from 'react';
import { View } from 'react-native';

import { Screen, Heading, FooterWithButtons, Input } from '../../../components/common';

import { STAGE_TWO, APPLICANT_RELATIONSHIP } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class KnownApplication extends Component {
  state = { text: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>HOW LONG HAVE YOU KNOWN THE APPLICANT?</Heading>
          <View style={{ marginTop: 10 }}>
            <Input
              value={this.state.text}
              placeholder="YEARS/MONTHS"
              onChangeText={text => this.setState({ text })}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(APPLICANT_RELATIONSHIP)}
            rightBtnNavigation={() => navigation.navigate(STAGE_TWO)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default KnownApplication;
