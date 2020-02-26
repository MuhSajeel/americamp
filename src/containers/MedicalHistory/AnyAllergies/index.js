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
  ABOUT_YOUR_CONDITION,
  ABOUT_YOUR_ALLERGIES,
  HEALTH_OVERVIEW,
  MEDICAL_ALLERGIES_CHANGED,
  MEDICAL_HISTORY_BACKGROUND,
} from '../../../constants';

class AnyAllergies extends Component {
  state = {
    backNavigationRoute: MEDICAL_HISTORY_BACKGROUND,
    navigationRoute: HEALTH_OVERVIEW,
  };

  componentDidMount() {
    const { anyMedicalCondition, anyAllergies } = this.props;
    if (anyMedicalCondition) {
      this.setState({ backNavigationRoute: ABOUT_YOUR_CONDITION });
    }
    if (anyAllergies) {
      this.setState({ navigationRoute: ABOUT_YOUR_ALLERGIES });
    }
  }

  onInputChanged(text) {
    this.props.inputChanged(text, MEDICAL_ALLERGIES_CHANGED);
  }

  render() {
    const { navigation, anyAllergies } = this.props;
    const { backNavigationRoute, navigationRoute } = this.state;
    return (
      <Card>
        {/* Screen Content */}
        <View key="content">
          <Heading>DO YOU HAVE ANY ALLERGIES?</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            DO YOU HAVE ANY ALLERGIES THAT MAY AFFECT YOUR APPLICATION?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <PickerOptions
              label="YES"
              onPress={() => {
                this.onInputChanged(true);
                this.setState({
                  navigationRoute: ABOUT_YOUR_ALLERGIES,
                });
              }}
              highlight={anyAllergies === true}
            />
            <PickerOptions
              label="NO"
              onPress={() => {
                this.onInputChanged(false);
                this.setState({ navigationRoute: HEALTH_OVERVIEW });
              }}
              highlight={!anyAllergies}
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
              if (anyAllergies === null) {
                this.onInputChanged(false);
                return navigation.navigate(HEALTH_OVERVIEW);
              }
              return navigation.navigate(navigationRoute);
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
    anyMedicalCondition: MedicalHistory.any_medical_condition,
    anyAllergies: MedicalHistory.any_allergy,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(AnyAllergies);
