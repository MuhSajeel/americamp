import React, { Component } from 'react';
import { View } from 'react-native';

import { Screen, Heading, SubHeading, FooterWithButtons, Input } from '../../../components/common';

import { REFERENCE_CHECK, APPLICANT_SUPERVISION } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class KnownApplication extends Component {
  state = { text: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>REFERENCE QUESTIONNAIRE</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            HOW LONG HAVE YOU KNOWN THIS APPLICATION?
          </SubHeading>
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
            leftBtnNavigation={() => navigation.navigate(REFERENCE_CHECK)}
            rightBtnNavigation={() => navigation.navigate(APPLICANT_SUPERVISION)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default KnownApplication;
