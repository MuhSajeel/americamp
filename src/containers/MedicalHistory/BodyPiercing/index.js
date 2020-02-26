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
  DO_YOU_SMOKE,
  ABOUT_YOUR_TATTOOS,
  REMOVE_TATTOOS,
  ANY_TATTOOS_CHANGED,
} from '../../../constants';

class BodyPiercing extends Component {
  state = { navigationRoute: REMOVE_TATTOOS };

  componentDidMount() {
    const { AnyTattoos } = this.props;

    if (AnyTattoos) {
      this.setState({ navigationRoute: ABOUT_YOUR_TATTOOS });
    }
  }

  onInputChanged(text) {
    this.props.inputChanged(text, ANY_TATTOOS_CHANGED);
  }

  infoSubmit() {
    const data = this.props.fetchedUserProfile;
    data.medical_history = this.props.MedicalHistory;
    this.props.infoSubmited(data);
  }

  render() {
    const { navigation, AnyTattoos, loading } = this.props;
    const { navigationRoute } = this.state;
    return (
      <Card>
        {/* Screen Content */}
        <View key="content">
          <Heading>BACKGROUND INFORMATION</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            DO YOU HAVE ANY TATTOOS OR BODY PIERCING?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <PickerOptions
              label="YES"
              onPress={() => {
                this.onInputChanged(true);
                this.setState({
                  navigationRoute: ABOUT_YOUR_TATTOOS,
                });
              }}
              highlight={AnyTattoos === true}
            />
            <PickerOptions
              label="NO"
              onPress={() => {
                this.onInputChanged(false);
                this.setState({ navigationRoute: REMOVE_TATTOOS });
              }}
              highlight={!AnyTattoos}
            />
          </View>
        </View>
        {/* Content end */}

        {/* Bottom buttons  */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={!loading ? () => navigation.navigate(DO_YOU_SMOKE) : null}>
            Previous
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          {loading ? (
            <Spinner />
          ) : (
            <BottomButtonRight
              onPress={() => {
                if (!AnyTattoos) {
                  this.onInputChanged(false);
                  return this.infoSubmit();
                }
                return navigation.navigate(navigationRoute);
              }}
            >
              {AnyTattoos ? 'Next' : 'Finish'}
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
    MedicalHistory,
    AnyTattoos: MedicalHistory.tattoos_or_body_piercing,
    loading: submitInfoReducer.loading,
    fetchedUserProfile,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(BodyPiercing);
