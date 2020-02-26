/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { whyWorkAtCamp } from '../../../redux/actions';
import { Screen, Heading, TextAreaInput, FooterWithButtons } from '../../../components/common';
import { EMPLOYMENT_AND_VOLUNTEER_HISTORY, POSITIVE_IMPACT_AT_CAMP } from '../../../constants';

const WhyWorkAtCamp = ({ navigation, whyWorkAtCamp, why_work_at_camp }) => {
  const { navigate } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading>WHY DO YOU WISH TO WORK AT CAMP?</Heading>
      </View>
      <View key="content">
        <TextAreaInput
          additionalTxtStyle={{
            flex: 1,
          }}
          placeholder={`What it is the reason or reasons for you wanting to work at camp?\n250 min character count`}
          onChangeText={textData => whyWorkAtCamp(textData)}
          value={why_work_at_camp}
          maxLength={250}
          numberOfLines={11}
        />
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(EMPLOYMENT_AND_VOLUNTEER_HISTORY)}
          rightBtnNavigation={() => navigate(POSITIVE_IMPACT_AT_CAMP)}
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'PROCEED' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ workExperienceReducer }) => {
  const { why_work_at_camp } = workExperienceReducer;
  return {
    why_work_at_camp,
  };
};
export default connect(
  mapStateToProps,
  { whyWorkAtCamp }
)(WhyWorkAtCamp);
