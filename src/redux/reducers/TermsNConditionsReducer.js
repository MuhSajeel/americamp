/* eslint-disable camelcase */
import {
  ACCEPT_TERM_ACTION,
  NAME_CHANGE_ACTION,
  SIGNATURE_CHANGE_ACTION,
  DATE_CHANGE_ACTION,
  PARENT_NAME_CHANGE_ACTION,
  PARENT_SIGN_CHANGE_ACTION,
  PARENT_DATE_CHANGE_ACTION,
  FEE_INITIAL_CHANGE_ACTION,
  FEE_DATE_CHANGE_ACTION,
  VISA_DATE_CHANGE_ACTION,
  VISA_INITIAL_CHANGE_ACTION,
  CAMP_INITIAL_CHANGE_ACTION,
  CAMP_DATE_CHANGE_ACTION,
  DEPART_INITIAL_CHANGE_ACTION,
  DEPART_DATE_CHANGE_ACTION,
  RETURNEE_INITIAL_CHANGE_ACTION,
  RETURNEE_DATE_CHANGE_ACTION,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';
import { program_agreement } from '../state/initial';

export default (state = { ...program_agreement }, { type, payload }) => {
  switch (type) {
    case ACCEPT_TERM_ACTION:
      return { ...state, accept_term: payload };
    case NAME_CHANGE_ACTION:
      return { ...state, name: payload };
    case SIGNATURE_CHANGE_ACTION:
      return { ...state, signature: payload };
    case DATE_CHANGE_ACTION:
      return { ...state, date: payload };
    case PARENT_NAME_CHANGE_ACTION:
      return { ...state, parent_name: payload };
    case PARENT_SIGN_CHANGE_ACTION:
      return { ...state, parent_sign: payload };
    case PARENT_DATE_CHANGE_ACTION:
      return { ...state, parent_date: payload };
    case FEE_INITIAL_CHANGE_ACTION:
      return { ...state, fee_initial: payload };
    case FEE_DATE_CHANGE_ACTION:
      return { ...state, fee_date: payload };
    case VISA_INITIAL_CHANGE_ACTION:
      return { ...state, visa_initial: payload };
    case VISA_DATE_CHANGE_ACTION:
      return { ...state, visa_date: payload };
    case CAMP_INITIAL_CHANGE_ACTION:
      return { ...state, camp_initial: payload };
    case CAMP_DATE_CHANGE_ACTION:
      return { ...state, camp_date: payload };
    case DEPART_INITIAL_CHANGE_ACTION:
      return { ...state, depart_initial: payload };
    case DEPART_DATE_CHANGE_ACTION:
      return { ...state, depart_date: payload };
    case RETURNEE_INITIAL_CHANGE_ACTION:
      return { ...state, returnee_initial: payload };
    case RETURNEE_DATE_CHANGE_ACTION:
      return { ...state, returnee_date: payload };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...payload.program_agreement };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...payload.program_agreement };
    default:
      return state;
  }
};
