/* eslint-disable camelcase */
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged as isSavedCardDetails } from '../actions';
import { FETCH_STRIPE_CUSTOMER_ID, SAVE_CUSTOMER_ID } from '../../constants';
import { getItem } from '../../helpers/Localstorage';

export class FetchStripeCustomerIdEpic {
  static fetchStripeCustomerId = action$ =>
    action$.pipe(
      ofType(FETCH_STRIPE_CUSTOMER_ID),
      switchMap(async () => {
        try {
          const id = await getItem('@stripe_customer_id');
          if (id) {
            const { stripe_customer_id } = JSON.parse(id);
            return isSavedCardDetails(stripe_customer_id, SAVE_CUSTOMER_ID);
          }
          return isSavedCardDetails(null, SAVE_CUSTOMER_ID);
        } catch (error) {
          return isSavedCardDetails(null, SAVE_CUSTOMER_ID);
        }
      })
    );
}
