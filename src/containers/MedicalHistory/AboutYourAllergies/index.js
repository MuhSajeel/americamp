import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
  Card2,
  BottomButtonLeft,
  BottomButtonRight,
  SubHeading,
  TextAreaInput,
} from '../../../components/common';
import { inputChanged } from '../../../redux/actions';

import { ANY_ALLERGIES, HEALTH_OVERVIEW, ALLERGY_DETAILS_CHANGED } from '../../../constants';

class AboutYourAllergies extends Component {
  state = { navigationRoute: HEALTH_OVERVIEW };

  onInputChanged(text) {
    this.props.inputChanged(text, ALLERGY_DETAILS_CHANGED);
  }

  render() {
    const { navigation, AllergyDetails } = this.props;
    const { navigationRoute } = this.state;

    return (
      <Card2>
        {/* Screen Content */}
        <View key="content">
          <SubHeading extraStyling={{ fontSize: 25 }}>
            IF YES, PLEASE TELL US ABOUT YOUR ALLERGIES
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <TextAreaInput
              additionalTxtStyle={{
                flex: 1,
              }}
              onChangeText={textData => this.onInputChanged(textData)}
              value={AllergyDetails}
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
          <BottomButtonLeft onPress={() => navigation.navigate(ANY_ALLERGIES)}>
            Previous
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <BottomButtonRight
            onPress={AllergyDetails ? () => navigation.navigate(navigationRoute) : null}
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
  return {
    AllergyDetails: MedicalHistory.allergy_details,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(AboutYourAllergies);
