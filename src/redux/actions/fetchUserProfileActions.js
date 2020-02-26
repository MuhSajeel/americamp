import * as CONSTANTS from '../../constants';

export const fetchUserProfile = payload => {
  return { type: CONSTANTS.FETCH_USER_PROFILE, payload };
};

export const fetchUserProfileOnBoarding = payload => {
  return { type: CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING, payload };
};

export const fetchUserProfileSuccess = payload => {
  return { type: CONSTANTS.FETCH_USER_PROFILE_SUCCESS, payload };
};

export const fetchUserProfileSuccessOnBoarding = payload => {
  return { type: CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING_SUCCESS, payload };
};

export const fetchUserProfileSuccessOnBoardingFailure = payload => {
  return { type: CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING_FAILURE, payload };
};

export const fetchUserProfileFailure = payload => {
  return { type: CONSTANTS.FETCH_USER_PROFILE_FAIL, payload };
};
