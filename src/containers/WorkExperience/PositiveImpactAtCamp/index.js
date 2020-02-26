/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Screen, Heading, TextAreaInput, FooterWithButtons } from '../../../components/common';
import { WHY_DO_YOU_WISH_TO_WORK_AT_CAMP, WHY_SHOULD_WE_HIRE_YOU } from '../../../constants';
import { positiveImpactAtCamp } from '../../../redux/actions';

const PositiveImpactAtCamp = ({ navigation, positiveImpactAtCamp, positive_impact_at_camp }) => {
  const { navigate } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading extraStyling={{ fontSize: 40, lineHeight: 40 }}>
          HOW DO YOU THINK YOU CAN HAVE A POSITIVE IMPACT AT CAMP?
        </Heading>
      </View>
      <View key="content">
        <TextAreaInput
          additionalTxtStyle={{
            flex: 1,
          }}
          placeholder={`What skills and talents can you bring to camp? \n250 min character count`}
          onChangeText={textData => positiveImpactAtCamp(textData)}
          value={positive_impact_at_camp}
          maxLength={250}
          numberOfLines={11}
        />
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(WHY_DO_YOU_WISH_TO_WORK_AT_CAMP)}
          rightBtnNavigation={() => navigate(WHY_SHOULD_WE_HIRE_YOU)}
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'PROCEED' }}
        />
      </View>
    </Screen>
  );
};
const mapStateToProps = ({ workExperienceReducer }) => {
  const { positive_impact_at_camp } = workExperienceReducer;
  return { positive_impact_at_camp };
};
export default connect(
  mapStateToProps,
  { positiveImpactAtCamp }
)(PositiveImpactAtCamp);
