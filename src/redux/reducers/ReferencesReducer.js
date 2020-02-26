/* eslint-disable no-param-reassign */
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
  FETCH_USER_PROFILE_SUCCESS,
} from '../../constants';

import { Reference } from '../state/initial';

export default (state = { references: Reference }, { type, payload }) => {
  switch (type) {
    case REFERENCE_ONE_NAME_CHANGE: {
      const references = state.references.slice();
      references[0] = { ...references[0], name: payload };
      return { ...state, references };
    }
    case REFERENCE_ONE_EMAIL_CHANGE: {
      const references = state.references.slice();
      references[0] = { ...references[0], email: payload };
      return { ...state, references };
    }
    case REFERENCE_ONE_NUMBER_CHANGE: {
      const references = state.references.slice();
      references[0] = { ...references[0], contact_number: payload };
      return { ...state, references };
    }
    case REFERENCE_TWO_NAME_CHANGE: {
      const references = state.references.slice();
      references[1] = { ...references[1], name: payload };
      return { ...state, references };
    }
    case REFERENCE_TWO_EMAIL_CHANGE: {
      const references = state.references.slice();
      references[1] = { ...references[1], email: payload };
      return { ...state, references };
    }
    case REFERENCE_TWO_NUMBER_CHANGE: {
      const references = state.references.slice();
      references[1] = { ...references[1], contact_number: payload };
      return { ...state, references };
    }
    case REFERENCE_THREE_NAME_CHANGE: {
      const references = state.references.slice();
      references[2] = { ...references[2], name: payload };
      return { ...state, references };
    }
    case REFERENCE_THREE_EMAIL_CHANGE: {
      const references = state.references.slice();
      references[2] = { ...references[2], email: payload };
      return { ...state, references };
    }
    case REFERENCE_THREE_NUMBER_CHANGE: {
      const references = state.references.slice();
      references[2] = { ...references[2], contact_number: payload };
      return { ...state, references };
    }
    case SUBMIT_REFERENCES:
      return { ...state, submitting: true };
    case SUBMIT_REFERENCES_SUCCESS:
      return { ...state, submitting: false };
    case SUBMIT_REFERENCES_FAILURE:
      return { ...state, submitting: false, error: payload.error };
    case FETCH_USER_PROFILE_SUCCESS: {
      const refs = payload.documents.references;
      return { ...state, ...{ references: refs.length < 2 ? Reference : refs } };
    }
    default:
      return state;
  }
};
