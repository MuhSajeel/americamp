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
  Spinner,
} from '../../../../../components/common';
import { DASHBOARD, FETCH_LAST_FOUR_DIGIT } from '../../../../../constants';
import { inputChanged } from '../../../../../redux/actions';

const StageTwoNewApplicantPaymentBoarding = ({
  navigation: { navigate },
  stagesListReducer,
  loading,
  inputChanged,
}) => {
  const { due_amount: fee } = stagesListReducer[1];
  return (
    <Screen>
      <View key="header">
        <Heading>ALMOST THERE...</Heading>
      </View>
      <View key="content">
        <Text style={{ marginTop: 10, marginBottom: 10 }}>
          In order for you you to be committed to the program we now require you to pay your stage
          two fees.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          The stage two fees are <Text style={{ fontWeight: 'bold' }}>&pound;{fee}</Text>, Which are
          fu
          <Text style={{ fontWeight: 'bold' }}>ll</Text>y refundable should you not get #pLAced.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          To think before you know it you could be on your way to New York or California!
        </Text>
        <View style={{ marginTop: 10, marginBottom: 10, flex: 1, alignItems: 'flex-end' }}>
          {loading ? (
            <Spinner />
          ) : (
            <BottomButtonLeft
              redButton
              onPress={() => inputChanged({ stageRouteId: 2 }, FETCH_LAST_FOUR_DIGIT)}
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
)(StageTwoNewApplicantPaymentBoarding);
