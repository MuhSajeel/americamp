/* eslint-disable camelcase */
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import Toast from 'react-native-simple-toast';

import { inputChanged as isSavedCardDetails } from '../actions';
import {
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  SAVE_CARD_INFO_FAILURE,
  SAVE_CARD_INFO,
  STRIPE_TOKEN_GENERATE_SUCCESS,
} from '../../constants';
import { setItem } from '../../helpers/Localstorage';
import { createToken } from '../../helpers/stripe';

export class StripeTokenGenerateEpic {
  static stripeTokenGenerate = action$ =>
    action$.pipe(
      ofType(SAVE_CARD_INFO),
      switchMap(async ({ payload }) => {
        try {
          const response = await createToken(payload);
          const { status, data: resObj, problem } = response;
          if (resObj) {
            if (status && status === 200) {
              const last_four_digits = {
                last_four_digits: payload.card_number.slice([...payload.card_number].length - 4),
              };
              await setItem('@last_four_digits', JSON.stringify(last_four_digits));
              return isSavedCardDetails(
                { ...payload, token: resObj.id, name: payload.name_on_card },
                STRIPE_TOKEN_GENERATE_SUCCESS
              );
            }
            if (status && status === 512) {
              Toast.show(resObj.error.message);
              return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
            }
            if (problem) {
              Toast.show(resObj.error.message);
              return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
            }
          } else {
            Toast.show(ERROR_MSG);
            return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Sign Up Unknown Error', error);
          Toast.show(UNKNOWN_ERROR_MSG);
          return isSavedCardDetails(payload, SAVE_CARD_INFO_FAILURE);
        }
        return null;
      })
    );
}
