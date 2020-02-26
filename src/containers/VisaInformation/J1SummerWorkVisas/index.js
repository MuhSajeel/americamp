/* eslint-disable camelcase */
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { inputChanged } from '../../../redux/actions';
import { Screen, FooterWithButtons, Heading, Input, SubHeading } from '../../../components/common';
import {
  APP_COLOR,
  VISA_INFORMATION_J1_CAMP_COUNSELOR_VISAS,
  VISA_INFORMATION_VISA_TYPES,
  J1_SUMMER_WORK_VISAS_ACTION,
  VISA_TYPES_ACTION,
} from '../../../constants';

const visaInfoInit = {
  visa_type: null,
  sponsor_name: '',
  year_of_participation: '',
};

// eslint-disable-next-line no-shadow
const J1SummerWorkVisas = ({ navigation, j1_summer_work_visas, inputChanged }) => {
  const { navigate } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading>VISA APPLICATION</Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>
          HOW MANY <Text style={{ color: APP_COLOR }}>J-1 SUMMER WORK AND TRAVEL VISAS</Text>{' '}
          (INCLUDES CAMP SUPPORT STAFF) HAVE YOU HAD?
        </SubHeading>
      </View>
      <View key="content" style={{ paddingTop: 30 }}>
        <Input
          autoFocus={Platform.OS === 'android'}
          number
          maxLength={3}
          onChangeText={text => {
            inputChanged(text, J1_SUMMER_WORK_VISAS_ACTION);
            return inputChanged([visaInfoInit], VISA_TYPES_ACTION);
          }}
          value={`${j1_summer_work_visas || ''}`}
        />
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(VISA_INFORMATION_J1_CAMP_COUNSELOR_VISAS)}
          rightBtnNavigation={
            j1_summer_work_visas ? () => navigate(VISA_INFORMATION_VISA_TYPES) : null
          }
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ visaInformationReducer: { j1_summer_work_visas } }) => {
  return { j1_summer_work_visas };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(J1SummerWorkVisas);
