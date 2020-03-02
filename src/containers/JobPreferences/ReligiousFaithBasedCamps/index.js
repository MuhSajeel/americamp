import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { Screen, Heading, FooterWithButtons, PickerOptions } from '../../../components/common';
import { inputChanged } from '../../../redux/actions';
import {
  RELIGIOUS_CAMPS_CHANGED,
  RELIGIOUS_FAITH_BASED_CAMPS_REQUESTS,
  YMCA_AFFILIATION,
} from '../../../constants';
// import { setItem } from '../../../helpers/Localstorage';

class ReligiousFaithBasedCamps extends Component {
  state = { navigationRoute: YMCA_AFFILIATION };

  componentDidMount() {
    const { religiousCamps } = this.props;
    if (religiousCamps) this.setState({ navigationRoute: RELIGIOUS_FAITH_BASED_CAMPS_REQUESTS });
  }

  // onNavigate() {
  //   const { fetchedUserProfile, religiousCamps } = this.props;
  //   const data = fetchedUserProfile;
  //   data.job_preference.religious_camps = religiousCamps;
  //   setItem('@userProfile', JSON.stringify(data));
  // }

  render() {
    const { navigation, religiousCamps } = this.props;
    const { navigationRoute } = this.state;
    return (
      <Screen>
        <View key="header">
          <Heading>Religious or faith based camps</Heading>
        </View>
        <View key="content">
          <Text style={[styles.text, { fontWeight: 'normal' }]}>
            Nearly all camps in America were originally founded with a faith-based philosophy.
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Are you interested in working at a camp with an active faith-based program?
            </Text>
          </View>
          <PickerOptions
            label="YES"
            onPress={() => {
              this.setState({
                navigationRoute: RELIGIOUS_FAITH_BASED_CAMPS_REQUESTS,
              });
              this.props.inputChanged(true, RELIGIOUS_CAMPS_CHANGED);
            }}
            highlight={religiousCamps === null || religiousCamps}
          />
          <PickerOptions
            label="NO"
            onPress={() => {
              this.setState({ navigationRoute: YMCA_AFFILIATION });
              this.props.inputChanged(false, RELIGIOUS_CAMPS_CHANGED);
            }}
            highlight={religiousCamps === false}
          />
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.goBack(null)}
            rightBtnNavigation={() => {
              if (religiousCamps === null) {
                this.props.inputChanged(true, RELIGIOUS_CAMPS_CHANGED);
                return navigation.navigate(RELIGIOUS_FAITH_BASED_CAMPS_REQUESTS);
              }
              return navigation.navigate(navigationRoute);
            }}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ jobPreferences, fetchedUserProfile }) => {
  return {
    religiousCamps: jobPreferences.religious_camps,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(ReligiousFaithBasedCamps);
