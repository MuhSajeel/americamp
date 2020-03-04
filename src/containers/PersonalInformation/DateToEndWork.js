/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import {
  Screen,
  DateAndTimePicker,
  FooterWithButtons
} from "../../components/common";
import { CalendarPickerScreen } from "../../components/PersonalInformationScreens";
import { setItem } from "../../helpers/Localstorage";
import { inputChanged } from "../../redux/actions";
import {
  PHONE_NUMBER,
  DTEW_CHANGED,
  DATE_TO_START_WORK
} from "../../constants";

class DateToEndWork extends Component {
  componentDidMount() {
    const { DTEW } = this.props;
    if (!DTEW) {
      let selectedDate = new Date(new Date().getFullYear(), 7, 20);
      if (new Date().getMonth() > 5)
        selectedDate = new Date(new Date().getFullYear() + 1, 7, 20);
      this.onDtewChange(selectedDate);
    }
  }

  onDtewChange(text) {
    this.props.inputChanged(text, DTEW_CHANGED);
  }

  render() {
    const { navigation, DTEW, personalInfo, fetchedUserProfile } = this.props;
    let minDate = new Date(new Date().getFullYear(), 7, 14);
    if (new Date().getMonth() > 5)
      minDate = new Date(new Date().getFullYear() + 1, 7, 14);
    let maxDate = new Date(new Date().getFullYear(), 8, 30);
    if (new Date().getMonth() > 5)
      maxDate = new Date(new Date().getFullYear() + 1, 8, 30);
    return (
      <Screen>
        {/*  Screen content */}
        <View key="content">
          <CalendarPickerScreen
            title="DATES AVAILABLE TO WORK"
            text="PLEASE SELECT YOUR PROPOSED"
            text2="FINISH DATE"
            text3="Most people do AmeriCamp from June 15th until August 15th."
            text4="Placements can start as early as May 1st and end as late as September 30th."
            text5="The more availability you have the better. If you're worried about exam dates please put June 10th as available from."
            text6="In our experience, nearly all exams are completed by this date!"
          />
          <DateAndTimePicker
            date={DTEW}
            mode="date"
            androidMode="default"
            placeholder="CHOOSE END DATE"
            format="DD-MM-YYYY"
            minDate={minDate}
            maxDate={maxDate}
            highlight={!!DTEW}
            onDateChange={selectedDate => this.onDtewChange(selectedDate)}
          />
        </View>
        {/* content end */}

        {/* Bottom buttons or logo */}
        <View key="footer">
          <FooterWithButtons
            rightBtnNavigation={
              DTEW
                ? () => {
                    const data = fetchedUserProfile;
                    data.personal_info = personalInfo;
                    setItem("@userProfile", JSON.stringify(data));
                    navigation.navigate(PHONE_NUMBER);
                  }
                : () => Alert.alert("Please enter details")
            }
            leftBtnNavigation={() => navigation.navigate(DATE_TO_START_WORK)}
            btnTxt={{ leftBtnTxt: "PREVIOUS", rightBtnTxt: "NEXT" }}
          />
        </View>
        {/* bottom end */}
      </Screen>
    );
  }
}

const mapStateToProps = ({ personalInfo, fetchedUserProfile }) => {
  return {
    DTEW: personalInfo.end_date,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(DateToEndWork);
