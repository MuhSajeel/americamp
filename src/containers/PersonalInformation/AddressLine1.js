import React, { Component } from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";

import {
  BottomButtonLeft,
  BottomButtonRight,
  Card,
  SubHeading
} from "../../components/common";
import { InputScreen } from "../../components/PersonalInformationScreens";
import { setItem } from "../../helpers/Localstorage";
import { inputChanged } from "../../redux/actions";
import {
  ADDRESS_LINE_2,
  AL1_CHANGED,
  COUNTRY_CITY_OF_BIRTH
} from "../../constants";

class AddressLine1 extends Component {
  onAddressLine1Change(text) {
    this.props.inputChanged(text, AL1_CHANGED);
  }

  render() {
    const {
      navigation,
      addressLine1,
      personalInfo,
      fetchedUserProfile
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <InputScreen
              title="ADDRESS LINE 1"
              autoFocus={Platform.OS === "android"}
              onChangeText={text => this.onAddressLine1Change(text)}
              value={addressLine1}
              cancel={() => this.onAddressLine1Change("")}
            >
              <SubHeading extraStyling={{ fontSize: 24 }}>
                HOME ADDRESS IS BEST!
              </SubHeading>
            </InputScreen>
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft
              onPress={() => navigation.navigate(COUNTRY_CITY_OF_BIRTH)}
            >
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                addressLine1
                  ? () => {
                      const data = fetchedUserProfile;
                      data.personal_info = personalInfo;
                      setItem("@userProfile", JSON.stringify(data));
                      navigation.navigate(ADDRESS_LINE_2);
                    }
                  : null
              }
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
    addressLine1: personalInfo.address_line1,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(AddressLine1);
