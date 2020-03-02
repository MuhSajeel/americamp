/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../redux/actions';
import { SmallButImportantStuff } from './common/smallButImpStuff';
import {
  EARLY_DEPARTURES_ROUTE,
  RETURNEE_INITIAL_CHANGE_ACTION,
  RETURNEE_DATE_CHANGE_ACTION,
} from '../../constants';
import { isValidDate } from '../../helpers/DateRegex';

const TNC_ReturneesComp = ({
  navigation,
  inputChanged,
  returnee_initial,
  returnee_date,
  fetchedUserProfile,
  loading,
  programAgreementReducer,
  infoSubmited,
}) => {
  return (
    <SmallButImportantStuff
      text={text}
      navigation={navigation}
      subHeading="RETURNEES"
      previousPath={EARLY_DEPARTURES_ROUTE}
      nextPath={returnee_initial && isValidDate(returnee_date || '')}
      initialValue={returnee_initial}
      dateValue={returnee_date}
      onInitialChange={text => inputChanged(text, RETURNEE_INITIAL_CHANGE_ACTION)}
      onDateChange={text => inputChanged(text, RETURNEE_DATE_CHANGE_ACTION)}
      userProfile={fetchedUserProfile}
      loading={loading}
      reducerAction={() => {
        const data = { ...fetchedUserProfile };
        data.program_agreement = programAgreementReducer;
        console.log(data);
        infoSubmited(data);
      }}
      isFinal
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

const mapStateToProps = ({
  programAgreementReducer: { returnee_initial, returnee_date },
  fetchedUserProfile,
  submitInfoReducer: { loading },
  programAgreementReducer,
}) => ({
  returnee_initial,
  returnee_date,
  fetchedUserProfile,
  loading,
  programAgreementReducer,
});

const TNC_Returnees = connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(TNC_ReturneesComp);

export { TNC_Returnees };
