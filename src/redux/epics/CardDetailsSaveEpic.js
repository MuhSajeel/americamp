/* eslint-disable camelcase */
 
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged as isSavedCardDetails } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  SAVE_CARD_INFO_FAILURE,
  STRIPE_TOKEN_GENERATE_SUCCESS,
  STRIPE_CUSTOMER_GENERATE_SUCCESS,
  NETWORK_ERROR_MSG,
} from '../../constants';

export class CardDetailsSaveEpic {
  static cardDetailsSave = action$ =>
    action$.pipe(
      ofType(STRIPE_TOKEN_GENERATE_SUCCESS),
      switchMap(async ({ payload }) => {
        try {
          const data = {
            token: payload.token,
          };
          const response = await RestClient.post(API_ENDPOINTS.CREATE_CUSTOMER, data);
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj) {
              return isSavedCardDetails(
                { ...payload, stripe_customer_id: resObj.data.id },
                STRIPE_CUSTOMER_GENERATE_SUCCESS
              );
            }
            return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
          }
          if (status && status === 512) {
            if (resObj) {
              return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
            }
            return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
          }
          if (problem) {
            return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
          }
          return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Sign Up Unknown Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
        }
      })
    );
}
