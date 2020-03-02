import React, { Component } from "react";
import { View, Alert } from "react-native";
import { connect } from "react-redux";

import {
  BottomButtonLeft,
  BottomButtonRight,
  DateAndTimePicker,
  Card
} from "../../components/common";
import { OptionsPickerScreen } from "../../components/PersonalInformationScreens";
import { setItem } from "../../helpers/Localstorage";
import { inputChanged } from "../../redux/actions";
import { GENDER, DOB_CHANGED, COUNTRY_OF_CITIZENSHIP } from "../../constants";

class DateOfBirth extends Component {
  state = { highlight: false };

  componentDidMount() {
    if (this.props.dateOfBirth !== "2001-01-01")
      this.setState({ highlight: true });
  }

  onDateOfBirthChange(text) {
    this.props.inputChanged(text, DOB_CHANGED);
  }

  render() {
    const { highlight } = this.state;
    let yearLimit = new Date().getFullYear();
    if (new Date().getMonth() > 5) yearLimit = new Date().getFullYear() + 1;
    let maxDate = new Date(new Date().getFullYear() - 18, 5, 0);
    if (new Date().getMonth() > 5)
      maxDate = new Date(new Date().getFullYear() - 17, 5, 0);
    const {
      navigation,
      dateOfBirth,
      personalInfo,
      fetchedUserProfile
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <OptionsPickerScreen
              title="DATE OF BIRTH"
              subHeading="YOU MUST BE MINIMUM OF 18"
              date={`JUNE 1ST ${yearLimit}`}
            >
              <DateAndTimePicker
                date={dateOfBirth}
                mode="date"
                androidMode="default"
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
                maxDate={maxDate}
                highlight={highlight}
                onDateChange={selectedDate => {
                  this.onDateOfBirthChange(selectedDate);
                  this.setState({ highlight: true });
                }}
              />
            </OptionsPickerScreen>
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft
              onPress={() => navigation.navigate(COUNTRY_OF_CITIZENSHIP)}
            >
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                highlight
                  ? () => {
                      const data = fetchedUserProfile;
                      data.personal_info = personalInfo;
                      setItem("@userProfile", JSON.stringify(data));
                      navigation.navigate(GENDER);
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
    dateOfBirth: personalInfo.dob,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(DateOfBirth);
