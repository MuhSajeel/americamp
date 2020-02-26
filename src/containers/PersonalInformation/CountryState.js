import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { BottomButtonLeft, BottomButtonRight, Card } from '../../components/common';
import { InputScreen } from '../../components/PersonalInformationScreens';
import { setItem } from '../../helpers/Localstorage';
import { inputChanged } from '../../redux/actions';
import { POSTCODE, STATE_CHANGED, TOWN_CITY } from '../../constants';

class CountryState extends Component {
  onCountryStateChange(text) {
    this.props.inputChanged(text, STATE_CHANGED);
  }

  render() {
    const { navigation, countryState, personalInfo, fetchedUserProfile } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <InputScreen
              title="COUNTY/STATE"
              placeholder="(Optional)"
              autoFocus
              onChangeText={text => this.onCountryStateChange(text)}
              value={countryState}
              cancel={() => this.onCountryStateChange('')}
            />
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigation.navigate(TOWN_CITY)}>
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={() => {
                const data = fetchedUserProfile;
                data.personal_info = personalInfo;
                setItem('@userProfile', JSON.stringify(data));
                navigation.navigate(POSTCODE);
              }}
            >
              NEXT
            </BottomButtonRight>
          </View>
          {/* bottom end */}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ personalInfo, fetchedUserProfile }) => {
  return {
    countryState: personalInfo.county_state,
    personalInfo,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(CountryState);
