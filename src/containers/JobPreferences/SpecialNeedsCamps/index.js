import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import {
  Screen,
  Heading,
  FooterWithButtons,
  PickerOptions
} from '../../../components/common';
import { inputChanged } from '../../../redux/actions';
import {
  SPECIAL_NEEDS_CAMPS_REQUESTS,
  RELIGIOUS_FAITH_BASED_CAMPS,
  SPECIAL_NEED_CAMP_CHANGED
} from '../../../constants';
// import { setItem } from '../../../helpers/Localstorage';

class SpecialNeedsCamps extends Component {
  state = { navigationRoute: RELIGIOUS_FAITH_BASED_CAMPS };

  componentDidMount() {
    const { specialNeedsCamps } = this.props;
    if (specialNeedsCamps)
      this.setState({ navigationRoute: SPECIAL_NEEDS_CAMPS_REQUESTS });
  }

  // onNavigate() {
  //   const { fetchedUserProfile, specialNeedsCamps } = this.props;
  //   const data = fetchedUserProfile;
  //   data.job_preference.special_need_camp = specialNeedsCamps;
  //   setItem('@userProfile', JSON.stringify(data));
  // }

  render() {
    const { navigation, specialNeedsCamps } = this.props;
    const { navigationRoute } = this.state;
    return (
      <Screen>
        <View key="header">
          <Heading>Special Needs Camps</Heading>
        </View>
        <View key="content">
          <Text style={[styles.text, { fontWeight: 'normal' }]}>
            If you really want to make a difference in the Summer there is no
            greater feeling than working with people that have special needs.
          </Text>
          <Text style={[styles.text, { fontWeight: 'normal', paddingTop: 5 }]}>
            Camps will provide full training and no previous experience is
            necessary.
          </Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Are you interested in working at a special needs camp?
            </Text>
          </View>
          <PickerOptions
            label="YES"
            onPress={() => {
              this.props.inputChanged(true, SPECIAL_NEED_CAMP_CHANGED);
              this.setState({ navigationRoute: SPECIAL_NEEDS_CAMPS_REQUESTS });
            }}
            highlight={specialNeedsCamps === null || specialNeedsCamps}
          />
          <PickerOptions
            label="NO"
            onPress={() => {
              this.props.inputChanged(false, SPECIAL_NEED_CAMP_CHANGED);
              this.setState({ navigationRoute: RELIGIOUS_FAITH_BASED_CAMPS });
            }}
            highlight={specialNeedsCamps === false}
          />
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.goBack()}
            rightBtnNavigation={() => {
              if (specialNeedsCamps === null || specialNeedsCamps === true) {
                this.props.inputChanged(true, SPECIAL_NEED_CAMP_CHANGED);
                return navigation.navigate(SPECIAL_NEEDS_CAMPS_REQUESTS);
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
    specialNeedsCamps: jobPreferences.special_need_camp,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(SpecialNeedsCamps);
