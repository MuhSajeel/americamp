/* eslint-disable camelcase */
import { NEW_APPLICANT, DIRECT_PLACEMENT, RETURN_TO_CAMP } from '../../constants';

const getPaymentFlow = applicant_type => {
  switch (applicant_type) {
    case NEW_APPLICANT:
      return require('../../assets/data/PaymentFlow/FirstTimerNDirectPlacement.json');
    case DIRECT_PLACEMENT:
      return require('../../assets/data/PaymentFlow/FirstTimerNDirectPlacement.json');
    case RETURN_TO_CAMP:
      return require('../../assets/data/PaymentFlow/Returner.json');
    default:
      return require('../../assets/data/PaymentFlow/FirstTimerNDirectPlacement.json');
  }
};

export { getPaymentFlow };
