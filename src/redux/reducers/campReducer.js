/* eslint-disable camelcase */
import {
  CAMP_EMPLOYEE_NAME_CHANGE,
  CAMP_DIRECTOR_CHANGE,
  CAMP_EMAIL_CHANGE,
  CAMP_PHONE_CHANGE,
  JOB_TYPE_CHANGE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';

import { USER_PROFILE } from '../state/initial/UserProfile';

export default (state = USER_PROFILE.camp_information, action) => {
  switch (action.type) {
    case CAMP_EMPLOYEE_NAME_CHANGE:
      return { ...state, camp_employee_name: action.payload };
    case CAMP_DIRECTOR_CHANGE:
      return { ...state, camp_director: action.payload };
    case CAMP_EMAIL_CHANGE:
      return { ...state, camp_email: action.payload };
    case CAMP_PHONE_CHANGE:
      return { ...state, camp_phone: action.payload };
    case JOB_TYPE_CHANGE:
      return { ...state, job_type: action.payload };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...action.payload.camp_information };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...action.payload.camp_information };
    default:
      return state;
  }
};
