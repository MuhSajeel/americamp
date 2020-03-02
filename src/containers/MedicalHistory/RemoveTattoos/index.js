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
  Spinner,
} from '../../../components/common';
import { inputChanged, infoSubmited } from '../../../redux/actions';

import {
  ABOUT_YOUR_TATTOOS,
  WILLING_TO_REMOVE_PIERCINGS_CHANGED,
  BODY_PIERCING,
} from '../../../constants';

class RemoveTattoos extends Component {
  state = {
    backNavigationRoute: BODY_PIERCING,
  };

  componentDidMount() {
    const { AnyTattoos } = this.props;
    if (AnyTattoos) {
      this.setState({ backNavigationRoute: ABOUT_YOUR_TATTOOS });
    }
  }

  onInputChanged(text) {
    this.props.inputChanged(text, WILLING_TO_REMOVE_PIERCINGS_CHANGED);
  }

  infoSubmit() {
    const data = this.props.fetchedUserProfile;
    data.medical_history = this.props.MedicalHistory;
    this.props.infoSubmited(data);
  }

  render() {
    const { navigation, removeTattoos, loading } = this.props;
    const { backNavigationRoute } = this.state;
    return (
      <Card>
        {/* Screen Content */}
        <View key="content">
          <Heading>TATTOOS AND/ OR PIERCINGS</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            IF YOU HAVE ANY PIERCINGS, WOULD YOU BE WILLING TO REMOVE THEM FOR THE DURATION OF CAMP?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <PickerOptions
              label="YES"
              onPress={() => {
                this.onInputChanged(true);
              }}
              highlight={removeTattoos === true}
            />
            <PickerOptions
              label="NO"
              onPress={() => {
                this.onInputChanged(false);
              }}
              highlight={!removeTattoos}
            />
          </View>
        </View>
        {/* Content end */}

        {/* Bottom buttons  */}
        <View key="bottomLeft">
          <BottomButtonLeft
            onPress={!loading ? () => navigation.navigate(backNavigationRoute) : null}
          >
            Previous
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          {loading ? (
            <Spinner />
          ) : (
            <BottomButtonRight
              onPress={() => {
                if (!removeTattoos) {
                  this.onInputChanged(false);
                }
                return this.infoSubmit();
              }}
            >
              FINISH
            </BottomButtonRight>
          )}
        </View>
        {/* bottom end */}
      </Card>
    );
  }
}

const mapStateToProps = ({ MedicalHistory, submitInfoReducer, fetchedUserProfile }) => {
  return {
    AnyTattoos: MedicalHistory.tattoos_or_body_piercing,
    MedicalHistory,
    removeTattoos: MedicalHistory.willing_to_remove_piercing,
    loading: submitInfoReducer.loading,
    fetchedUserProfile,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(RemoveTattoos);
