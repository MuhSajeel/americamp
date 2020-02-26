import { FETCH_FORM_STATUS_SUCCESS } from '../../constants';

import { FormsStatus } from '../state/initial';

export default (state = FormsStatus, action) => {
  switch (action.type) {
    case FETCH_FORM_STATUS_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
