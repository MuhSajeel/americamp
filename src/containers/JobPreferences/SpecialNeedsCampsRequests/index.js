import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import {
  Screen2,
  Heading,
  FooterWithButtons,
  SubHeading,
  DropDown,
  YesNoSelection,
} from '../../../components/common';
import { inputChanged } from '../../../redux/actions';
import {
  RELIGIOUS_FAITH_BASED_CAMPS,
  VOLUNTERING_WITH_CHANGED,
  WILLING_TO_WORK_AT_CAMP_CHANGED,
  AGE_GROUP_WILLING_TO_WORK_CHANGED,
  WHY_SPECIAL_NEED_CHANGED,
  EXP_VOLUNTERING_WITH_CHANGED,
  PROVIDE_PERSONAL_CARE_CHANGED,
} from '../../../constants';
// import { setItem } from '../../../helpers/Localstorage';
import { QuestionWithBox } from '../../../components/JobPreferences';

class SpecialNeedsCampsRequests extends Component {
  // onnavigate() {
  //   const { fetchedUserProfile, jobPreferences } = props;
  //   const data = fetchedUserProfile;
  //   data.job_preference = jobPreferences;
  //   setItem('@userProfile', JSON.stringify(data));
  // }
  componentDidMount() {
    const { providePersonalCare } = this.props;
    if (providePersonalCare === null) {
      this.props.inputChanged(true, PROVIDE_PERSONAL_CARE_CHANGED);
    }
  }

  render() {
    const {
      navigation,
      whySpecialNeedCamp,
      volunteringWith,
      expVolunteringWith,
      wilingToWorkAtCamp,
      ageGroupWillingToWork,
      providePersonalCare,
    } = this.props;
    const options = [
      {
        key: 1,
        label: 'Emotional disability',
      },
      {
        key: 2,
        label: 'Cognitive disability',
      },
      {
        key: 3,
        label: 'Physical disability',
      },
      {
        key: 4,
        label: 'Health concerns',
      },
      {
        key: 5,
        label: 'No experience',
      },
    ];
    const options2 = [
      {
        key: 1,
        label: 'Emotional disability',
      },
      {
        key: 2,
        label: 'Cognitive disability',
      },
      {
        key: 3,
        label: 'Physical disability',
      },
      {
        key: 4,
        label: 'Health concerns',
      },
    ];
    const options3 = [
      {
        key: 1,
        label: 'Children',
      },
      {
        key: 2,
        label: 'Teenagers',
      },
      {
        key: 3,
        label: 'Adults',
      },
      {
        key: 4,
        label: 'Elderly Adults',
      },
    ];
    return (
      <Screen2>
        <View key="content">
          <Heading>special needs camps REQUESTS</Heading>
          <SubHeading extraStyling={{ fontSize: 24, marginBottom: 20 }}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't worry if you have no Experience in this - just answer IF you can!
          </SubHeading>
          <QuestionWithBox
            question="Why are you interested in working at a camp serves campers with special needs?"
            onChangeText={val => this.props.inputChanged(val, WHY_SPECIAL_NEED_CHANGED)}
            answer={whySpecialNeedCamp}
          />
          <Text style={styles.text}>
            Please select which special needs populations you have experience working or
            volunteering with:
          </Text>
          <View style={{ marginTop: 5, marginBottom: 20 }}>
            <DropDown
              selectedValue={volunteringWith}
              onValueChange={({ key }) => this.props.inputChanged(key, VOLUNTERING_WITH_CHANGED)}
              options={options}
              highlight={!!volunteringWith}
            />
          </View>
          <QuestionWithBox
            question="If you have experience, please describe (be specific with regards to age, special needs, your resposibility etc):"
            onChangeText={val => this.props.inputChanged(val, EXP_VOLUNTERING_WITH_CHANGED)}
            answer={expVolunteringWith}
          />
          <Text style={styles.text}>
            Please select which special needs populations you are willing to work with at camp this
            summer:
          </Text>
          <View style={{ marginTop: 5, marginBottom: 20 }}>
            <DropDown
              selectedValue={wilingToWorkAtCamp}
              onValueChange={({ key }) =>
                this.props.inputChanged(key, WILLING_TO_WORK_AT_CAMP_CHANGED)
              }
              options={options2}
              highlight={!!wilingToWorkAtCamp}
            />
          </View>
          <Text style={styles.text}>
            Please select which special needs age groups you are willing to work with at camp this
            summer?
          </Text>
          <View style={{ marginTop: 5, marginBottom: 20 }}>
            <DropDown
              selectedValue={ageGroupWillingToWork}
              onValueChange={({ key }) =>
                this.props.inputChanged(key, AGE_GROUP_WILLING_TO_WORK_CHANGED)
              }
              options={options3}
              highlight={!!ageGroupWillingToWork}
            />
          </View>
          <Text style={styles.text}>
            Are you willing to provide personal care to campers (helping with lifting them,
            showering, toileting, dressing etc)?
          </Text>
          <View style={{ marginTop: 5, marginBottom: 20 }}>
            <YesNoSelection
              onPress={val => this.props.inputChanged(val, PROVIDE_PERSONAL_CARE_CHANGED)}
              selected={providePersonalCare}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.goBack()}
            rightBtnNavigation={
              whySpecialNeedCamp &&
              volunteringWith &&
              (!!(volunteringWith === 5 && !expVolunteringWith) || expVolunteringWith) &&
              wilingToWorkAtCamp &&
              ageGroupWillingToWork
                ? () => navigation.navigate(RELIGIOUS_FAITH_BASED_CAMPS)
                : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen2>
    );
  }
}

const mapStateToProps = ({ jobPreferences, fetchedUserProfile }) => {
  return {
    whySpecialNeedCamp: jobPreferences.why_special_need_camp,
    volunteringWith: jobPreferences.exp_special_needs,
    expVolunteringWith: jobPreferences.exp_special_need_camp,
    wilingToWorkAtCamp: jobPreferences.select_special_needs,
    ageGroupWillingToWork: jobPreferences.age_group,
    providePersonalCare: jobPreferences.provide_personal_care,
    jobPreferences,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(SpecialNeedsCampsRequests);
