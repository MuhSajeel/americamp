import {
  ON_SPLASH_ACTION,
  ON_SPLASH_ACTION_FINISH,
  FETCH_USER_PROFILE_ON_BOARDING,
  FETCH_USER_PROFILE_ON_BOARDING_FAILURE,
} from '../../constants';

export default (state = { loading: false, showBoarding: false }, { type }) => {
  switch (type) {
    case ON_SPLASH_ACTION:
      return { ...state, loading: true };
    case FETCH_USER_PROFILE_ON_BOARDING:
      return { ...state, loading: true };
    case FETCH_USER_PROFILE_ON_BOARDING_FAILURE:
      return { ...state, loading: false, showBoarding: true };
    case ON_SPLASH_ACTION_FINISH:
      return { ...state, loading: false };
    default:
      return state;
  }
};
