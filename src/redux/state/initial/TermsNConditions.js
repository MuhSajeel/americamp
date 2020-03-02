import { getCurrentDate } from '../../../helpers/GetCurrentDate';

export const program_agreement = {
  accept_term: null,
  name: null,
  signature: null,
  date: getCurrentDate('/'),
  parent_name: null,
  parent_sign: null,
  parent_date: getCurrentDate('/'),
  fee_initial: null,
  fee_date: getCurrentDate('/'),
  visa_initial: null,
  visa_date: getCurrentDate('/'),
  camp_initial: null,
  camp_date: getCurrentDate('/'),
  depart_initial: null,
  depart_date: getCurrentDate('/'),
  returnee_initial: null,
  returnee_date: getCurrentDate('/'),
};
