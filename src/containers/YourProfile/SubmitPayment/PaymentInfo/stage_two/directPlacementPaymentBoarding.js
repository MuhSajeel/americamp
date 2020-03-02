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
import { DASHBOARD, FETCH_LAST_FOUR_DIGIT } from '../../../../../constants';
import { inputChanged } from '../../../../../redux/actions';

const StageTwoDirectPlacementPaymentBoarding = ({
  navigation: { navigate },
  stagesListReducer,
  loading,
  inputChanged,
}) => {
  const { due_amount: fee } = stagesListReducer[1];
  return (
    <Screen>
      <View key="header">
        <Heading>CONGRATULATIONS!</Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>
          YOU HAVE PASSED YOUR INTERVIEW AND WE HAVE OFFICIALLY ACCEPTED YOUR APPLICATION!
        </SubHeading>
      </View>
      <View key="content">
        <Text style={{ marginBottom: 10, marginTop: 10 }}>
          In order for us to send it to our US office for placement we now need you to make your{' '}
          <Text style={{ fontWeight: 'bold' }}>&pound;{fee}</Text> Stage Two Fee to make it
          official!
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
)(StageTwoDirectPlacementPaymentBoarding);
