/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { inputChanged } from '../../../redux/actions';

import { Screen, Heading, FooterWithButtons, TextAreaInput } from '../../../components/common';
import { PERSONAL_STATEMENT, CONTRIBUTE_TO_CAMP, ABOUT_YOURSELF_CHANGED } from '../../../constants';

const PersonalBackground = props => {
  const { navigation, about_yourself } = props;
  return (
    <Screen>
      {/* Screen Content */}
      <View key="header">
        <Heading>PERSONAL STATEMENT</Heading>
      </View>
      <View key="content">
        <TextAreaInput
          placeholder="Please tell us about your family and educational background, your interests and spare time activities, your future plans and anything else you think will be helpful to your application"
          multiline
          onChangeText={textData => props.inputChanged(textData, ABOUT_YOURSELF_CHANGED)}
          value={about_yourself}
          numberOfLines={16}
          maxLength={1000}
          minLength={250}
        />
      </View>

      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigation.navigate(PERSONAL_STATEMENT)}
          rightBtnNavigation={about_yourself ? () => navigation.navigate(CONTRIBUTE_TO_CAMP) : null}
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
        />
      </View>
      {/* Content end */}
    </Screen>
  );
};
const mapStateToProps = ({ PersonalStatement: { about_yourself } }) => {
  return {
    about_yourself,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(PersonalBackground);
