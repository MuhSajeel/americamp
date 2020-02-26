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
  MORE_ABOUT_BACKGROUND,
  BODY_PIERCING,
  DO_YOU_SMOKE_CHANGED,
  BACKGROUND_INFORMATION,
} from '../../../constants';

class DoYouSmoke extends Component {
  state = {
    backNavigationRoute: BACKGROUND_INFORMATION,
  };

  componentDidMount() {
    const { convictedOfCrime } = this.props;
    if (convictedOfCrime) {
      this.setState({ backNavigationRoute: MORE_ABOUT_BACKGROUND });
    }
  }

  onInputChanged(text) {
    this.props.inputChanged(text, DO_YOU_SMOKE_CHANGED);
  }

  render() {
    const { navigation, doYouSmoke } = this.props;
    const { backNavigationRoute } = this.state;

    return (
      <Card>
        {/* Screen Content */}
        <View key="content">
          <Heading>BACKGROUND INFORMATION</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>DO YOU SMOKE?</SubHeading>
          <View style={{ marginTop: 10 }}>
            <PickerOptions
              label="YES"
              onPress={() => {
                this.onInputChanged(true);
              }}
              highlight={doYouSmoke === true}
            />
            <PickerOptions
              label="NO"
              onPress={() => {
                this.onInputChanged(false);
              }}
              highlight={!doYouSmoke}
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
              if (doYouSmoke === null) {
                this.onInputChanged(false);
              }
              return navigation.navigate(BODY_PIERCING);
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
    convictedOfCrime: MedicalHistory.convicted_of_crime,

    doYouSmoke: MedicalHistory.smoke,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(DoYouSmoke);
