import { Transactions } from '../state/initial';
import {
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE,
  GET_TRANSACTIONS,
} from '../../constants';

export default (
  state = { Transactions: Transactions.slice(), gettingTransactions: false },
  { type, payload }
) => {
  switch (type) {
    case GET_TRANSACTIONS:
      return { ...state, gettingTransactions: true };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        Transactions: payload.data.length < 1 ? Transactions.slice() : payload.data,
        gettingTransactions: false,
      };
    case GET_TRANSACTIONS_FAILURE:
      return { ...state, gettingTransactions: false };
    default:
      return state;
  }
};
