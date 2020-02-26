import {
  STAGE0_PROGRESS_CHANGED,
  STAGE1_PROGRESS_CHANGED,
  STAGE2_PROGRESS_CHANGED,
  STAGE3_PROGRESS_CHANGED,
  STAGE4_PROGRESS_CHANGED,
  FETCH_USER_PROFILE_FAIL,
  STAGE_ZERO_SUBMIT_FAILURE,
  FETCH_STAGES_PROGRESS_SUCCESS,
  FETCH_APPLY_NOW_DATA_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';

import { isApplyNowNull } from '../../helpers/isApplyNowNull';

const INITIAL_STATE = {
  stage0: 0,
  stage1: 0,
  stage2: 0,
  stage3: 0,
  stage4: 0,
};

export default (state = { ...INITIAL_STATE }, action) => {
  switch (action.type) {
    case STAGE0_PROGRESS_CHANGED:
      return { ...state, stage0: action.payload };
    case STAGE1_PROGRESS_CHANGED:
      return { ...state, stage1: action.payload };
    case STAGE2_PROGRESS_CHANGED:
      return { ...state, stage2: action.payload };
    case STAGE3_PROGRESS_CHANGED:
      return { ...state, stage3: action.payload };
    case STAGE4_PROGRESS_CHANGED:
      return { ...state, stage4: action.payload };
    case FETCH_USER_PROFILE_FAIL:
      return { ...state, ...INITIAL_STATE };
    case FETCH_STAGES_PROGRESS_SUCCESS:
      return { ...state, ...action.payload };
    case STAGE_ZERO_SUBMIT_FAILURE:
      return { ...state, stage0: 0 };
    case FETCH_APPLY_NOW_DATA_SUCCESS:
      return { ...state, stage0: isApplyNowNull(action.payload) ? 100 : 0 };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, stage0: isApplyNowNull(action.payload.apply_now) ? 100 : 0 };
    default:
      return state;
  }
};
