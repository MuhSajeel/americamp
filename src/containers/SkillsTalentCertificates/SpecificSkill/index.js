import React, { Component } from 'react';
import { View } from 'react-native';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  TextAreaInput,
} from '../../../components/common';

import { CAMP_ACTIVITY, STAGE_ONE } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class SkillEvaluation extends Component {
  state = { textData: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>SKILL EVALUATION</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            WHAT SPECIFIC SKILL CIE SOCCER, ROCK CLIMBING, ART CAN YOU INSTRUCT AT CAMP?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <TextAreaInput
              value={this.state.textData}
              additionalTxtStyle={{ flex: 1 }}
              onChangeText={textData => this.setState({ textData })}
              maxLength={250}
              numberOfLines={16}
              placeholder="Skills information here"
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(STAGE_ONE)}
            rightBtnNavigation={() => navigation.navigate(CAMP_ACTIVITY)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default SkillEvaluation;
