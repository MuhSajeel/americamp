/* eslint-disable camelcase */
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged as isSavedCardDetails } from '../actions';
import {
  FETCH_LAST_FOUR_DIGIT,
  SAVE_LAST_FOUR_DIGIT,
  DEPOSITE_AMOUNT,
  PAYMENT_OPTIONS,
} from '../../constants';
import { getItem } from '../../helpers/Localstorage';
//import NavigationService from '../../navigator/Navigation';

export class FetchFourDigitEpic {
  static fetchFourDigit = action$ =>
    action$.pipe(
      ofType(FETCH_LAST_FOUR_DIGIT),
      switchMap(async () => {
        try {
          const four_digits = await getItem('@last_four_digits');
          if (four_digits) {
            const { last_four_digits } = JSON.parse(four_digits);
            //NavigationService.navigate(DEPOSITE_AMOUNT);
            return isSavedCardDetails(last_four_digits, SAVE_LAST_FOUR_DIGIT);
          }
          //NavigationService.navigate(PAYMENT_OPTIONS);
          return isSavedCardDetails(null, SAVE_LAST_FOUR_DIGIT);
        } catch (error) {
          return isSavedCardDetails(null, SAVE_LAST_FOUR_DIGIT);
        }
      })
    );
}
