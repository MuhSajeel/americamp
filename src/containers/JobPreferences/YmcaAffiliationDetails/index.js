import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Screen, Heading, FooterWithButtons, Spinner } from '../../../components/common';
import { inputChanged, infoSubmited } from '../../../redux/actions';
import { setItem } from '../../../helpers/Localstorage';
import { QuestionWithBox } from '../../../components/JobPreferences';
import { YMCA_CAMP_DETAILS_CHANGED } from '../../../constants';

class YmcaAffiliationDetails extends Component {
  onSubmit() {
    const { jobPreferences, fetchedUserProfile } = this.props;
    const data = fetchedUserProfile;
    data.job_preference = jobPreferences;
    setItem('@userProfile', JSON.stringify(data));
    return this.props.infoSubmited(data);
  }

  render() {
    const { navigation, ymcaCampDetail, loading } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>YMCA AFFILIATION</Heading>
        </View>
        <View key="content">
          <QuestionWithBox
            question="Please tell us about your relationship with the YMCA in your home country:"
            onChangeText={val => this.props.inputChanged(val, YMCA_CAMP_DETAILS_CHANGED)}
            answer={ymcaCampDetail}
          />
        </View>
        <View key="footer">
          {loading ? (
            <View style={{ alignItems: 'flex-end' }}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigation.goBack()}
              rightBtnNavigation={ymcaCampDetail ? () => this.onSubmit() : null}
              btnTxt={{
                leftBtnTxt: 'PREVIOUS',
                rightBtnTxt: 'FINISH',
              }}
            />
          )}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ jobPreferences, fetchedUserProfile, submitInfoReducer }) => {
  return {
    ymcaCampDetail: jobPreferences.ymca_camp_detail,
    loading: submitInfoReducer.loading,
    jobPreferences,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(YmcaAffiliationDetails);
