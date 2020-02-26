import React, { Component } from "react";
import { View } from "react-native";
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
  COUNTRY_OF_CITIZENSHIP,
  MNAME_CHANGED,
  FIRST_NAME
} from "../../constants";

class MiddleName extends Component {
  onMnameChange(text) {
    this.props.inputChanged(text, MNAME_CHANGED);
  }

  render() {
    const { navigation, mname, personalInfo, fetchedUserProfile } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <InputScreen
              title="MIDDLE NAME"
              placeholder="(Optional)"
              onChangeText={text => this.onMnameChange(text)}
              value={mname}
              cancel={() => this.onMnameChange("")}
            >
              <SubHeading extraStyling={{ fontSize: 24 }}>
                AS STATED IN YOUR PASSPORT
              </SubHeading>
            </InputScreen>
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigation.navigate(FIRST_NAME)}>
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={() => {
                const data = fetchedUserProfile;
                data.personal_info = personalInfo;
                setItem("@userProfile", JSON.stringify(data));
                navigation.navigate(COUNTRY_OF_CITIZENSHIP);
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
    mname: personalInfo.middle_name,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(MiddleName);
