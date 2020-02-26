/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { referenceTwoEmail, infoSubmited } from '../../../redux/actions';
import {
  Screen,
  FooterWithButtons,
  Heading,
  Input,
  SubHeading,
  Spinner,
} from '../../../components/common';
import {
  APP_COLOR,
  ENTER_VALID_EMAIL,
  DO_NOT_ENTER_SAME_EMAIL,
  DO_NOT_ENTER_PREVIOUS_EMAIL,
  LABEL_COLOR,
} from '../../../constants';
import { validateEmail } from '../../../helpers/Validators';

// eslint-disable-next-line no-shadow
const ReferenceName = ({
  navigation,
  referenceTwoEmail,
  email,
  fetchedUserProfile,
  references,
  loading,
  infoSubmited,
  emailReducer,
  emailOne,
  status,
}) => {
  const { navigate, goBack } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading>
          REFERENCE <Text style={{ color: APP_COLOR }}>TWO</Text>
        </Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>EMAIL ADDRESS</SubHeading>
      </View>
      <View key="content" style={{ paddingTop: 30, flexDirection: 'row' }}>
        <Input
          editable={status === 'awaiting' || status === null}
          autoFocus={Platform.OS === 'android'}
          placeholder="REFEREE EMAIL"
          onChangeText={text => referenceTwoEmail(text)}
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
        {loading ? (
          <View style={{ alignItems: 'flex-end' }}>
            <Spinner />
          </View>
        ) : (
            <FooterWithButtons
              leftBtnNavigation={() => goBack(null)}
              rightBtnNavigation={
                email
                  ? () => {
                    if (validateEmail(email)) {
                      if (emailReducer.email === email) {
                        Toast.show(DO_NOT_ENTER_SAME_EMAIL);
                      }
                      if (emailOne === email) {
                        Toast.show(DO_NOT_ENTER_PREVIOUS_EMAIL);
                      }
                      if (emailReducer.email !== email && emailOne !== email) {
                        const data = fetchedUserProfile;
                        data.documents.references = references;
                        infoSubmited(data);
                      }
                    } else {
                      Toast.show(ENTER_VALID_EMAIL);
                    }
                  }
                  : null
              }
              btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
            />
          )}
      </View>
    </Screen>
  );
};

const mapStateToProps = ({
  referenceReducer,
  submitInfoReducer,
  fetchedUserProfile,
  emailReducer,
}) => {
  const { references } = referenceReducer;
  const { loading } = submitInfoReducer;
  const { email, status } = references[1];
  const { email: emailOne } = references[0];
  return {
    email,
    status,
    loading: loading || false,
    fetchedUserProfile,
    references,
    emailReducer,
    emailOne,
  };
};

export default connect(
  mapStateToProps,
  { referenceTwoEmail, infoSubmited }
)(ReferenceName);
