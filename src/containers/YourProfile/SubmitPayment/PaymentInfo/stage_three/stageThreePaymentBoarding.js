/* eslint-disable no-shadow */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  Screen,
  Heading,
  SubHeading,
  BottomButtonLeft,
  FooterWithLogo,
  Spinner,
} from '../../../../../components/common';
import { APP_COLOR, DASHBOARD, FETCH_LAST_FOUR_DIGIT } from '../../../../../constants';
import { inputChanged } from '../../../../../redux/actions';

const StageThreePaymentBoarding = ({ navigation: { navigate }, loading, inputChanged }) => {
  return (
    <Screen>
      <View key="header">
        <Heading>CONGRATULATIONS!</Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>
          YOU HAVE BEEN BEEN #PL<Text style={{ color: APP_COLOR }}>AC</Text>ED!
        </SubHeading>
      </View>
      <View key="content">
        <Text style={{ marginBottom: 10, marginTop: 10 }}>
          It&apos;s official! You have now been #plACed the countdown has begun!
        </Text>
        <Text style={{ marginBottom: 10 }}>
          To secure your place you must now make your stage 3 payment and we can begin to process
          your visa documents and get you one step closer to your Summer of a Lifetime!
        </Text>
        <View style={{ marginTop: 10, marginBottom: 10, flex: 1, alignItems: 'flex-end' }}>
          {loading ? (
            <Spinner />
          ) : (
            <BottomButtonLeft
              redButton
              onPress={() =>
                inputChanged({ stageRouteId: 3, returneeRouteId: 2 }, FETCH_LAST_FOUR_DIGIT)
              }
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

const mapStateToProps = ({ paymentReducer: { loading } }) => ({
  loading,
});

export default connect(
  mapStateToProps,
  { inputChanged }
)(StageThreePaymentBoarding);
