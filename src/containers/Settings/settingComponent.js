/* eslint-disable no-shadow */
import React from 'react';
import { View, Switch, Text, Linking } from 'react-native';
import { connect } from 'react-redux';

import { inputChanged } from '../../redux/actions';
import { Heading, ViewButton, Card, BottomButtonLeft, Logo } from '../../components/common';
import {
  DASHBOARD,
  APP_COLOR,
  RESET_PASSWORD_NAV,
  FEEDBACK,
  TERMS_AND_CONDITIONS_NAV,
  TERMS_CONDITION,
  PUSH_NOTIFICATIONS,
} from '../../constants';
import CommonStyles from '../../styles/CommonStyles';
import Styles from './styles';
import { isApplyNowNull } from '../../helpers/isApplyNowNull';
import { setItem, removeItem } from '../../helpers/Localstorage/Localstorage';

const SettingsComponent = props => {
  const { navigation, fetchedUserProfile, isLogic, setLogic, inputChanged } = props;
  return (
    <Card key="card">
      <View key="content">
        <Heading key="heading-content">SETTINGS</Heading>
        <View
          key="push-notification-container"
          style={[CommonStyles.row, { justifyContent: 'space-between', marginBottom: 10 }]}
        >
          <View style={[CommonStyles.row, { flex: 6 }]} key="push-text-container">
            <View style={CommonStyles.greyCircle} key="side-circle" />
            <View style={CommonStyles.column} key="push-text">
              <Text style={Styles.itemHeading} key="Main-text">
                Push Notifications
              </Text>
              <Text key="sub-text">Receive push notifications from us</Text>
            </View>
          </View>
          <View style={{ flex: 1 }} key="push-switch">
            <Switch
              key="switch"
              onValueChange={async () => {
                if (isLogic) await setItem('tokenKey', 'tokenKey');
                else await removeItem('tokenKey');
                inputChanged({}, PUSH_NOTIFICATIONS);
                setLogic(!isLogic);
              }}
              value={isLogic}
              thumbColor={isLogic ? APP_COLOR : 'rgb(169,169,169)'}
              trackColor={{ true: 'rgba(255,0,0,0.4)', false: 'rgba(0,0,0,0.2)' }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 15 }} key="margin-style-1" />
        <ViewButton onPress={() => navigation.navigate(FEEDBACK)} key="view-button-feedback">
          FeedBack
        </ViewButton>
        <View style={{ marginBottom: 15 }} key="margin-style-2" />
        <ViewButton
          key="view-button-TNC"
          onPress={() =>
            isApplyNowNull(props.apply_now)
              ? navigation.navigate(TERMS_AND_CONDITIONS_NAV)
              : Linking.openURL(TERMS_CONDITION)
          }
        >
          Term &amp; Conditions
        </ViewButton>
        <View style={{ marginBottom: 15 }} key="margin-style-3" />
        <View style={{ marginBottom: 15 }} key="reset-password-container">
          {fetchedUserProfile && fetchedUserProfile.token ? (
            <ViewButton
              onPress={() => navigation.navigate(RESET_PASSWORD_NAV)}
              key="password-button"
            >
              Change Password
            </ViewButton>
          ) : null}
        </View>
      </View>
      <View key="bottomLeft">
        <BottomButtonLeft key="bottom-button" onPress={() => navigation.navigate(DASHBOARD)}>
          HOME
        </BottomButtonLeft>
      </View>
      <View key="bottomRight">
        <Logo key="logo" />
      </View>
    </Card>
  );
};

export default connect(
  null,
  { inputChanged }
)(SettingsComponent);
