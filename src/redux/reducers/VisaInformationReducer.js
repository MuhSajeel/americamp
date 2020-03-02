import { VisaInformation } from '../state/initial';
import {
  COUNTRY_OF_LEGAL_RESIDENCE_ACTION,
  J1_CAMP_COUNSELOR_VISAS_ACTION,
  J1_SUMMER_WORK_VISAS_ACTION,
  VISA_TYPES_ACTION,
  HAVE_VISA_DENIAL_ACTION,
  VISA_DENIAL_DETAILS_ACTION,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';

export default (state = { ...VisaInformation }, { type, payload }) => {
  switch (type) {
    case COUNTRY_OF_LEGAL_RESIDENCE_ACTION:
      return { ...state, country_of_legal_residence: payload };
    case J1_CAMP_COUNSELOR_VISAS_ACTION:
      return { ...state, number_of_j1_visas: payload };
    case J1_SUMMER_WORK_VISAS_ACTION:
      return { ...state, j1_summer_work_visas: payload };
    case VISA_TYPES_ACTION:
      return { ...state, previous_visa_details: payload };
    case HAVE_VISA_DENIAL_ACTION:
      return { ...state, us_visa_denial: payload };
    case VISA_DENIAL_DETAILS_ACTION:
      return { ...state, visa_denial_detail: payload };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...payload.visa_informations };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...payload.visa_informations };
    default:
      return state;
  }
};
