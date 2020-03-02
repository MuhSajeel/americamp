import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { BottomButtonLeft, BottomButtonRight, Card } from '../../components/common';
import { InputScreen } from '../../components/PersonalInformationScreens';
import { setItem } from '../../helpers/Localstorage';
import { inputChanged } from '../../redux/actions';
import { TOWN_CITY, AL2_CHANGED, ADDRESS_LINE_1 } from '../../constants';

class AddressLine2 extends Component {
  onAddressLine2Change(text) {
    this.props.inputChanged(text, AL2_CHANGED);
  }

  render() {
    const { navigation, addressLine2, personalInfo, fetchedUserProfile } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <InputScreen
              title="ADDRESS LINE 2"
              placeholder="(Optional)"
              autoFocus
              onChangeText={text => this.onAddressLine2Change(text)}
              value={addressLine2}
              cancel={() => this.onAddressLine2Change('')}
            />
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigation.navigate(ADDRESS_LINE_1)}>
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={() => {
                const data = fetchedUserProfile;
                data.personal_info = personalInfo;
                setItem('@userProfile', JSON.stringify(data));
                navigation.navigate(TOWN_CITY);
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
    addressLine2: personalInfo.address_line2,
    personalInfo,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(AddressLine2);
