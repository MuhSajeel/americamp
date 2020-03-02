/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { inputChanged, infoSubmited } from '../../../redux/actions';
import {
  Screen2,
  TextAreaInput,
  Heading,
  FooterWithButtons,
  Spinner,
} from '../../../components/common';
import {
  APP_COLOR,
  VISA_DENIAL_DETAILS_ACTION,
  VISA_INFORMATION_VISA_DENIAL,
} from '../../../constants';
import text from './text.json';

const USVisaDenialDetails = ({
  navigation,
  visaInformationReducer,
  fetchedUserProfile,
  inputChanged,
  infoSubmited,
  loading,
}) => {
  const { para } = text[0];
  const { navigate } = navigation;
  const { visa_denial_detail } = visaInformationReducer;
  return (
    <Screen2>
      <View key="header" />
      <View key="content">
        <Heading>
          IF <Text style={{ color: APP_COLOR }}>YES</Text>, PLEASE TELL US MORE ABOUT YOUR VISA
          DENIALS
        </Heading>
        <TextAreaInput
          additionalTxtStyle={{
            flex: 1,
          }}
          placeholder={`${para} \n Minimum 250 Characters`}
          onChangeText={textData => inputChanged(textData, VISA_DENIAL_DETAILS_ACTION)}
          value={visa_denial_detail}
          maxLength={250}
          numberOfLines={11}
        />
      </View>
      <View key="footer">
        {loading ? (
          <View style={{ alignItems: 'flex-end' }}>
            <Spinner />
          </View>
        ) : (
          <FooterWithButtons
            leftBtnNavigation={() => navigate(VISA_INFORMATION_VISA_DENIAL)}
            rightBtnNavigation={
              visa_denial_detail
                ? () => {
                    const data = fetchedUserProfile;
                    data.visa_informations = visaInformationReducer;
                    infoSubmited(data);
                  }
                : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
          />
        )}
      </View>
    </Screen2>
  );
};

const mapStateToProps = ({
  visaInformationReducer,
  fetchedUserProfile,
  submitInfoReducer: { loading },
}) => {
  return { visaInformationReducer, fetchedUserProfile, loading };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(USVisaDenialDetails);
