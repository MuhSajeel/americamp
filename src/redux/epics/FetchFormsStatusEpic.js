/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap, filter } from 'rxjs/operators';

import { fetchFormStatusSuccess, fetchFormStatusFailure } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  INFO_SUBMIT_SUCCESS,
} from '../../constants';
import { setItem, getItem } from '../../helpers/Localstorage';

export class FetchFormsStatusEpic {
  static fetchFormsStatus = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case FETCH_USER_PROFILE_SUCCESS:
            return true;
          case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
            return true;
          case INFO_SUBMIT_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async () => {
        try {
          let localFormsStatus = await getItem('@formsStatus');
          if (localFormsStatus) {
            localFormsStatus = JSON.parse(localFormsStatus);
            const response = await RestClient.get(API_ENDPOINTS.FETCH_FORM_STATUS);
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              const { data } = resObj;
              if (resObj && resObj.success) {
                await setItem('@formsStatus', JSON.stringify(data));
                return fetchFormStatusSuccess(data);
              }
              return fetchFormStatusSuccess(localFormsStatus);
            }
            if (status && (status === 401 || status === 422 || status === 512)) {
              return fetchFormStatusSuccess(localFormsStatus);
            }
            if (problem && problem === NETWORK_ERROR_MSG) {
              return fetchFormStatusSuccess(localFormsStatus);
            }
            return fetchFormStatusSuccess(localFormsStatus);
          }
          return fetchFormStatusFailure('No Data available');
        } catch (error) {
          return fetchFormStatusFailure('Error in fetching Data', error);
        }
      })
    );
}
