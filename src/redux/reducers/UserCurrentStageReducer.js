import { FETCH_CURRENT_STAGE_OF_USER_SUCCESS } from '../../constants';
import { UserCurrentStage } from '../state/initial/UserCurrentStage';

export default (state = { ...UserCurrentStage }, action) => {
  switch (action.type) {
    case FETCH_CURRENT_STAGE_OF_USER_SUCCESS:
      return { ...state, ...(action.payload || UserCurrentStage) };
    default:
      return state;
  }
};
