/* eslint-disable camelcase */
import {
  CONTRIBUTE_TO_CAMP_CHANGED,
  ABOUT_YOURSELF_CHANGED,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';

import { USER_PROFILE } from '../state/initial/UserProfile';

export default (state = USER_PROFILE.personal_statement, action) => {
  switch (action.type) {
    case ABOUT_YOURSELF_CHANGED:
      return { ...state, about_yourself: action.payload };
    case CONTRIBUTE_TO_CAMP_CHANGED:
      return { ...state, contribute_to_camp: action.payload };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...action.payload.personal_statement };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...action.payload.personal_statement };
    default:
      return state;
  }
};
