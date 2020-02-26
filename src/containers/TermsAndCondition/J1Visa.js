/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';

import { inputChanged } from '../../redux/actions';
import { SmallButImportantStuff } from './common/smallButImpStuff';
import {
  THE_FEES_ROUTE,
  AFTER_CAMP_TRAVEL_ROUTE,
  VISA_INITIAL_CHANGE_ACTION,
  VISA_DATE_CHANGE_ACTION,
} from '../../constants';
import { isValidDate } from '../../helpers/DateRegex';

const J1VisaComp = ({ navigation, inputChanged, visa_initial, visa_date }) => {
  return (
    <SmallButImportantStuff
      text={text}
      navigation={navigation}
      subHeading="J-1 VISA"
      previousPath={THE_FEES_ROUTE}
      nextPath={visa_initial && isValidDate(visa_date || '') ? AFTER_CAMP_TRAVEL_ROUTE : null}
      initialValue={visa_initial}
      dateValue={visa_date}
      onInitialChange={text => inputChanged(text, VISA_INITIAL_CHANGE_ACTION)}
      onDateChange={text => inputChanged(text, VISA_DATE_CHANGE_ACTION)}
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

const mapStateToProps = ({ programAgreementReducer: { visa_initial, visa_date } }) => ({
  visa_initial,
  visa_date,
});

const J1Visa = connect(
  mapStateToProps,
  { inputChanged }
)(J1VisaComp);

export { J1Visa };
