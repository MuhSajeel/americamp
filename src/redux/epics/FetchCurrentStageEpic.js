/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap, filter } from 'rxjs/operators';

import { inputChanged as isCurrentStageFetched } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  FETCH_CURRENT_STAGE_OF_USER_FAILURE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_CURRENT_STAGE_OF_USER_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';

export class FetchCurrentStageEpic {
  static fetchCurrentStageEpic = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case FETCH_USER_PROFILE_SUCCESS:
            return true;
          case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async () => {
        try {
          const response = await RestClient.get(API_ENDPOINTS.CURRENT_STAGE);
          const { status, data: resObj, problem } = response;
          console.log(response);
          if (status && status === 200) {
            if (resObj) {
              return isCurrentStageFetched(resObj.data, FETCH_CURRENT_STAGE_OF_USER_SUCCESS);
            }
            return isCurrentStageFetched(null, FETCH_CURRENT_STAGE_OF_USER_FAILURE);
          }
          if (status && status === 512) {
            return isCurrentStageFetched(null, FETCH_CURRENT_STAGE_OF_USER_FAILURE);
          }
          if (problem) {
            return isCurrentStageFetched(null, FETCH_CURRENT_STAGE_OF_USER_FAILURE);
          }
          return isCurrentStageFetched(null, FETCH_CURRENT_STAGE_OF_USER_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Fetch Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return isCurrentStageFetched(null, FETCH_CURRENT_STAGE_OF_USER_FAILURE);
        }
      })
    );
}
