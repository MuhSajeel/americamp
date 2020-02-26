/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { View, Alert } from "react-native";
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
  DATE_TO_END_WORK,
  DTSW_CHANGED,
  COUNTRY_CITY_OF_BIRTH
} from "../../constants";

class DateToStartWork extends Component {
  componentDidMount() {
    const { DTSW } = this.props;
    if (!DTSW) {
      let selectedDate = new Date(new Date().getFullYear(), 5, 1);
      if (new Date().getMonth() > 5)
        selectedDate = new Date(new Date().getFullYear() + 1, 5, 1);
      this.onDtswChange(selectedDate);
    }
  }

  onDtswChange(text) {
    this.props.inputChanged(text, DTSW_CHANGED);
  }

  render() {
    const { navigation, DTSW, personalInfo, fetchedUserProfile } = this.props;
    let minDate = new Date(new Date().getFullYear(), 4, 1);
    if (new Date().getMonth() > 5)
      minDate = new Date(new Date().getFullYear() + 1, 4, 1);
    let maxDate = new Date(new Date().getFullYear(), 5, 21);
    if (new Date().getMonth() > 5)
      maxDate = new Date(new Date().getFullYear() + 1, 5, 21);
    return (
      <Screen>
        {/*  Screen content */}
        <View key="content">
          <CalendarPickerScreen
            title="DATES AVAILABLE TO WORK"
            text="PLEASE SELECT YOUR PROPOSED"
            text2="START DATE"
            text3="Most people do AmeriCamp from June 15th until August 15th."
            text4="Placements can start as early as May 1st and end as late as September 30th."
            text5="The more availability you have the better. If you're worried about exam dates please put June 10th as available from."
            text6="In our experience, nearly all exams are completed by this date!"
          />
          <DateAndTimePicker
            date={DTSW}
            mode="date"
            androidMode="default"
            placeholder="CHOOSE START DATE"
            format="DD-MM-YYYY"
            minDate={minDate}
            maxDate={maxDate}
            highlight={!!DTSW}
            onDateChange={selectedDate => this.onDtswChange(selectedDate)}
          />
        </View>
        {/* content end */}

        {/* Bottom buttons or logo */}
        <View key="footer">
          <FooterWithButtons
            rightBtnNavigation={
              DTSW
                ? () => {
                    const data = fetchedUserProfile;
                    data.personal_info = personalInfo;
                    setItem("@userProfile", JSON.stringify(data));
                    navigation.navigate(DATE_TO_END_WORK);
                  }
                : () => Alert.alert("Please enter details")
            }
            leftBtnNavigation={() => navigation.navigate(COUNTRY_CITY_OF_BIRTH)}
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
    DTSW: personalInfo.start_date,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(DateToStartWork);
