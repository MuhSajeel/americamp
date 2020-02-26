import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import {
  BottomButtonLeft,
  BottomButtonRight,
  Card
} from "../../components/common";
import { InputScreen } from "../../components/PersonalInformationScreens";
import { setItem } from "../../helpers/Localstorage";
import { inputChanged } from "../../redux/actions";
import { COUNTRY, POSTCODE_CHANGED, COUNTRY_STATE } from "../../constants";

class Postcode extends Component {
  onPostcodeChange(text) {
    this.props.inputChanged(text, POSTCODE_CHANGED);
  }

  render() {
    const {
      navigation,
      postcode,
      personalInfo,
      fetchedUserProfile
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <InputScreen
              title="POSTCODE"
              autoFocus
              onChangeText={text => this.onPostcodeChange(text)}
              value={postcode}
              cancel={() => this.onPostcodeChange("")}
            />
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft
              onPress={() => navigation.navigate(COUNTRY_STATE)}
            >
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                postcode
                  ? () => {
                      const data = fetchedUserProfile;
                      data.personal_info = personalInfo;
                      setItem("@userProfile", JSON.stringify(data));
                      navigation.navigate(COUNTRY);
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
    postcode: personalInfo.postcode,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(Postcode);
