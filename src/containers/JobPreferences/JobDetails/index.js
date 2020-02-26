/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Screen2, FooterWithButtons } from '../../../components/common';
import { QuestionWithBox } from '../../../components/JobPreferences';
import { inputChanged } from '../../../redux/actions';
// import { setItem } from '../../../helpers/Localstorage';
import {
  WORKING_ENVIRONMENT,
  WORK_AT_CAMP_CHANGED,
  POSITIVE_IMPACT_AT_CAMP_CHANGED,
  WHY_HIRE_YOU_CHANGED,
} from '../../../constants';

class JobDetails extends Component {
  // onNavigate() {
  //   const { fetchedUserProfile, jobPreferences } = this.props;
  //   const data = fetchedUserProfile;
  //   data.job_preference = jobPreferences;
  //   setItem('@userProfile', JSON.stringify(data));
  // }

  onInputChange(text, type) {
    this.props.inputChanged(text, type);
  }

  render() {
    const { navigation, work_at_camp, positive_impact_at_camp, why_hire_you } = this.props;
    return (
      <Screen2>
        <View key="content">
          <QuestionWithBox
            question="WHY DO YOU WISH TO WORK AT CAMP?"
            onChangeText={val => this.onInputChange(val, WORK_AT_CAMP_CHANGED)}
            answer={work_at_camp}
            bold
          />
          <QuestionWithBox
            question="HOW DO YOU THINK YOU CAN HAVE A
POSITIVE IMPACT AT CAMP?"
            onChangeText={val => this.onInputChange(val, POSITIVE_IMPACT_AT_CAMP_CHANGED)}
            answer={positive_impact_at_camp}
            bold
          />
          <QuestionWithBox
            question="WHY SHOULD CAMP HIRE YOU:"
            onChangeText={val => this.onInputChange(val, WHY_HIRE_YOU_CHANGED)}
            answer={why_hire_you}
            bold
          />
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.goBack()}
            rightBtnNavigation={
              work_at_camp && positive_impact_at_camp && why_hire_you
                ? () => navigation.navigate(WORKING_ENVIRONMENT)
                : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen2>
    );
  }
}

const mapStateToProps = ({
  jobPreferences: { work_at_camp, positive_impact_at_camp, why_hire_you },
}) => {
  return {
    work_at_camp,
    positive_impact_at_camp,
    why_hire_you,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(JobDetails);
