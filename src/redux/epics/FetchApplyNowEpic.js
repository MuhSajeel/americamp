/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged as isApplyNowFetched } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  FETCH_APPLY_NOW_DATA_FAILURE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_APPLY_NOW_DATA_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';
import { setItem } from '../../helpers/Localstorage';

export class FetchApplyNowDataEpic {
  static fetchApplyNowDataEpic = action$ =>
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
      switchMap(async ({ payload }) => {
        try {
          const response = await RestClient.get(API_ENDPOINTS.FETCH_APPLY_NOW_DATA);
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj) {
              const data = { ...payload, apply_now: resObj.data };
              await setItem('@userProfile', JSON.stringify(data));
              return isApplyNowFetched(resObj.data, FETCH_APPLY_NOW_DATA_SUCCESS);
            }
            return isApplyNowFetched(null, FETCH_APPLY_NOW_DATA_FAILURE);
          }
          if (status && status === 512) {
            return isApplyNowFetched(null, FETCH_APPLY_NOW_DATA_FAILURE);
          }
          if (problem) {
            return isApplyNowFetched(null, FETCH_APPLY_NOW_DATA_FAILURE);
          }
          return isApplyNowFetched(null, FETCH_APPLY_NOW_DATA_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Fetch Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return isApplyNowFetched(null, FETCH_APPLY_NOW_DATA_FAILURE);
        }
      })
    );
}
