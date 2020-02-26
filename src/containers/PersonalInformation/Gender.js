import React, { Component } from "react";
import { View, Alert } from "react-native";
import { connect } from "react-redux";

import {
  BottomButtonLeft,
  BottomButtonRight,
  PickerOptions,
  Card2
} from "../../components/common";
import { OptionsPickerScreen } from "../../components/PersonalInformationScreens";
import { setItem } from "../../helpers/Localstorage";
import { inputChanged } from "../../redux/actions";
import { QuestionWithBox } from "../../components/JobPreferences";
import {
  COUNTRY_CITY_OF_BIRTH,
  GENDER_CHANGED,
  DATE_OF_BIRTH
} from "../../constants";

class Gender extends Component {
  onGenderChange(text) {
    this.props.inputChanged(text, GENDER_CHANGED);
  }

  render() {
    const { navigation, gender, personalInfo, fetchedUserProfile } = this.props;
    return (
      <Card2>
        {/*  Screen content */}
        <View key="content">
          <OptionsPickerScreen title="GENDER">
            <PickerOptions
              label="MALE"
              onPress={() => this.onGenderChange("Male")}
              highlight={gender === "male" || gender === "Male"}
            />
            <PickerOptions
              label="FEMALE"
              onPress={() => this.onGenderChange("Female")}
              highlight={gender === "female" || gender === "Female"}
            />
            <QuestionWithBox
              question="IF YOU IDENTIFY AS A NONE BINARY GENDER, PLEASE EXPLAIN:"
              onChangeText={answer => this.onGenderChange(answer)}
              answer={
                gender !== "male" &&
                gender !== "Male" &&
                gender !== "female" &&
                gender !== "Female"
                  ? gender
                  : ""
              }
              bold
            />
          </OptionsPickerScreen>
        </View>
        {/* content end */}

        {/* Bottom buttons or logo */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(DATE_OF_BIRTH)}>
            PREVIOUS
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <BottomButtonRight
            onPress={
              gender
                ? () => {
                    const data = fetchedUserProfile;
                    data.personal_info = personalInfo;
                    setItem("@userProfile", JSON.stringify(data));
                    navigation.navigate(COUNTRY_CITY_OF_BIRTH);
                  }
                : () => Alert.alert("Please enter details")
            }
          >
            NEXT
          </BottomButtonRight>
        </View>
        {/* bottom end */}
      </Card2>
    );
  }
}

const mapStateToProps = ({ personalInfo, fetchedUserProfile }) => {
  return {
    gender: personalInfo.gender,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(Gender);
