import React, { Component } from 'react';
import { View } from 'react-native';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  TextAreaInput,
} from '../../../components/common';

import { KNOWN_APPLICATION, APPLICANT_SUITABILITY } from '../../../constants';

class ApplicantSupervision extends Component {
  state = { textData: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <SubHeading extraStyling={{ fontSize: 25 }}>
            WOULD YOU BE WILLING AND COMPLETELY COMFORTABLE LEAVING YOUR CHILDREN UNDER THE
            APPLICANT'S SUPERVISION?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <TextAreaInput
              value={this.state.textData}
              additionalTxtStyle={{ flex: 1 }}
              onChangeText={textData => this.setState({ textData })}
              maxLength={250}
              numberOfLines={16}
              placeholder="Please explain"
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(KNOWN_APPLICATION)}
            rightBtnNavigation={() => navigation.navigate(APPLICANT_SUITABILITY)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default ApplicantSupervision;
