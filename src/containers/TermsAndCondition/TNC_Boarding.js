/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Screen, FooterWithButtons, EitherOrButton, Heading } from '../../components/common';
import {
  APP_COLOR,
  DOCUMENTS_LIST,
  ACCEPTANCE_OF_CAMP_ROUTE,
  ACCEPT_TERM_ACTION,
} from '../../constants';
import { inputChanged } from '../../redux/actions';

const TNC_Boarding_Comp = ({ navigation: { navigate }, inputChanged, accept_term }) => {
  const { para1, para2 } = text;
  return (
    <Screen>
      <View key="header">
        <Heading>
          <Text style={{ color: APP_COLOR }}>ACCEPT</Text> TERMS & CONDITIONS
        </Heading>
      </View>
      <View key="content">
        <ScrollView>
          <View>
            <Text>{para1}</Text>
            <Text>{para2}</Text>
          </View>
        </ScrollView>
        <EitherOrButton
          titleOne="I ACCEPT THESE TERMS & CONDITIONS"
          titleTwo="I DO NOT ACCEPT THESE TERMS & CONDITIONS"
          buttonOnePress={() => inputChanged(true, ACCEPT_TERM_ACTION)}
          buttonTwoPress={() => inputChanged(false, ACCEPT_TERM_ACTION)}
        />
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(DOCUMENTS_LIST)}
          rightBtnNavigation={accept_term ? () => navigate(ACCEPTANCE_OF_CAMP_ROUTE) : null}
          btnTxt={{ leftBtnTxt: 'CLOSE', rightBtnTxt: 'CONTINUE' }}
        />
      </View>
    </Screen>
  );
};

const text = {
  para1:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  para2:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};

const mapStateToProps = ({ programAgreementReducer: { accept_term } }) => ({ accept_term });

const TNC_Boarding = connect(
  mapStateToProps,
  { inputChanged }
)(TNC_Boarding_Comp);
export { TNC_Boarding };
