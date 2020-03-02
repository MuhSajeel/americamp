import {
  REFERENCE_ONE_NAME_CHANGE,
  REFERENCE_ONE_EMAIL_CHANGE,
  REFERENCE_ONE_NUMBER_CHANGE,
  REFERENCE_TWO_NAME_CHANGE,
  REFERENCE_TWO_EMAIL_CHANGE,
  REFERENCE_TWO_NUMBER_CHANGE,
  REFERENCE_THREE_NAME_CHANGE,
  REFERENCE_THREE_EMAIL_CHANGE,
  REFERENCE_THREE_NUMBER_CHANGE,
  SUBMIT_REFERENCES,
  SUBMIT_REFERENCES_SUCCESS,
  SUBMIT_REFERENCES_FAILURE,
} from '../../constants';

export const referenceOneName = payload => ({ type: REFERENCE_ONE_NAME_CHANGE, payload });

export const referenceOneEmail = payload => ({ type: REFERENCE_ONE_EMAIL_CHANGE, payload });

export const referenceOneNumber = payload => ({ type: REFERENCE_ONE_NUMBER_CHANGE, payload });

export const referenceTwoName = payload => ({ type: REFERENCE_TWO_NAME_CHANGE, payload });

export const referenceTwoEmail = payload => ({ type: REFERENCE_TWO_EMAIL_CHANGE, payload });

export const referenceTwoNumber = payload => ({ type: REFERENCE_TWO_NUMBER_CHANGE, payload });

export const referenceThreeName = payload => ({ type: REFERENCE_THREE_NAME_CHANGE, payload });

export const referenceThreeEmail = payload => ({ type: REFERENCE_THREE_EMAIL_CHANGE, payload });

export const referenceThreeNumber = payload => ({ type: REFERENCE_THREE_NUMBER_CHANGE, payload });

export const referencesSubmit = payload => ({ type: SUBMIT_REFERENCES, payload });

export const referencesSubmitSuccess = payload => ({ type: SUBMIT_REFERENCES_SUCCESS, payload });

export const referencesSubmitFailure = payload => ({ type: SUBMIT_REFERENCES_FAILURE, payload });
