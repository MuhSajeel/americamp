/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { previousWorkExperience } from '../../../redux/actions';
import { TextAreaInput, Heading, FooterWithButtons, Screen2 } from '../../../components/common';
import { WORKED_BEFORE, EMPLOYMENT_AND_VOLUNTEER_HISTORY } from '../../../constants';
import text from './text.json';
import styles from './styles';

const PreviousWorkExperienceAtUSA = ({ navigation, previousWorkExperience, prev_work_exp }) => {
  const { para } = text[0];
  const { navigate } = navigation;
  const { textPara } = styles;
  return (
    <Screen2>
      <View key="header">
        <Heading>Previous Work Experience</Heading>
      </View>
      <View key="content">
        <Text style={textPara}>{para}</Text>
        <TextAreaInput
          additionalTxtStyle={{
            flex: 1,
          }}
          placeholder="Minimum 250 Characters"
          onChangeText={textData => previousWorkExperience(textData)}
          value={prev_work_exp}
          maxLength={250}
          numberOfLines={11}
        />
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(WORKED_BEFORE)}
          rightBtnNavigation={() => navigate(EMPLOYMENT_AND_VOLUNTEER_HISTORY)}
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'PROCEED' }}
        />
      </View>
    </Screen2>
  );
};

const mapStateToProps = ({ workExperienceReducer }) => {
  const { prev_work_exp } = workExperienceReducer;
  return { prev_work_exp };
};

export default connect(
  mapStateToProps,
  { previousWorkExperience }
)(PreviousWorkExperienceAtUSA);
