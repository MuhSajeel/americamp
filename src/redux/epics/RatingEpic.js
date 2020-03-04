/* eslint-disable camelcase */
 
import { switchMap, filter } from 'rxjs/operators';

import { inputChanged } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  UNKNOWN_ERROR_MSG,
  RATE,
  FETCH_RATING_SUCCESS,
  FETCH_RATING_FAILURE,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';

export class RatingEpic {
  static rating = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case RATE:
            return true;
          case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async ({ payload: { rating } }) => {
        try {
          const response = rating
            ? await RestClient.post(API_ENDPOINTS.SUBMIT_RATING, { rating })
            : await RestClient.get(API_ENDPOINTS.FETCH_RATING);
          const { status, data: resObj } = response;
          if (status && status === 200) {
            if (resObj) {
              const { data } = resObj;
              return inputChanged(data, FETCH_RATING_SUCCESS);
            }
            return inputChanged(null, FETCH_RATING_FAILURE);
          }
          return inputChanged(null, FETCH_RATING_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Fetch Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return inputChanged(null, FETCH_RATING_FAILURE);
        }
      })
    );
}
