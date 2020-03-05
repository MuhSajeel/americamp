/* eslint-disable camelcase */
 
import { switchMap, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged as isApplyNowFetched } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  URL_LINK_FETCH_SUCCESS,
  URL_LINK_FETCH_FAILURE,
} from '../../constants';

export class FetchUrlLinkEpic {
  static fetchUrlLinkEpic = action$ =>
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
          const response = await RestClient.get(API_ENDPOINTS.URL_LINK_FETCH);
          const { status, data: resObj, problem } = response;
          if (status && (status === 200 || status === 201)) {
            if (resObj && resObj.data) {
              return isApplyNowFetched(resObj.data, URL_LINK_FETCH_SUCCESS);
            }
            return isApplyNowFetched(null, URL_LINK_FETCH_SUCCESS);
          }
          if (status && status === 512) {
            if (resObj) {
              return isApplyNowFetched(null, URL_LINK_FETCH_FAILURE);
            }
          } else if (problem) {
            return isApplyNowFetched(null, URL_LINK_FETCH_FAILURE);
          } else {
            return isApplyNowFetched(null, URL_LINK_FETCH_FAILURE);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Fetch Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return isApplyNowFetched(null, URL_LINK_FETCH_FAILURE);
        }
        return null;
      })
    );
}
