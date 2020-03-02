/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  Screen,
  Heading,
  BottomButtonLeft,
  FooterWithLogo,
  SubHeading,
  Spinner,
} from '../../../../../components/common';
import { DASHBOARD, APP_COLOR, FETCH_LAST_FOUR_DIGIT } from '../../../../../constants';
import { inputChanged } from '../../../../../redux/actions';

const StageOneNewApplicantPaymentBoarding = ({
  navigation: { navigate },
  stagesListReducer,
  loading,
  inputChanged,
}) => {
  const { due_amount: fee } = stagesListReducer[0];
  return (
    <Screen>
      <View key="header">
        <Heading>CONGRATULATIONS!</Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>
          YOU DESERVE A BISCUIT! YOU'VE NOW{' '}
          <Text style={{ color: APP_COLOR }}>COMPLETED STAGE 1</Text> OF YOUR APPLICATION!
        </SubHeading>
      </View>
      <View key="content">
        <Text style={{ marginTop: 10, marginBottom: 10 }}>
          Now you have completed the application the first step is to make your Stage One payment so
          we can set you up with an interview. Even though you already have your camp placement it
          is still a requirement, don't worry though our lovely team can't wait to talk to you about
          Camp!
        </Text>
        <View style={{ marginTop: 10, marginBottom: 10, flex: 1, alignItems: 'flex-end' }}>
          {loading ? (
            <Spinner />
          ) : (
            <BottomButtonLeft
              redButton
              onPress={() => inputChanged({ stageRouteId: 1 }, FETCH_LAST_FOUR_DIGIT)}
            >
              PROCEED
            </BottomButtonLeft>
          )}
        </View>
      </View>
      <View key="footer">
        <FooterWithLogo navigate={() => navigate(DASHBOARD)} btnTxt={{ leftBtnTxt: 'HOME' }} />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ stagsListReducer: { StagesList }, paymentReducer: { loading } }) => ({
  stagesListReducer: StagesList,
  loading,
});

export default connect(
  mapStateToProps,
  { inputChanged }
)(StageOneNewApplicantPaymentBoarding);
