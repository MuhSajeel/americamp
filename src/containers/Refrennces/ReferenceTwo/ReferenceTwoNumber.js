/* eslint-disable camelcase */
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { referenceTwoNumber } from '../../../redux/actions';
import { Screen, FooterWithButtons, Heading, Input, SubHeading } from '../../../components/common';
import { REFERENCE_TWO_EMAIL, REFERENCE_THREE_NAME, APP_COLOR } from '../../../constants';

// eslint-disable-next-line no-shadow
const ReferenceName = ({ navigation, referenceTwoNumber, contact_number }) => {
  const { navigate } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading>
          REFERENCE <Text style={{ color: APP_COLOR }}>TWO</Text>
        </Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>CONTACT NUMBER</SubHeading>
      </View>
      <View key="content" style={{ paddingTop: 30 }}>
        <Input
          autoFocus={Platform.OS === 'android'}
          number
          maxLength={13}
          placeholder="CONTACT NUMBER"
          onChangeText={number => referenceTwoNumber(number)}
          value={contact_number}
        />
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(REFERENCE_TWO_EMAIL)}
          rightBtnNavigation={contact_number ? () => navigate(REFERENCE_THREE_NAME) : null}
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ referenceReducer }) => {
  const { references } = referenceReducer;
  const { contact_number } = references[1];
  return { contact_number };
};

export default connect(
  mapStateToProps,
  { referenceTwoNumber }
)(ReferenceName);
