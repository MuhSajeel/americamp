/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from "react";
import { View, Text, Switch } from "react-native";
import { connect } from "react-redux";
import {
  inputChanged,
  employmentHistoryCurrentlyEmployed,
  employmentHistoryEmployerName,
  employmentHistoryPosition,
  employmentHistoryLocation,
  employmentHistoryStartDate,
  employmentHistoryEndDate,
  infoSubmited
} from "../../../redux/actions";
import {
  Heading,
  DropDown,
  Input,
  Screen,
  FooterWithButtons,
  DateAndTimePicker,
  Spinner,
  YesNoSelection
} from "../../../components/common";
import {
  APP_COLOR,
  CHILDREN_EXPERIENCE,
  EMPLOYMENT_HISTORY_INPUT_CHANGE
} from "../../../constants";
import styles from "./styles";

class EmploymentHistory extends Component {
  infoSubmit() {
    const data = this.props.fetchedUserProfile;
    data.work_experience = this.props.workExperienceReducer;
    this.props.infoSubmited(data);
  }

  render() {
    const {
      navigation,
      work_status,
      employmentHistoryCurrentlyEmployed,
      employmentHistoryEmployerName,
      employmentHistoryPosition,
      employmentHistoryLocation,
      employmentHistoryStartDate,
      employmentHistoryEndDate,
      current_employment_status,
      inputChanged,
      employer_name,
      position,
      location,
      start_date,
      end_date,
      loading
    } = this.props;
    const { textStyle } = styles;
    const { navigate } = navigation;
    const options = [
      {
        key: 1,
        label: "Full-time employed"
      },
      {
        key: 2,
        label: "Part-time employed"
      }
    ];
    return (
      <Screen>
        <View key="header">
          <Heading>EMPLOYMENT AND VOLUNTEER HISTORY</Heading>
        </View>
        <View key="content">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap"
            }}
          >
            <View style={{ flex: 1 }}>
              <Text>Are you currently in full or part-time employment?</Text>
            </View>
            <View style={{ marginBottom: 10, flex: 2, alignItems: "flex-end" }}>
              <YesNoSelection
                selected={work_status || false}
                onPress={val =>
                  inputChanged(val, EMPLOYMENT_HISTORY_INPUT_CHANGE.WORK_STATUS)
                }
                firstText="YES"
                secondText="NO"
                textMargin={{ marginLeft: 10 }}
              />
            </View>
          </View>
          {work_status ? (
            <View>
              <Text style={textStyle}>Your current employment status?</Text>
              <DropDown
                selectedValue={current_employment_status}
                options={options}
                onValueChange={({ key }) => {
                  console.log(key);
                  employmentHistoryCurrentlyEmployed(key);
                }}
              />
              <View style={{ paddingBottom: 30 }}>
                <Text style={textStyle}>Employer name</Text>
                <Input
                  onChangeText={employer =>
                    employmentHistoryEmployerName(employer)
                  }
                  value={employer_name}
                />
                <Text style={textStyle}>Position</Text>
                <Input
                  onChangeText={position => employmentHistoryPosition(position)}
                  value={position}
                />
                <Text style={textStyle}>Location</Text>
                <Input
                  onChangeText={location => employmentHistoryLocation(location)}
                  value={location}
                />
                <Text style={textStyle}>Dates worked</Text>
                <DateAndTimePicker
                  date={start_date}
                  mode="date"
                  androidMode="default"
                  placeholder="Select Start Date"
                  format="DD-MM-YYYY"
                  maxDate={getCurrentDate()}
                  unHighlight
                  onDateChange={datesWorked =>
                    employmentHistoryStartDate(datesWorked)
                  }
                />
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    marginBottom: 15
                  }}
                >
                  <Text>Currently Employed? </Text>
                  <Switch
                    onValueChange={() =>
                      employmentHistoryEndDate(
                        end_date === start_date ? null : start_date
                      )
                    }
                    value={start_date && start_date === end_date}
                    thumbColor={
                      start_date && start_date === end_date
                        ? APP_COLOR
                        : "rgb(169,169,169)"
                    }
                    trackColor={{
                      true: "rgba(255,0,0,0.4)",
                      false: "rgba(0,0,0,0.2)"
                    }}
                  />
                </View>
                {!(start_date && start_date === end_date) ? (
                  <DateAndTimePicker
                    date={end_date}
                    mode="date"
                    androidMode="default"
                    placeholder="Select End Date"
                    format="DD-MM-YYYY"
                    minDate={start_date}
                    maxDate={getCurrentDate()}
                    unHighlight
                    onDateChange={datesWorked =>
                      employmentHistoryEndDate(datesWorked)
                    }
                  />
                ) : null}
              </View>
            </View>
          ) : null}
        </View>
        <View key="footer">
          {/* <FooterWithButtons
            leftBtnNavigation={() => navigate(CHILDREN_EXPERIENCE)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS' }}
          /> */}
          {loading ? (
            <View style={styles.spinnerContainer}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigate(CHILDREN_EXPERIENCE)}
              rightBtnNavigation={
                (current_employment_status &&
                  employer_name &&
                  position &&
                  location &&
                  start_date &&
                  end_date) ||
                !work_status
                  ? () => this.infoSubmit()
                  : null
              }
              btnTxt={{ rightBtnTxt: "FINISH", leftBtnTxt: "PREVIOUS" }}
            />
          )}
        </View>
      </Screen>
    );
  }
}

const getCurrentDate = () => {
  const current_datetime = new Date();
  return `${current_datetime.getDate()}-${current_datetime.getMonth() +
    1}-${current_datetime.getFullYear()}`;
};

const mapStateToProps = ({
  workExperienceReducer,
  submitInfoReducer,
  fetchedUserProfile
}) => {
  const {
    work_status,
    current_employment_status,
    employer_name,
    start_date,
    end_date,
    position,
    location
  } = workExperienceReducer;
  const { loading } = submitInfoReducer;
  return {
    work_status,
    current_employment_status: current_employment_status || 1,
    employer_name,
    position,
    location,
    start_date,
    end_date,
    loading,
    workExperienceReducer,

    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  {
    inputChanged,
    employmentHistoryCurrentlyEmployed,
    employmentHistoryEmployerName,
    employmentHistoryPosition,
    employmentHistoryLocation,
    employmentHistoryStartDate,
    employmentHistoryEndDate,
    infoSubmited
  }
)(EmploymentHistory);
