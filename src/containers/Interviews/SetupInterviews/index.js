/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { inputChanged, bookInterview } from '../../../redux/actions';
import {
  SubHeading,
  DateAndTimePicker,
  PickerOptions,
  Screen,
  BottomButtonLeft,
  BottomButtonRight,
  Spinner,
} from '../../../components/common';

import {
  STAGE_ONE,
  INTERVIEW_DATE_CHANGED,
  INTERVIEW_TIME_CHANGED,
  APP_COLOR,
  WHITE_COLOR,
  INTERVIEW_STATUS_TITLE,
} from '../../../constants';

const SetupInterviews = props => {
  const { navigation, inputChanged, interview, bookInterview } = props;
  const { requested_on, status, starts_at, loading } = props.interview;
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  let maxDate = new Date(new Date().getFullYear(), 8, 30);
  if (new Date().getMonth() > 5) maxDate = new Date(new Date().getFullYear() + 1, 8, 0);
  return (
    <Screen>
      <View key="content">
        <SubHeading extraStyling={{ fontSize: 35 }}>REQUESTED FOR</SubHeading>
        {status === 1 ? (
          <DateAndTimePicker
            mode="date"
            androidMode="default"
            placeholder="DD/MM/YY"
            format="DD-MM-YYYY"
            minDate={tomorrow}
            maxDate={maxDate}
            date={requested_on}
            unHighlight
            onDateChange={selectedDate => inputChanged(selectedDate, INTERVIEW_DATE_CHANGED)}
          />
        ) : (
            <PickerOptions label={requested_on} highlight={false} />
          )}
        <SubHeading extraStyling={{ marginTop: 10, fontSize: 35 }}>STATUS</SubHeading>
        <TextInput
          style={
            status === 1
              ? styles.textInput
              : [styles.textInput, { backgroundColor: APP_COLOR, color: WHITE_COLOR }]
          }
          editable={false}
          placeholder="PENDING/REQUESTED/CONFIRMED"
          value={INTERVIEW_STATUS_TITLE[status]}
        />
        <SubHeading extraStyling={{ marginTop: 10, fontSize: 35 }}>STARTS AT</SubHeading>
        {status === 1 ? (
          <DateAndTimePicker
            mode="time"
            date={starts_at}
            androidMode="default"
            placeholder="hh:mm"
            format="HH:mm"
            unHighlight
            onDateChange={selectedTime => inputChanged(selectedTime, INTERVIEW_TIME_CHANGED)}
          />
        ) : (
            <PickerOptions label={starts_at} highlight={false} />
          )}
      </View>
      {/* Bottom buttons or logo */}

      <View key="footer" style={styles.footerButton}>
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(STAGE_ONE)}>Home</BottomButtonLeft>
        </View>
        <View key="bottomRight">
          {loading ? (
            <Spinner />
          ) : (
              <BottomButtonRight
                onPress={
                  requested_on && starts_at && status === 1
                    ? () => {
                      interview.status = 2;
                      bookInterview({ interview });
                    }
                    : null
                }
              >
                Finish
            </BottomButtonRight>
            )}
        </View>
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ interview }) => {
  return { interview };
};

export default connect(
  mapStateToProps,
  { inputChanged, bookInterview }
)(SetupInterviews);
