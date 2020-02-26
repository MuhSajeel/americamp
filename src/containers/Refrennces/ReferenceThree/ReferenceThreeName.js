/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { referenceThreeName } from '../../../redux/actions';
import { Screen, FooterWithButtons, Heading, Input, SubHeading } from '../../../components/common';
import { APP_COLOR, REFERENCE_THREE_EMAIL, REFERENCE_TWO_NUMBER } from '../../../constants';

// eslint-disable-next-line no-shadow
const ReferenceName = ({ navigation, referenceThreeName, name }) => {
  const { navigate } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading>
          REFERENCE <Text style={{ color: APP_COLOR }}>THREE</Text>
        </Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>NAME</SubHeading>
      </View>
      <View key="content" style={{ paddingTop: 30 }}>
        <Input
          autoFocus
          placeholder="NAME OF REFEREE"
          onChangeText={text => referenceThreeName(text)}
          value={name}
        />
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(REFERENCE_TWO_NUMBER)}
          rightBtnNavigation={name ? () => navigate(REFERENCE_THREE_EMAIL) : null}
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ referenceReducer }) => {
  const { references } = referenceReducer;
  const { name } = references[2];
  return { name };
};

export default connect(
  mapStateToProps,
  { referenceThreeName }
)(ReferenceName);
