/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap, filter } from 'rxjs/operators';

import { inputChanged as stageProgressFetchedAction } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  FETCH_STAGES_PROGRESS_FAILURE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';
import { isMatched } from '../../helpers/MatchStages';
import { setItem } from '../../helpers/Localstorage';

export class StagesCompletenessEpic {
  static stagesCompletenessEpic = action$ =>
    action$.pipe(
      filter(({ type }) => isMatched(type).matched),
      switchMap(async ({ type, payload }) => {
        try {
          const { route, actionType, stage } = isMatched(type);
          const stagesProgress =
            type === FETCH_USER_PROFILE_SUCCESS || type === FETCH_USER_PROFILE_ON_BOARDING_SUCCESS
              ? { stage1: 0 }
              : payload;
          const response = await RestClient.get(route);
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              stagesProgress[stage] = resObj.data.completeness;
              setItem(`@${stage}`, JSON.stringify(resObj.data.completeness));
              return stageProgressFetchedAction(stagesProgress, actionType);
            }
            Alert.alert(NETWORK_ERROR_MSG);
            return stageProgressFetchedAction(payload, FETCH_STAGES_PROGRESS_FAILURE);
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            return stageProgressFetchedAction(payload, FETCH_STAGES_PROGRESS_FAILURE);
          }
          if (problem && problem === NETWORK_ERROR_MSG) {
            Alert.alert(NETWORK_ERROR_MSG);
            return stageProgressFetchedAction(payload, FETCH_STAGES_PROGRESS_FAILURE);
          }
          Alert.alert(ERROR_MSG);
          return stageProgressFetchedAction(payload, FETCH_STAGES_PROGRESS_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Sign Up Unknown Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return stageProgressFetchedAction(payload, FETCH_STAGES_PROGRESS_FAILURE);
        }
      })
    );
}
