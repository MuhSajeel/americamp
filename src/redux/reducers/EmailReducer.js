import {
  EMAIL_CHANGED,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';

const USER_EMAIL_STATE = {
  email: '',
};

export default (state = USER_EMAIL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, email: action.payload.email };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, email: action.payload.email };
    default:
      return state;
  }
};
