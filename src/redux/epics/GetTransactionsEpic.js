/* eslint-disable camelcase */
 
import { switchMap, filter } from 'rxjs/operators';

import { inputChanged as isSavedCardDetails } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  STAGE_ZERO_SUBMIT_SUCCESS,
  UNKNOWN_ERROR_MSG,
  PAYMENT_TRANSACTIONS,
  GET_TRANSACTIONS_FAILURE,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';
//import NavigationService from '../../navigator/Navigation';

export class GetTransactionsEpic {
  static getTransactions = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case GET_TRANSACTIONS:
            return true;
          case STAGE_ZERO_SUBMIT_SUCCESS:
            return true;
          case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async ({ payload }) => {
        try {
          const response = await RestClient.get(API_ENDPOINTS.TRANSACTIONS);
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              if (payload.isNavigate) {
                if (payload.backToDashboard) {
                  //NavigationService.navigate(PAYMENT_TRANSACTIONS, { toDashboard: 'toDashboard' });
                } else {
                  //NavigationService.navigate(PAYMENT_TRANSACTIONS);
                }
              }
              return isSavedCardDetails(resObj, GET_TRANSACTIONS_SUCCESS);
            }

            return isSavedCardDetails(payload, GET_TRANSACTIONS_FAILURE);
          }
          if (status && status === 512) {
            return isSavedCardDetails(payload, GET_TRANSACTIONS_FAILURE);
          }
          if (problem && problem === NETWORK_ERROR_MSG) {
            return isSavedCardDetails(payload, GET_TRANSACTIONS_FAILURE);
          }

          return isSavedCardDetails(payload, GET_TRANSACTIONS_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Sign Up Unknown Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return isSavedCardDetails(payload, GET_TRANSACTIONS_FAILURE);
        }
      })
    );
}
