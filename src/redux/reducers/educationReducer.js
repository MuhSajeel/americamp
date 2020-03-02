/* eslint-disable camelcase */
import {
  STUDIED_AT_COLLEGE,
  CURRENT_OCCUPATION_TYPE,
  CURRENT_STUDY,
  COURSE_TITLE,
  COURSE_DEGREE_LEVEL,
  UNIVERSITY_NAME,
  GRADUATION_DATE,
  DEGREE_TYPE,
  ADDITIONAL_INFO_CHANGED,
  CURRENT_OCCUPATION,
  PREVIOUS_OCCUPATION,
  SUBMIT_EDUCATION,
  SUBMIT_EDUCATION_SUCCESS,
  SUBMIT_EDUCATION_FAILURE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  CURRENTLY_STUDYING,
} from '../../constants';

import { USER_PROFILE } from '../state/initial/UserProfile';

export default (state = USER_PROFILE.educational_background, action) => {
  switch (action.type) {
    case STUDIED_AT_COLLEGE:
      return { ...state, studied_at_college: action.payload };
    case CURRENT_OCCUPATION_TYPE:
      return { ...state, current_educational_status: action.payload };
    case CURRENT_STUDY:
      return { ...state, course_title: action.payload };
    case COURSE_TITLE:
      return { ...state, name_of_university: action.payload };
    case COURSE_DEGREE_LEVEL:
      return { ...state, began_studies: action.payload };
    case UNIVERSITY_NAME:
      return { ...state, expected_graduation_date: action.payload };
    case DEGREE_TYPE:
      return { ...state, summer_holiday_from: action.payload };
    case GRADUATION_DATE:
      return { ...state, summer_holiday_to: action.payload };
    case ADDITIONAL_INFO_CHANGED:
      return { ...state, extra_detail: action.payload };
    case CURRENTLY_STUDYING:
      return { ...state, currently_studying: action.payload };
    //  extra fields
    case CURRENT_OCCUPATION:
      return { ...state, current_occupation: action.payload };
    case PREVIOUS_OCCUPATION:
      return { ...state, previous_occupation: action.payload };
    case SUBMIT_EDUCATION:
      return { ...state, loading: true };
    case SUBMIT_EDUCATION_SUCCESS:
      return { ...state, loading: false };
    case SUBMIT_EDUCATION_FAILURE:
      return { ...state, error: action.payload.error };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...action.payload.educational_background };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...action.payload.educational_background };
    default:
      return state;
  }
};
