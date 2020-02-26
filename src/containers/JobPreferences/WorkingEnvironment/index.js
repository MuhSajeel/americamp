import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Screen, Heading, FooterWithButtons, SubHeading } from '../../../components/common';
import * as CONSTANTS from '../../../constants';
import { QuestionsSection } from '../../../components/JobPreferences';
import { inputChanged } from '../../../redux/actions';
// import { setItem } from '../../../helpers/Localstorage';

class WorkingEnvironment extends Component {
  // componentDidUpdate() {
  //   const { fetchedUserProfile, jobPreferences } = this.props;
  //   const data = fetchedUserProfile;
  //   data.job_preference = jobPreferences;
  //   setItem('@userProfile', JSON.stringify(data));
  // }

  onInputChange(text, type) {
    this.props.inputChanged(text, type);
  }

  validate() {
    const { jobPreferences } = this.props;
    const list = [
      'at_traditional_day_camp',
      'at_residential_camp',
      'with_female_campers',
      'with_male_campers',
      'with_family_groups',
      'with_children',
      'with_no_running_water',
      'with_no_electricity',
      'camp_with_platform_tent',
    ];
    return !(list.find(val => jobPreferences[val] === null) || false);
  }

  render() {
    const { navigation, jobPreferences } = this.props;
    console.log(jobPreferences);
    return (
      <Screen>
        <View key="header">
          <Heading>Your Working Environment</Heading>
          <SubHeading>ARE YOU COMFORTABLE WITH THE FOLLOWING ROLES?</SubHeading>
        </View>
        <View key="content">
          <QuestionsSection
            question="At a traditional day camp?"
            onPress={val => this.onInputChange(val, CONSTANTS.TRADITIONAL_DAY_CAMP_CHANGED)}
            selected={jobPreferences.at_traditional_day_camp}
          />
          <QuestionsSection
            question="At a residential camp?"
            onPress={val => this.onInputChange(val, CONSTANTS.RESIDENTIAL_CAMP_CHANGED)}
            selected={jobPreferences.at_residential_camp}
          />
          <QuestionsSection
            question="With female campers?"
            onPress={val => this.onInputChange(val, CONSTANTS.FEMALE_CAMPERS_CHANGED)}
            selected={jobPreferences.with_female_campers}
          />
          <QuestionsSection
            question="With male campers?"
            onPress={val => this.onInputChange(val, CONSTANTS.MALE_CAMPERS_CHANGED)}
            selected={jobPreferences.with_male_campers}
          />
          <QuestionsSection
            question="With family groups?"
            onPress={val => this.onInputChange(val, CONSTANTS.FAMILY_GROUPS_CHANGED)}
            selected={jobPreferences.with_family_groups}
          />
          <QuestionsSection
            question="With children from an underprivileged background?"
            onPress={val => this.onInputChange(val, CONSTANTS.CHILDREN_CHANGED)}
            selected={jobPreferences.with_children}
          />
          <QuestionsSection
            question="At a camp with no running water?"
            onPress={val => this.onInputChange(val, CONSTANTS.NO_RUNNING_WATER_CHANGED)}
            selected={jobPreferences.with_no_running_water}
          />
          <QuestionsSection
            question="At a camp with no electricity?"
            onPress={val => this.onInputChange(val, CONSTANTS.NO_ELECTRICITY_CHANGED)}
            selected={jobPreferences.with_no_electricity}
          />
          <QuestionsSection
            question="At a camp where you live in a platform tent?"
            onPress={val => this.onInputChange(val, CONSTANTS.PLATFORM_TENT_CHANGED)}
            selected={jobPreferences.camp_with_platform_tent}
          />
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.goBack()}
            rightBtnNavigation={
              this.validate() ? () => navigation.navigate(CONSTANTS.SPECIAL_NEEDS_CAMPS) : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ jobPreferences, fetchedUserProfile }) => {
  return {
    jobPreferences,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(WorkingEnvironment);
