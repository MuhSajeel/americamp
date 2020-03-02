import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import {
  Screen2,
  Heading,
  FooterWithButtons,
  DropDown,
  YesNoSelection,
} from '../../../components/common';
import { inputChanged, infoSubmited } from '../../../redux/actions';
import {
  FAITH_BASED_CAMP_TYPE_CHANGED,
  YMCA_AFFILIATION,
  RELIGIOUS_CAMPS_DETAILS_CHANGED,
  COMFORTABLE_WITH_OTHERS_CHANGED,
} from '../../../constants';
// import { setItem } from '../../../helpers/Localstorage';
import { QuestionWithBox } from '../../../components/JobPreferences';

class ReligiousFaithBasedCampsRequests extends Component {
  // onNavigate() {
  //   const { fetchedUserProfile, jobPreferences } = this.props;
  //   const data = fetchedUserProfile;
  //   data.job_preference = jobPreferences;
  //   setItem('@userProfile', JSON.stringify(data));
  // }

  componentDidMount() {
    const { comfortablewithOthers } = this.props;
    if (comfortablewithOthers === null) {
      this.props.inputChanged('yes', COMFORTABLE_WITH_OTHERS_CHANGED);
    }
  }

  render() {
    const {
      navigation,
      faithBasedCampType,
      religiousCampDetails,
      comfortablewithOthers,
    } = this.props;
    const options = [
      {
        key: 1,
        label: 'Christian',
      },
      {
        key: 2,
        label: 'Jewish',
      },
      {
        key: 3,
        label: 'Muslim',
      },
      {
        key: 4,
        label: 'Hindu',
      },
    ];
    return (
      <Screen2>
        <View key="content">
          <Heading>Religious OR Faith Based Camps</Heading>
          <Text style={styles.text}>
            Please indicate in which type of faith based camp you are interested in working with?
          </Text>
          <View style={{ marginTop: 5, marginBottom: 20 }}>
            <DropDown
              selectedValue={faithBasedCampType}
              onValueChange={({ key }) =>
                this.props.inputChanged(key, FAITH_BASED_CAMP_TYPE_CHANGED)
              }
              options={options}
              highlight={!!faithBasedCampType}
            />
          </View>
          <QuestionWithBox
            question="Why are you interested in working at a camp with a faith-based program?"
            onChangeText={val => this.props.inputChanged(val, RELIGIOUS_CAMPS_DETAILS_CHANGED)}
            answer={religiousCampDetails}
          />
          <Text style={styles.text}>
            Would you be comfortable working around people whose faith is different than your own
            (this may involve being in contact with food that you would not normally be around, such
            as pork?)
          </Text>
          <View style={{ marginTop: 5, marginBottom: 20 }}>
            <YesNoSelection
              onPress={val =>
                this.props.inputChanged(val ? 'yes' : 'no', COMFORTABLE_WITH_OTHERS_CHANGED)
              }
              selected={comfortablewithOthers === 'yes'}
            />
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.goBack()}
            rightBtnNavigation={
              faithBasedCampType && religiousCampDetails
                ? () => navigation.navigate(YMCA_AFFILIATION)
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
    faithBasedCampType: jobPreferences.religious_camp,
    religiousCampDetails: jobPreferences.religious_camp_details,
    comfortablewithOthers: jobPreferences.comfortable_with_others,
    jobPreferences,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(ReligiousFaithBasedCampsRequests);
