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
import { LNAME_CHANGED, FIRST_NAME, STAGE_ONE } from "../../constants";

class LastName extends Component {
  onLnameChange(text) {
    this.props.inputChanged(text, LNAME_CHANGED);
  }

  render() {
    const { navigation, lname, personalInfo, fetchedUserProfile } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <InputScreen
              title="LAST NAME"
              autoFocus={Platform.OS === "android" && !lname}
              onChangeText={text => this.onLnameChange(text)}
              value={lname}
              cancel={() => this.onLnameChange("")}
            >
              <SubHeading extraStyling={{ fontSize: 24 }}>
                AS STATED IN YOUR PASSPORT
              </SubHeading>
            </InputScreen>
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigation.navigate(STAGE_ONE)}>
              CANCEL
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                lname
                  ? () => {
                      const data = fetchedUserProfile;
                      data.personal_info = personalInfo;
                      setItem("@userProfile", JSON.stringify(data));
                      navigation.navigate(FIRST_NAME);
                    }
                  : () => Alert.alert("Please enter details")
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
    lname: personalInfo.last_name,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(LastName);
