import { StagesList } from '../state/initial';
import {
  FETCH_STAGES_LIST_SUCCESS,
  FETCH_STAGES_LIST_FAILURE,
  GET_STAGES_LIST,
} from '../../constants';

export default (state = { StagesList: StagesList.slice(), loading: false }, { type, payload }) => {
  switch (type) {
    case GET_STAGES_LIST:
      return { ...state, loading: true };
    case FETCH_STAGES_LIST_SUCCESS:
      return {
        ...state,
        StagesList: payload
          ? payload.length < 1
            ? StagesList.slice()
            : payload
          : StagesList.slice(),
        loading: false,
      };
    case FETCH_STAGES_LIST_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
