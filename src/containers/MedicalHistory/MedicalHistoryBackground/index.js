import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import {
  Card,
  BottomButtonLeft,
  BottomButtonRight,
  Heading,
  PickerOptions,
  SubHeading
} from '../../../components/common';
import {
  STAGE_ONE,
  ABOUT_YOUR_CONDITION,
  ANY_ALLERGIES,
  ANY_MEDICAL_CONDITION_CHANGED
} from '../../../constants';
import { inputChanged } from '../../../redux/actions';
import styles from './styles';

class MedicalHistoryBackground extends Component {
  state = { navigationRoute: ANY_ALLERGIES };

  componentDidMount() {
    const { anyMedicalCondition } = this.props;
    if (anyMedicalCondition) {
      this.setState({ navigationRoute: ABOUT_YOUR_CONDITION });
    }
  }

  onInputChanged(text) {
    this.props.inputChanged(text, ANY_MEDICAL_CONDITION_CHANGED);
  }

  render() {
    const { navigation, anyMedicalCondition } = this.props;
    const { navigationRoute } = this.state;
    return (
      <Card>
        {/* Screen Content */}
        <View key="content">
          <Heading>YOUR MEDICAL HISTORY AND BACKGROUND</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            DO YOU HAVE ANY MEDICAL CONDITIONS THAT MAY AFFECT YOUR APPLICATION?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <PickerOptions
              label="YES"
              onPress={() => {
                this.onInputChanged(true);
                this.setState({
                  navigationRoute: ABOUT_YOUR_CONDITION
                });
              }}
              highlight={anyMedicalCondition === true}
            />
            <PickerOptions
              label="NO"
              onPress={() => {
                this.onInputChanged(false);
                this.setState({
                  navigationRoute: ANY_ALLERGIES
                });
              }}
              highlight={!anyMedicalCondition}
            />
          </View>
        </View>
        {/* Content end */}

        {/* Bottom buttons or logo */}
        <View key="bottomLeft">
          <BottomButtonLeft
            onPress={() => {
              navigation.goBack(null);
            }}
          >
            Previous
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <BottomButtonRight
            onPress={() => {
              if (anyMedicalCondition === null) {
                this.onInputChanged(false);
                return navigation.navigate(ANY_ALLERGIES);
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
    anyMedicalCondition: MedicalHistory.any_medical_condition
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(MedicalHistoryBackground);
