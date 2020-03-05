/* eslint-disable camelcase */
 
import { switchMap, filter } from 'rxjs/operators';

import { inputChanged as isSavedCardDetails } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  UNKNOWN_ERROR_MSG,
  FETCH_STAGES_LIST_FAILURE,
  GET_STAGES_LIST,
  FETCH_STAGES_LIST_SUCCESS,
  STAGE_ZERO_SUBMIT_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';

export class GetStagesListEpic {
  static getStagesList = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_STAGES_LIST:
            return true;
          case STAGE_ZERO_SUBMIT_SUCCESS:
            return true;
          case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async () => {
        try {
          const response = await RestClient.get(API_ENDPOINTS.STAGES_LIST);
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj) {
              return isSavedCardDetails(resObj.data, FETCH_STAGES_LIST_SUCCESS);
            }
            return isSavedCardDetails(null, FETCH_STAGES_LIST_FAILURE);
          }
          if (status && status === 512) {
            return isSavedCardDetails(null, FETCH_STAGES_LIST_FAILURE);
          }
          if (problem) {
            return isSavedCardDetails(null, FETCH_STAGES_LIST_FAILURE);
          }
          return isSavedCardDetails(null, FETCH_STAGES_LIST_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Sign Up Unknown Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return isSavedCardDetails(null, FETCH_STAGES_LIST_FAILURE);
        }
      })
    );
}
