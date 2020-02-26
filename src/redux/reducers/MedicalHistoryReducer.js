import * as CONSTANTS from '../../constants';
import { USER_PROFILE } from '../state/initial/UserProfile';

const MEDICAL_HISTORY_INITIAL_STATE = USER_PROFILE.medical_history;

export default (state = MEDICAL_HISTORY_INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.ANY_MEDICAL_CONDITION_CHANGED:
      return { ...state, any_medical_condition: action.payload };
    case CONSTANTS.MEDICAL_DETAIL_CHANGED:
      return { ...state, condition_details: action.payload };
    case CONSTANTS.MEDICAL_ALLERGIES_CHANGED:
      return { ...state, any_allergy: action.payload };
    case CONSTANTS.ALLERGY_DETAILS_CHANGED:
      return { ...state, allergy_details: action.payload };
    case CONSTANTS.ARE_YOU_IN_GOOD_HEALTH_CHANGED:
      return { ...state, are_you_in_good_health: action.payload };
    case CONSTANTS.CONVICTED_OF_CRIME_CHANGED:
      return { ...state, convicted_of_crime: action.payload };
    case CONSTANTS.CRIME_DETAIL_CHANGED:
      return { ...state, conviction_details: action.payload };
    case CONSTANTS.DO_YOU_SMOKE_CHANGED:
      return { ...state, smoke: action.payload };
    case CONSTANTS.ANY_TATTOOS_CHANGED:
      return { ...state, tattoos_or_body_piercing: action.payload };
    case CONSTANTS.TATTOOS_DETAIL_CHANGED:
      return { ...state, tattoos_or_piercing_details: action.payload };
    case CONSTANTS.WILLING_TO_REMOVE_PIERCINGS_CHANGED:
      return { ...state, willing_to_remove_piercing: action.payload };
    case CONSTANTS.MEDICAL_HISTORY_SUBMITTED:
      return { ...state, loading: true };
    case CONSTANTS.MEDICAL_HISTORY_SUBMIT_SUCCESS:
      return { ...state, loading: false };
    case CONSTANTS.MEDICAL_HISTORY_SUBMIT_FAIL:
      return { ...state, loading: false };
    case CONSTANTS.FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...action.payload.medical_history };
    case CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...action.payload.medical_history };
    default:
      return state;
  }
};
