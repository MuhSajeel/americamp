import React, { Component } from 'react';
import { View } from 'react-native';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  TextAreaInput,
} from '../../../components/common';

import { APPLICANT_SUPERVISION, REFERENCE_INFORMATIONS } from '../../../constants';

class ApplicantSuitability extends Component {
  state = { textData: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <SubHeading extraStyling={{ fontSize: 25 }}>
            DOES THE APPLICANT SHOW OF ANY BEHAVIOUR WHICH YOU FEEL WOULD CAUSE A CONCERN WHEN
            WORKING DIRECTLY WITH CHILDREN?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <TextAreaInput
              value={this.state.textData}
              additionalTxtStyle={{ flex: 1 }}
              onChangeText={textData => this.setState({ textData })}
              maxLength={250}
              numberOfLines={16}
              placeholder="Please comment on the applicant's suitability for this program"
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(APPLICANT_SUPERVISION)}
            rightBtnNavigation={() => navigation.navigate(REFERENCE_INFORMATIONS)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default ApplicantSuitability;
