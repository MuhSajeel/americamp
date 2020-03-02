/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';

import { inputChanged } from '../../redux/actions';
import { SmallButImportantStuff } from './common/smallButImpStuff';
import {
  J1_VISA,
  EARLY_DEPARTURES_ROUTE,
  CAMP_INITIAL_CHANGE_ACTION,
  CAMP_DATE_CHANGE_ACTION,
} from '../../constants';
import { isValidDate } from '../../helpers/DateRegex';

const AfterCampTravelComp = ({ navigation, inputChanged, camp_initial, camp_date }) => {
  return (
    <SmallButImportantStuff
      text={text}
      navigation={navigation}
      subHeading="AFTER CAMP TRAVEL"
      previousPath={J1_VISA}
      nextPath={camp_initial && isValidDate(camp_date || '') ? EARLY_DEPARTURES_ROUTE : null}
      initialValue={camp_initial}
      dateValue={camp_date}
      onInitialChange={text => inputChanged(text, CAMP_INITIAL_CHANGE_ACTION)}
      onDateChange={text => inputChanged(text, CAMP_DATE_CHANGE_ACTION)}
    />
  );
};

const text = {
  para1:
    'To apply to the Americamp program you will be required to pay Program Fees directly to Americamp',
  para2: 'First Time Applicants before January 1st,2019:',
  para3:
    '1. Application Payment: £40. Stage 1: This payment must be paid when you submit your online application form to AmeriCamp and be paid before your interview with AmeriCamp.',
  para4: '2. Acceptance  Payment: £70. Stage 2: This payment must be paid if you have been...',
  para5:
    'I confirm that I have read, understand, and agreed to abide by the terms, conditions and rules as detailed above.',
};

const mapStateToProps = ({ programAgreementReducer: { camp_initial, camp_date } }) => ({
  camp_initial,
  camp_date,
});

const AfterCampTravel = connect(
  mapStateToProps,
  { inputChanged }
)(AfterCampTravelComp);

export { AfterCampTravel };
