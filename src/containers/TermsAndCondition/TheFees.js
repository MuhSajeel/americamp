/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';

import { SmallButImportantStuff } from './common/smallButImpStuff';
import {
  ACCEPTANCE_OF_CAMP_ROUTE,
  J1_VISA,
  FEE_INITIAL_CHANGE_ACTION,
  FEE_DATE_CHANGE_ACTION,
} from '../../constants';
import { inputChanged } from '../../redux/actions';
import { isValidDate } from '../../helpers/DateRegex';

const TheFeesComp = ({ navigation, fee_initial, fee_date, inputChanged }) => {
  return (
    <SmallButImportantStuff
      text={text}
      navigation={navigation}
      subHeading="THE FEES"
      previousPath={ACCEPTANCE_OF_CAMP_ROUTE}
      nextPath={fee_initial && isValidDate(fee_date || '') ? J1_VISA : null}
      initialValue={fee_initial}
      dateValue={fee_date}
      onInitialChange={text => inputChanged(text, FEE_INITIAL_CHANGE_ACTION)}
      onDateChange={text => inputChanged(text, FEE_DATE_CHANGE_ACTION)}
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

const mapStateToProps = ({ programAgreementReducer: { fee_initial, fee_date } }) => ({
  fee_initial,
  fee_date,
});

const TheFees = connect(
  mapStateToProps,
  { inputChanged }
)(TheFeesComp);

export { TheFees };
