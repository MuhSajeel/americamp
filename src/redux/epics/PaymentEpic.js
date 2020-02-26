/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged as isSavedCardDetails } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  DO_PAYMENT,
  DO_PAYMENT_FAILURE,
  DO_PAYMENT_SUCCESS,
} from '../../constants';

export class PaymentEpic {
  static payment = action$ =>
    action$.pipe(
      ofType(DO_PAYMENT),
      switchMap(async ({ payload }) => {
        try {
          const response = await RestClient.post(API_ENDPOINTS.PAYMENTS_STAGE, payload);
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              return isSavedCardDetails(resObj, DO_PAYMENT_SUCCESS);
            }
            return isSavedCardDetails(resObj, DO_PAYMENT_FAILURE);
          }
          if (status && status === 512) {
            if (resObj && !resObj.success) {
              return isSavedCardDetails(resObj, DO_PAYMENT_FAILURE);
            }
            return isSavedCardDetails(resObj, DO_PAYMENT_FAILURE);
          }
          if (problem && problem === NETWORK_ERROR_MSG) {
            return isSavedCardDetails(resObj, DO_PAYMENT_FAILURE);
          }
          return isSavedCardDetails(resObj, DO_PAYMENT_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Sign Up Unknown Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return isSavedCardDetails(payload, DO_PAYMENT_FAILURE);
        }
      })
    );
}
