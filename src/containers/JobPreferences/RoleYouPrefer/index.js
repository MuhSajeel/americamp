import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';

import { Screen, Heading, FooterWithButtons, PickerOptions } from '../../../components/common';
import { JOB_DETAILS } from '../../../constants';
import { inputChanged } from '../../../redux/actions';
// import { setItem } from '../../../helpers/Localstorage';

class RoleYouPrefer extends Component {
  state = { role: '' };

  // onNavigate() {
  //   const { fetchedUserProfile, jobPreferences } = this.props;
  //   const data = fetchedUserProfile;
  //   data.job_preference = jobPreferences;
  //   setItem('@userProfile', JSON.stringify(data));
  // }

  componentDidMount() {
    const { role } = this.props;
    this.setState({ role });
  }

  render() {
    const { navigation, role: Role } = this.props;
    const { role } = this.state;
    return (
      <Screen>
        <View key="header">
          <Heading>WHICH JOB ROLE ARE YOU APPLYING FOR?</Heading>
        </View>
        <View key="content">
          <PickerOptions
            label="CAMP COUNSELOR"
            onPress={() => this.setState({ role: 'camp_counselor' })}
            highlight={role === 'camp_counselor'}
          />
          <PickerOptions
            label="SUPPORT STAFF"
            onPress={() => this.setState({ role: 'support_staff' })}
            highlight={role === 'support_staff'}
          />

          <Text>
            Remember 95% of all AmeriCampers choose to be camp counselors. To be support staff (work
            behind the scenes at camp) you have to be a student.
          </Text>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.goBack()}
            rightBtnNavigation={() => {
              if (Role !== role) {
                return Alert.alert(
                  "Can't get you through!",
                  "Your current selection doesn't match with your previous selection for more information please contact AmeriCamp."
                );
              }
              return navigation.navigate(JOB_DETAILS);
            }}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  stageZeroReducer: {
    apply_now: { role },
  },
}) => {
  return {
    role,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(RoleYouPrefer);
