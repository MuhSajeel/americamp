import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { inputChanged } from '../../../redux/actions';

import {
  Card2,
  BottomButtonLeft,
  BottomButtonRight,
  SubHeading,
  TextAreaInput,
} from '../../../components/common';

import {
  MEDICAL_HISTORY_BACKGROUND,
  ANY_ALLERGIES,
  MEDICAL_DETAIL_CHANGED,
} from '../../../constants';

class AboutYourCondition extends Component {
  state = { navigationRoute: ANY_ALLERGIES };

  onInputChanged(text) {
    this.props.inputChanged(text, MEDICAL_DETAIL_CHANGED);
  }

  render() {
    const { navigation, MedicalDetails } = this.props;
    const { navigationRoute } = this.state;
    console.log(MedicalDetails);
    return (
      <Card2>
        {/* Screen Content */}
        <View key="content">
          <SubHeading extraStyling={{ fontSize: 25 }}>
            IF YES, PLEASE TELL US ABOUT YOUR CONDITION.
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <TextAreaInput
              additionalTxtStyle={{ flex: 1 }}
              onChangeText={textData => this.onInputChanged(textData)}
              value={MedicalDetails}
              maxLength={1000}
              minLength={250}
              numberOfLines={16}
              placeholder="medical history information"
            />
          </View>
        </View>
        {/* Content end */}

        {/* Bottom buttons or logo */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(MEDICAL_HISTORY_BACKGROUND)}>
            Previous
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <BottomButtonRight
            onPress={MedicalDetails ? () => navigation.navigate(navigationRoute) : null}
          >
            Next
          </BottomButtonRight>
        </View>
        {/* bottom end */}
      </Card2>
    );
  }
}

const mapStateToProps = ({ MedicalHistory }) => {
  return { MedicalDetails: MedicalHistory.condition_details };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(AboutYourCondition);
