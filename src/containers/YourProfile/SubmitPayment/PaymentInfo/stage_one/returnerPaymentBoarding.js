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

const StageOneReturnerPaymentBoarding = ({
  navigation: { navigate },
  stagesListReducer,
  loading,
  inputChanged,
}) => {
  const { due_amount: fee, returneeFee } = stagesListReducer[0];
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
        <Text style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
          You are returning to Camp!
        </Text>
        <Text style={{ marginBottom: 10 }}>
          In order to reserve a visa for you, a{' '}
          <Text style={{ fontWeight: 'bold' }}>&pound;{returneeFee || fee}</Text> deposit is now
          due. The final balance is then paid when your placement is confirmed in the system.
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
)(StageOneReturnerPaymentBoarding);
