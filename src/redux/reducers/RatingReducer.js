import { FETCH_RATING_SUCCESS, RATE } from '../../constants';

const USER_RATING_STATE = {
  rating: 0,
};

export default (state = USER_RATING_STATE, action) => {
  switch (action.type) {
    case RATE:
      return { ...state, rating: action.payload.rating };
    case FETCH_RATING_SUCCESS:
      return { ...state, rating: action.payload.rating };
    default:
      return state;
  }
};
