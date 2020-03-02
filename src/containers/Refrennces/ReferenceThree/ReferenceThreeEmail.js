/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { referenceThreeEmail } from '../../../redux/actions';
import { Screen, FooterWithButtons, Heading, Input, SubHeading } from '../../../components/common';
import { REFERENCE_THREE_NAME, REFERENCE_THREE_NUMBER, APP_COLOR } from '../../../constants';

// eslint-disable-next-line no-shadow
const ReferenceName = ({ navigation, referenceThreeEmail, email }) => {
  const { navigate } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading>
          REFERENCE <Text style={{ color: APP_COLOR }}>THREE</Text>
        </Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>EMAIL ADDRESS</SubHeading>
      </View>
      <View key="content" style={{ paddingTop: 30 }}>
        <Input
          autoFocus
          placeholder="REFEREE EMAIL"
          onChangeText={text => referenceThreeEmail(text)}
          value={email}
        />
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(REFERENCE_THREE_NAME)}
          rightBtnNavigation={email ? () => navigate(REFERENCE_THREE_NUMBER) : null}
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ referenceReducer }) => {
  const { references } = referenceReducer;
  const { email } = references[2];
  return { email };
};

export default connect(
  mapStateToProps,
  { referenceThreeEmail }
)(ReferenceName);
