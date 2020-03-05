/* eslint-disable camelcase */
 
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged as isSavedCardDetails } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  SAVE_CARD_INFO_FAILURE,
  STRIPE_CUSTOMER_GENERATE_SUCCESS,
  SAVE_CARD_INFO_SUCCESS,
  DEPOSITE_AMOUNT,
} from '../../constants';
//import NavigationService from '../../navigator/Navigation';

export class SaveStripeCustomerEpic {
  static saveStripeCustomerEpic = action$ =>
    action$.pipe(
      ofType(STRIPE_CUSTOMER_GENERATE_SUCCESS),
      switchMap(async ({ payload: { name, stripe_customer_id } }) => {
        try {
          const data = {
            user: {
              name,
              stripe_customer_id,
            },
          };
          const response = await RestClient.put(API_ENDPOINTS.UPDATE_USER, data);
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              // Alert.alert('Card Info Saved Successfully');
              //NavigationService.navigate(DEPOSITE_AMOUNT);
              return isSavedCardDetails(data, SAVE_CARD_INFO_SUCCESS);
            }
            return isSavedCardDetails(data, SAVE_CARD_INFO_FAILURE);
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              return isSavedCardDetails(data, SAVE_CARD_INFO_FAILURE);
            }
            return isSavedCardDetails(data, SAVE_CARD_INFO_FAILURE);
          }
          if (problem && problem === NETWORK_ERROR_MSG) {
            return isSavedCardDetails(data, SAVE_CARD_INFO_FAILURE);
          }
          return isSavedCardDetails(data, SAVE_CARD_INFO_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Sign Up Unknown Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return isSavedCardDetails({ name, stripe_customer_id }, SAVE_CARD_INFO_FAILURE);
        }
      })
    );
}
