import { Payment } from '../state/initial';
import {
  SAVE_CARD_INFO,
  SAVE_CARD_INFO_SUCCESS,
  SAVE_CARD_INFO_FAILURE,
  SAVE_CUSTOMER_ID,
  SAVE_LAST_FOUR_DIGIT,
  FETCH_LAST_FOUR_DIGIT,
  CURRENT_PAYMENT_STAGE_CHANGE,
} from '../../constants';

export default (
  state = {
    ...Payment,
    loading: false,
    last_four_digits: null,
    currentPaymentStage: null,
    currentPaymentStageTitle: null,
  },
  { type, payload }
) => {
  switch (type) {
    case SAVE_CARD_INFO:
      return { ...state, ...payload, loading: true };
    case CURRENT_PAYMENT_STAGE_CHANGE:
      return { ...state, ...payload };
    case SAVE_CARD_INFO_SUCCESS:
      return { ...state, loading: false };
    case SAVE_CARD_INFO_FAILURE:
      return { ...state, loading: false };
    case SAVE_CUSTOMER_ID:
      return { ...state, stripe_customer_id: payload };
    case SAVE_LAST_FOUR_DIGIT:
      return { ...state, last_four_digits: payload, loading: false };
    case FETCH_LAST_FOUR_DIGIT:
      return { ...state, loading: true };
    default:
      return state;
  }
};
