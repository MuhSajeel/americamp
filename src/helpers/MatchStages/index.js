import {
  API_ENDPOINTS,
  FETCH_USER_PROFILE_SUCCESS,
  STAGE1_PROGRESS_SUCCESS,
  STAGE2_PROGRESS_SUCCESS,
  STAGE3_PROGRESS_SUCCESS,
  FETCH_STAGES_PROGRESS_SUCCESS,
} from '../../constants';

const isMatched = type => {
  const {
    STAGES_PROGRESS_FETCH: { STAGE1_PROGRESS, STAGE2_PROGRESS, STAGE3_PROGRESS, STAGE4_PROGRESS },
  } = API_ENDPOINTS;
  switch (type) {
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        matched: true,
        route: STAGE1_PROGRESS,
        actionType: STAGE1_PROGRESS_SUCCESS,
        stage: 'stage1',
      };
    case STAGE1_PROGRESS_SUCCESS:
      return {
        matched: true,
        route: STAGE2_PROGRESS,
        actionType: STAGE2_PROGRESS_SUCCESS,
        stage: 'stage2',
      };
    case STAGE2_PROGRESS_SUCCESS:
      return {
        matched: true,
        route: STAGE3_PROGRESS,
        actionType: STAGE3_PROGRESS_SUCCESS,
        stage: 'stage3',
      };
    case STAGE3_PROGRESS_SUCCESS:
      return {
        matched: true,
        route: STAGE4_PROGRESS,
        actionType: FETCH_STAGES_PROGRESS_SUCCESS,
        stage: 'stage4',
      };
    default:
      return { matched: false, route: null };
  }
};

export { isMatched };
