/* eslint-disable camelcase */
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { referenceOneEmail } from '../../../redux/actions';

import { Screen, FooterWithButtons, Heading, Input, SubHeading } from '../../../components/common';
import {
  REFERENCE_TWO_NAME,
  APP_COLOR,
  DO_NOT_ENTER_SAME_EMAIL,
  ENTER_VALID_EMAIL,
  LABEL_COLOR,
} from '../../../constants';
import { validateEmail } from '../../../helpers/Validators';

// eslint-disable-next-line no-shadow
const ReferenceName = ({ navigation, referenceOneEmail, email, status, emailReducer }) => {
  const { navigate, goBack } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading>
          REFERENCE <Text style={{ color: APP_COLOR }}>ONE</Text>
        </Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>EMAIL ADDRESS</SubHeading>
      </View>
      <View key="content" style={{ paddingTop: 30, flexDirection: 'row' }}>
        <Input
          editable={status === 'awaiting' || status === null}
          autoFocus={Platform.OS === 'android'}
          placeholder="REFEREE EMAIL"
          onChangeText={text => referenceOneEmail(text)}
          value={email}
        />
        {status && status !== 'awaiting' ? (
          <View style={{ borderBottomColor: LABEL_COLOR, borderBottomWidth: 0.5 }}>
            <Icon
              type="font-awesome"
              name="check"
              size={30}
              iconStyle={{ color: 'green', paddingTop: 20 }}
            />
          </View>
        ) : null}
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => goBack(null)}
          rightBtnNavigation={
            email
              ? () => {
                if (validateEmail(email)) {
                  if (emailReducer.email === email) {
                    Toast.show(DO_NOT_ENTER_SAME_EMAIL);
                  }
                  if (emailReducer.email !== email) {
                    navigate(REFERENCE_TWO_NAME);
                  }
                } else {
                  Toast.show(ENTER_VALID_EMAIL);
                }
              }
              : null
          }
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ referenceReducer, emailReducer }) => {
  const { references } = referenceReducer;
  const { email, status } = references[0];
  return { email, emailReducer, status };
};

export default connect(
  mapStateToProps,
  { referenceOneEmail }
)(ReferenceName);
