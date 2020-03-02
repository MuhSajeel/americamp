import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
  Card,
  BottomButtonLeft,
  BottomButtonRight,
  Heading,
  PickerOptions,
  SubHeading,
} from '../../../components/common';
import { inputChanged } from '../../../redux/actions';

import {
  ABOUT_YOUR_ALLERGIES,
  BACKGROUND_INFORMATION,
  ARE_YOU_IN_GOOD_HEALTH_CHANGED,
  ANY_ALLERGIES,
} from '../../../constants';

class HealthOverview extends Component {
  state = {
    backNavigationRoute: ANY_ALLERGIES,
  };

  componentDidMount() {
    const { anyAllergies } = this.props;
    if (anyAllergies) {
      this.setState({ backNavigationRoute: ABOUT_YOUR_ALLERGIES });
    }
  }

  onInputChanged(text) {
    this.props.inputChanged(text, ARE_YOU_IN_GOOD_HEALTH_CHANGED);
  }

  render() {
    const { navigation, AREYOUINGOODHEALTH } = this.props;
    const { backNavigationRoute } = this.state;
    return (
      <Card>
        {/* Screen Content */}
        <View key="content">
          <Heading>GENERAL HEALTH OVERVIEW?</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            ARE YOU IN GOOD HEALTH, FIT, AND ABLE TO PARTICIPATE IN AND LEAD CAMP ACTIVITIES?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <PickerOptions
              label="YES"
              onPress={() => this.onInputChanged(true)}
              highlight={AREYOUINGOODHEALTH === null || AREYOUINGOODHEALTH}
            />
            <PickerOptions
              label="NO"
              onPress={() => this.onInputChanged(false)}
              highlight={AREYOUINGOODHEALTH === false}
            />
          </View>
        </View>
        {/* Content end */}

        {/* Bottom buttons  */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(backNavigationRoute)}>
            Previous
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <BottomButtonRight
            onPress={() => {
              if (AREYOUINGOODHEALTH === null) {
                this.onInputChanged(true);
              }
              return navigation.navigate(BACKGROUND_INFORMATION);
            }}
          >
            Next
          </BottomButtonRight>
        </View>
        {/* bottom end */}
      </Card>
    );
  }
}

const mapStateToProps = ({ MedicalHistory }) => {
  return {
    anyAllergies: MedicalHistory.any_allergy,

    AREYOUINGOODHEALTH: MedicalHistory.are_you_in_good_health,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(HealthOverview);
