import {
  WORKED_BEFORE_INPUT_CHANGE,
  PREVIOUS_WORK_EXPERIENCE_INPUT_CHANGE,
  EMPLOYMENT_HISTORY_INPUT_CHANGE,
  WHY_WORK_AT_CAMP_INPUT_CHANGE,
  POSITIVE_IMPACT_AT_CAMP_INPUT_CHANGE,
  WHY_HIRE_YOU_INPUT_CHANGE,
  WORK_EXPERIENCE_SUBMIT,
  WORK_EXPERIENCE_SUBMIT_SUCCESS,
  WORK_EXPERIENCE_SUBMIT_FAILURE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';
import { WorkExperience } from '../state/initial';

const {
  WORK_STATUS,
  CURRENTLY_EMPLOYED,
  EMPLOYER_NAME,
  POSITION,
  LOCATION,
  START_DATE,
  END_DATE,
  EXP_WITH_CHILDREN,
} = EMPLOYMENT_HISTORY_INPUT_CHANGE;

export default (state = WorkExperience, { type, payload }) => {
  switch (type) {
    case WORKED_BEFORE_INPUT_CHANGE:
      return { ...state, ever_worked_in_camp: payload };
    case PREVIOUS_WORK_EXPERIENCE_INPUT_CHANGE:
      return { ...state, prev_work_exp: payload };
    case WHY_WORK_AT_CAMP_INPUT_CHANGE:
      return { ...state, why_work_at_camp: payload };
    case POSITIVE_IMPACT_AT_CAMP_INPUT_CHANGE:
      return { ...state, positive_impact_at_camp: payload };
    case WHY_HIRE_YOU_INPUT_CHANGE:
      return { ...state, why_hire_you: payload };
    case WORK_STATUS:
      return { ...state, work_status: payload };
    case CURRENTLY_EMPLOYED:
      return { ...state, current_employment_status: payload };
    case EMPLOYER_NAME:
      return { ...state, employer_name: payload };
    case POSITION:
      return { ...state, position: payload };
    case LOCATION:
      return { ...state, location: payload };
    case START_DATE:
      return { ...state, start_date: payload };
    case END_DATE:
      return { ...state, end_date: payload };
    case EXP_WITH_CHILDREN:
      return { ...state, exp_with_childern: payload };
    case WORK_EXPERIENCE_SUBMIT:
      return { ...state, submitting: true };
    case WORK_EXPERIENCE_SUBMIT_SUCCESS:
      return { ...state, submitting: false };
    case WORK_EXPERIENCE_SUBMIT_FAILURE:
      return { ...state, submitting: false, error: payload.error };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...payload.work_experience };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...payload.work_experience };
    default:
      return state;
  }
};
