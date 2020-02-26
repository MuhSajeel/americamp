/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';

import { inputChanged } from '../../redux/actions';
import { SmallButImportantStuff } from './common/smallButImpStuff';
import {
  AFTER_CAMP_TRAVEL_ROUTE,
  RETURNEES_ROUTE,
  DEPART_INITIAL_CHANGE_ACTION,
  DEPART_DATE_CHANGE_ACTION,
} from '../../constants';
import { isValidDate } from '../../helpers/DateRegex';

const EarlyDeparturesComp = ({ navigation, inputChanged, depart_initial, depart_date }) => {
  return (
    <SmallButImportantStuff
      text={text}
      navigation={navigation}
      subHeading="EARLY DEPARTURES"
      previousPath={AFTER_CAMP_TRAVEL_ROUTE}
      nextPath={depart_initial && isValidDate(depart_date || '') ? RETURNEES_ROUTE : null}
      initialValue={depart_initial}
      dateValue={depart_date}
      onInitialChange={text => inputChanged(text, DEPART_INITIAL_CHANGE_ACTION)}
      onDateChange={text => inputChanged(text, DEPART_DATE_CHANGE_ACTION)}
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

const mapStateToProps = ({ programAgreementReducer: { depart_initial, depart_date } }) => ({
  depart_initial,
  depart_date,
});

const EarlyDepartures = connect(
  mapStateToProps,
  { inputChanged }
)(EarlyDeparturesComp);

export { EarlyDepartures };
