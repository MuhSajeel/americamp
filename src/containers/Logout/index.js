/* eslint-disable no-shadow */
import React from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { Button } from 'react-native-elements';
import { inputChanged, logoutAction } from '../../redux/actions';
import { Heading, SubHeading, FooterWithButtons, Screen } from '../../components/common';
import { APP_COLOR, DASHBOARD } from '../../constants';

const { width } = Dimensions.get('window');

const LogoutScreen = ({ navigation, fetchedUserProfile, logoutAction }) => {
  return (
    <Screen>
      <View key="header">
        <Heading>LOG OUT</Heading>
        <SubHeading>ARE YOU SURE YOU WANT TO LOGOUT?</SubHeading>
      </View>
      <View key="content">
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Button
            title="OK"
            buttonStyle={{ backgroundColor: APP_COLOR, width: width * 0.35 }}
            onPress={
              fetchedUserProfile && fetchedUserProfile.token
                ? () => logoutAction(fetchedUserProfile.id)
                : null
            }
          />
          <Button
            title="CANCEL"
            buttonStyle={{ backgroundColor: APP_COLOR, width: width * 0.35 }}
            onPress={() => navigation.navigate(DASHBOARD)}
          />
        </View>
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigation.navigate(DASHBOARD)}
          btnTxt={{ leftBtnTxt: 'HOME', rightBtnTxt: null }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ fetchedUserProfile }) => {
  return {
    fetchedUserProfile,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged, logoutAction }
)(LogoutScreen);
