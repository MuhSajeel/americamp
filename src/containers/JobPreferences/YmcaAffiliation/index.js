import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import {
  Screen,
  Heading,
  FooterWithButtons,
  PickerOptions,
  Spinner,
} from '../../../components/common';
import { inputChanged, infoSubmited } from '../../../redux/actions';
import { AFFILIATED_WITH_YMCA_CHANGED, YMCA_AFFILIATION_DETAILS } from '../../../constants';
import { setItem } from '../../../helpers/Localstorage';

class YmcaAffiliation extends Component {
  componentDidMount() {
    const { affiliatedWithYmca } = this.props;
    if (!affiliatedWithYmca) {
      this.props.inputChanged(false, AFFILIATED_WITH_YMCA_CHANGED);
    }
  }

  onSubmit() {
    const { jobPreferences, fetchedUserProfile } = this.props;
    const data = fetchedUserProfile;
    data.job_preference = jobPreferences;
    setItem('@userProfile', JSON.stringify(data));
    return this.props.infoSubmited(data);
  }

  render() {
    const { navigation, affiliatedWithYmca, loading } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>YMCA AFFILIATION</Heading>
        </View>
        <View key="content">
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Are you affiliated or belong to a YMCA organization in your country?
            </Text>
          </View>
          <PickerOptions
            label="YES"
            onPress={() => this.props.inputChanged(true, AFFILIATED_WITH_YMCA_CHANGED)}
            highlight={affiliatedWithYmca === true}
          />
          <PickerOptions
            label="NO"
            onPress={() => this.props.inputChanged(false, AFFILIATED_WITH_YMCA_CHANGED)}
            highlight={!affiliatedWithYmca}
          />
        </View>
        <View key="footer">
          {loading ? (
            <View style={styles.spinnerContainer}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigation.goBack()}
              rightBtnNavigation={() => {
                if (!affiliatedWithYmca) {
                  this.props.inputChanged(false, AFFILIATED_WITH_YMCA_CHANGED);
                }

                return affiliatedWithYmca
                  ? navigation.navigate(YMCA_AFFILIATION_DETAILS)
                  : this.onSubmit();
              }}
              btnTxt={{
                leftBtnTxt: 'PREVIOUS',
                rightBtnTxt: affiliatedWithYmca ? 'NEXT' : 'FINISH',
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
    affiliatedWithYmca: jobPreferences.affiliated_with_ymca,
    loading: submitInfoReducer.loading,
    jobPreferences,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(YmcaAffiliation);
