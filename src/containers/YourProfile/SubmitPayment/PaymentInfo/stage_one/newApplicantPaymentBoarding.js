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
import { inputChanged } from '../../../../../redux/actions';
import { DASHBOARD, APP_COLOR, FETCH_LAST_FOUR_DIGIT } from '../../../../../constants';

const StageOneNewApplicantPaymentBoarding = ({
  navigation: { navigate },
  stagesListReducer,
  inputChanged,
  loading,
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
        <Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>
          Now is the time it all gets a bit real.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          In order for you to be committed to the program we require you to pay your stage one.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          This is only <Text style={{ fontWeight: 'bold' }}>&pound;{fee}</Text> and is fully
          refundable if you are not accepted into the program after the interview stage.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          To think before you know it you could be on your way to New York or California!
        </Text>
        <Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>
          Time to get excited!
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
