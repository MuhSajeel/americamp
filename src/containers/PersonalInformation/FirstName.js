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
import { MIDDLE_NAME, FNAME_CHANGED, LAST_NAME } from "../../constants";

class FirstName extends Component {
  onFnameChange(text) {
    this.props.inputChanged(text, FNAME_CHANGED);
  }

  render() {
    const { navigation, fname, personalInfo, fetchedUserProfile } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <InputScreen
              title="FIRST NAME"
              autoFocus={Platform.OS === "android" && !fname}
              onChangeText={text => this.onFnameChange(text)}
              value={fname}
              cancel={() => this.onFnameChange("")}
            >
              <SubHeading extraStyling={{ fontSize: 24 }}>
                AS STATED IN YOUR PASSPORT
              </SubHeading>
            </InputScreen>
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigation.navigate(LAST_NAME)}>
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                fname
                  ? () => {
                      const data = fetchedUserProfile;
                      data.personal_info = personalInfo;
                      setItem("@userProfile", JSON.stringify(data));
                      navigation.navigate(MIDDLE_NAME);
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
    fname: personalInfo.first_name,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(FirstName);
