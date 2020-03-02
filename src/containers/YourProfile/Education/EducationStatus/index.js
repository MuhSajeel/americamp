/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';

import { connect } from 'react-redux';

import { inputChanged } from '../../../../redux/actions';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  RadioButton,
  Input,
  DateAndTimePicker,
} from '../../../../components/common';
import {
  STUDY_BACKGROUND_NAV,
  YES_BACKGROUND,
  CURRENT_OCCUPATION_TYPE,
  COURSE_TITLE,
  CURRENT_STUDY,
  COURSE_DEGREE_LEVEL,
  UNIVERSITY_NAME,
  DEGREE_TYPE,
  GRADUATION_DATE,
  CURRENTLY_STUDYING,
} from '../../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class EducationStatus extends Component {
  render() {
    const {
      navigation,
      current_educational_status,
      currently_studying,
      inputChanged,
      name_of_university,
      course_title,
      began_studies,
      expected_graduation_date,
      summer_holiday_from,
      summer_holiday_to,
    } = this.props;
    const RadioOptions = [
      { label: 'High school / secondary student', value: 'High school / secondary student' },
      {
        label: 'Non-university degree / diploma student',
        value: 'Non-university degree / diploma student',
      },
      { label: 'Undergraduate university student', value: 'Undergraduate university student' },
      {
        label: 'Undergraduate university medical student',
        value: 'Undergraduate university medical student',
      },
      { label: 'Postgraduate university student', value: 'Postgraduate university student' },
      {
        label: 'Postgraduate university medical student',
        value: 'Postgraduate university medical student',
      },
      { label: 'Other, please explain:', value: 'Other' },
    ];
    let minDate = new Date(new Date().getFullYear(), 4, 1);
    if (new Date().getMonth() > 5) minDate = new Date(new Date().getFullYear() + 1, 4, 1);
    let maxDate = new Date(new Date().getFullYear(), 8, 30);
    if (new Date().getMonth() > 5) maxDate = new Date(new Date().getFullYear() + 1, 8, 30);
    return (
      <Screen>
        {/* Screen Content */}
        <View key="header">
          <Heading>Education</Heading>
        </View>
        <View key="content">
          <SubHeading extraStyling={{ fontSize: 15 }}>
            Which one category best describes your CURRENT education status?
          </SubHeading>
          <RadioButton
            options={RadioOptions}
            value={current_educational_status}
            onPress={value => {
              inputChanged(value, CURRENT_OCCUPATION_TYPE);
            }}
          />

          <View>
            {current_educational_status === 'Other' ? (
              <TextInput
                style={{
                  height: 100,
                  borderColor: '#000000',
                  borderWidth: 1,
                  borderRadius: 6,
                }}
                value={currently_studying}
                multiline
                additionalTxtStyle={{ flex: 1 }}
                onChangeText={textData => inputChanged(textData, CURRENTLY_STUDYING)}
                maxLength={250}
                numberOfLines={16}
              />
            ) : null}
          </View>

          <View style={{ paddingTop: 10 }}>
            <Input
              placeholder="College/University Name"
              onChangeText={universityName => inputChanged(universityName, COURSE_TITLE)}
              value={name_of_university}
            />
            <Input
              placeholder="Course title / major"
              onChangeText={coursetitle => inputChanged(coursetitle, CURRENT_STUDY)}
              value={course_title}
            />
            {/* <Input
              placeholder="Month and year began studies"
              onChangeText={studies => inputChanged(studies, COURSE_DEGREE_LEVEL)}
              value={began_studies}
            />
            <Input
              placeholder="Graduation month and year"
              onChangeText={graduation => inputChanged(graduation, UNIVERSITY_NAME)}
              value={expected_graduation_date}
            /> */}
            <Text
              style={{
                paddingTop: 10,
                fontWeight: 'bold',
              }}
            >
              Dates of Graduation period
            </Text>
            <View style={{ paddingTop: 10 }}>
              <DateAndTimePicker
                mode="date"
                format="DD-MM-YYYY"
                date={began_studies}
                androidMode="default"
                placeholder="From"
                unHighlight
                onDateChange={from => inputChanged(from, COURSE_DEGREE_LEVEL)}
              />
            </View>
            <View style={{ paddingTop: 10 }}>
              <DateAndTimePicker
                mode="date"
                format="DD-MM-YYYY"
                date={expected_graduation_date}
                androidMode="default"
                placeholder="To (expected)"
                minDate={began_studies}
                unHighlight
                onDateChange={to => inputChanged(to, UNIVERSITY_NAME)}
              />
            </View>
          </View>
          <Text
            style={{
              paddingTop: 10,
              fontWeight: 'bold',
            }}
          >
            Dates of summer holiday
          </Text>
          <View style={{ paddingTop: 10 }}>
            <DateAndTimePicker
              mode="date"
              format="DD-MM-YYYY"
              date={summer_holiday_from}
              androidMode="default"
              maxDate={maxDate}
              minDate={minDate}
              placeholder="From"
              unHighlight
              onDateChange={from => inputChanged(from, DEGREE_TYPE)}
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <DateAndTimePicker
              mode="date"
              format="DD-MM-YYYY"
              date={summer_holiday_to}
              androidMode="default"
              placeholder="To"
              maxDate={maxDate}
              minDate={summer_holiday_from}
              unHighlight
              onDateChange={to => inputChanged(to, GRADUATION_DATE)}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(STUDY_BACKGROUND_NAV)}
            rightBtnNavigation={
              current_educational_status !== null &&
                name_of_university &&
                course_title &&
                began_studies &&
                expected_graduation_date &&
                summer_holiday_from &&
                summer_holiday_to
                ? () => navigation.navigate(YES_BACKGROUND)
                : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

const mapStateToProps = ({
  educationReducer: {
    current_educational_status,
    currently_studying,
    name_of_university,
    course_title,
    began_studies,
    expected_graduation_date,
    summer_holiday_from,
    summer_holiday_to,
  },
}) => {
  return {
    current_educational_status,
    currently_studying,
    name_of_university,
    course_title,
    began_studies,
    expected_graduation_date,
    summer_holiday_from,
    summer_holiday_to,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(EducationStatus);
