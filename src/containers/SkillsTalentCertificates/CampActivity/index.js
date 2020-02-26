import React, { Component } from 'react';
import { View } from 'react-native';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  TextAreaInput,
} from '../../../components/common';

import { STAGE_ONE, SKILLS_TALENT_CERTIFICATES } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class CampActivity extends Component {
  state = { textData: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>SKILL EVALUATION</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            WHAT MAKES YOU BELIEVE YOU CAN LEAD THIS ACTIVITY AT CAMP?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <TextAreaInput
              value={this.state.textData}
              additionalTxtStyle={{ flex: 1 }}
              onChangeText={textData => this.setState({ textData })}
              maxLength={250}
              numberOfLines={16}
              placeholder="Information here"
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(SKILLS_TALENT_CERTIFICATES)}
            rightBtnNavigation={() => navigation.navigate(STAGE_ONE)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default CampActivity;
