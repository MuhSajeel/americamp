/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { inputChanged } from '../../../redux/actions';
import {
  Screen,
  FooterWithButtons,
  Heading,
  SubHeading,
  DropDown,
} from '../../../components/common';
import {
  APP_COLOR,
  VISA_INFORMATION_COUNTRY_OF_RESIDENCE,
  J1_CAMP_COUNSELOR_VISAS_ACTION,
  VISA_INFORMATION_VISA_DENIAL,
  VISA_INFORMATION_VISA_TYPES,
  CAMP_COUNSELOR_ROLE,
  VISA_TYPES_ACTION,
} from '../../../constants';

const visaInfoInit = {
  visa_type: null,
  sponsor_name: '',
  year_of_participation: '',
};

// eslint-disable-next-line no-shadow
const J1CampCounselorVisas = ({ navigation, inputChanged, number_of_j1_visas, role }) => {
  const { navigate } = navigation;
  const options = [
    {
      key: '0',
      label: '0',
    },
    {
      key: '1',
      label: '1',
    },
    {
      key: '2',
      label: '2',
    },
    {
      key: '3',
      label: '3',
    },
    {
      key: '4',
      label: '4',
    },
    {
      key: '5',
      label: '5',
    },
    {
      key: '6',
      label: '6',
    },
    {
      key: '7',
      label: '7',
    },
    {
      key: '8',
      label: '8',
    },
    {
      key: '9',
      label: '9',
    },
    {
      key: '10',
      label: '10',
    },
  ];
  return (
    <Screen>
      <View key="header">
        <Heading>VISA APPLICATION</Heading>
        {role === CAMP_COUNSELOR_ROLE ? (
          <SubHeading extraStyling={{ fontSize: 25 }}>
            HOW MANY <Text style={{ color: APP_COLOR }}>J-1 CAMP COUNSELOR VISAS</Text> HAVE YOU
            HAD?
          </SubHeading>
        ) : (
          <SubHeading extraStyling={{ fontSize: 25 }}>
            HOW MANY <Text style={{ color: APP_COLOR }}>J-1 SUMMER WORK AND TRAVEL VISAS</Text>{' '}
            (INCLUDES CAMP SUPPORT STAFF) HAVE YOU HAD?
          </SubHeading>
        )}
      </View>
      <View key="content" style={{ paddingTop: 30 }}>
        <DropDown
          selectedValue={`${number_of_j1_visas}`}
          onValueChange={({ key }) => {
            inputChanged(key, J1_CAMP_COUNSELOR_VISAS_ACTION);
            return inputChanged([visaInfoInit], VISA_TYPES_ACTION);
          }}
          options={options}
        />
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(VISA_INFORMATION_COUNTRY_OF_RESIDENCE)}
          rightBtnNavigation={
            number_of_j1_visas === null
              ? null
              : () =>
                  navigate(
                    number_of_j1_visas === '0' || number_of_j1_visas === 0
                      ? VISA_INFORMATION_VISA_DENIAL
                      : VISA_INFORMATION_VISA_TYPES
                  )
          }
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
        />
        {/* )} */}
      </View>
    </Screen>
  );
};

const mapStateToProps = ({
  visaInformationReducer: { number_of_j1_visas },
  stageZeroReducer: {
    apply_now: { role },
  },
}) => {
  return { number_of_j1_visas, role };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(J1CampCounselorVisas);
