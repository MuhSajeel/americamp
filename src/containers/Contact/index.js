/* eslint-disable camelcase */
import React from 'react';
import { View, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Heading, Screen, TextImageButton, FooterWithLogo } from '../../components/common';

import { DASHBOARD, RATE_YOUR_EXPERIENCE_NAV, AMERICAMP_PHONE_NUMBER } from '../../constants';

const Contact = props => {
  const {
    navigation,
    urlLinkReducer,
    urlLinkReducer: { email_page, whatsapp_page, sms, feedback_page },
  } = props;
  console.log(urlLinkReducer);
  return (
    <Screen>
      <View key="header">
        <Heading>CONTACT AMERICAMP</Heading>
      </View>
      <View key="content">
        <TextImageButton
          onPress={() => {
            Linking.openURL(email_page);
          }}
          icon="email"
        >
          EMAIL US
        </TextImageButton>
        <TextImageButton
          icon="whatsapp"
          type="font-awesome"
          onPress={() => {
            Linking.openURL(whatsapp_page);
          }}
        >
          WHATSAPP US
        </TextImageButton>
        <TextImageButton
          icon="chat"
          onPress={() => {
            Linking.openURL(
              `sms:${AMERICAMP_PHONE_NUMBER}${
                Platform.OS === 'ios' ? '&' : '?'
              }body=${'Your Message'}`
            );
          }}
        >
          CHAT WITH US
        </TextImageButton>
        <TextImageButton
          onPress={() => {
            Linking.openURL(feedback_page);
          }}
          icon="feedback"
        >
          SUBMIT FEEDBACK
        </TextImageButton>
        <TextImageButton
          onPress={() => {
            navigation.navigate(RATE_YOUR_EXPERIENCE_NAV);
          }}
          icon="star"
        >
          RATE YOUR EXPERIENCE
        </TextImageButton>
      </View>
      <View key="footer">
        <FooterWithLogo
          navigate={() => navigation.navigate(DASHBOARD)}
          btnTxt={{ leftBtnTxt: 'Home' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ urlLinkReducer }) => ({ urlLinkReducer });

export default connect(mapStateToProps)(Contact);
