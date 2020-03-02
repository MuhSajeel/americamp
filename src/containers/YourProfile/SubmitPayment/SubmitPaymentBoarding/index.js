/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { inputChanged } from '../../../../redux/actions';

import {
  GET_TRANSACTIONS,
  RETURN_TO_CAMP,
  NEW_APPLICANT,
  DIRECT_PLACEMENT,
} from '../../../../constants';

import StageThreePaymentBoarding from '../PaymentInfo/stage_three/stageThreePaymentBoarding';
import StageTwoNewApplicantPaymentBoarding from '../PaymentInfo/stage_two/newApplicantPaymentBoarding';
import StageTwoDirectPlacementPaymentBoarding from '../PaymentInfo/stage_two/directPlacementPaymentBoarding';
import StageOneNewApplicantPaymentBoarding from '../PaymentInfo/stage_one/newApplicantPaymentBoarding';
import StageOneDirectPlacementPaymentBoarding from '../PaymentInfo/stage_one/directPlacementPaymentBoarding';
import StageOneReturnerPaymentBoarding from '../PaymentInfo/stage_one/returnerPaymentBoarding';
import { Heading } from '../../../../components/common';

class SubmitPaymentBoarding extends Component {
  state = { default: null };

  componentWillMount() {
    this.props.inputChanged({ isNavigate: false }, GET_TRANSACTIONS);
  }

  renderPaymentBoarding() {
    const {
      navigation,
      apply_now: { application_type },
    } = this.props;
    const stage = navigation.getParam('dataNav', 'no_stage');
    switch (stage) {
      case 'STAGE_ONE': {
        switch (application_type) {
          case NEW_APPLICANT:
            return <StageOneNewApplicantPaymentBoarding navigation={navigation} />;
          case RETURN_TO_CAMP:
            return <StageOneReturnerPaymentBoarding navigation={navigation} />;
          case DIRECT_PLACEMENT:
            return <StageOneDirectPlacementPaymentBoarding navigation={navigation} />;
          default:
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Heading>Oops! Some thing went wrong</Heading>
                <Spinner></Spinner>
              </View>
            );
        }
      }
      case 'STAGE_TWO': {
        switch (application_type) {
          case NEW_APPLICANT:
            return <StageTwoNewApplicantPaymentBoarding navigation={navigation} />;
          case RETURN_TO_CAMP:
            return <StageThreePaymentBoarding navigation={navigation} />;
          case DIRECT_PLACEMENT:
            return <StageTwoDirectPlacementPaymentBoarding navigation={navigation} />;
          default:
            return (
              <View style={{ alignItems: 'center' }}>
                <Heading>Oops! Some thing went wrong</Heading>
              </View>
            );
        }
      }
      case 'STAGE_THREE':
        return <StageThreePaymentBoarding navigation={navigation} />;
      default:
        return (
          <View style={{ alignItems: 'center' }}>
            <Heading>Oops! Some thing went wrong</Heading>
          </View>
        );
    }
  }

  render() {
    return <View style={{ flex: 1 }}>{this.renderPaymentBoarding()}</View>;
  }
}

const mapStateToProps = ({ stageZeroReducer: { apply_now } }) => ({ apply_now });

export default connect(
  mapStateToProps,
  { inputChanged }
)(SubmitPaymentBoarding);
