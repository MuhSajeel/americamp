import * as CONSTANTS from '../../constants';
import { USER_PROFILE } from '../state/initial/UserProfile';

const PERSONAL_INFO_INITIAL_STATE = USER_PROFILE.personal_info;

export default (state = PERSONAL_INFO_INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.PERSONAL_INFO_CHANGED:
      return action.payload;
    case CONSTANTS.FNAME_CHANGED:
      return { ...state, first_name: action.payload };
    case CONSTANTS.MNAME_CHANGED:
      return { ...state, middle_name: action.payload };
    case CONSTANTS.LNAME_CHANGED:
      return { ...state, last_name: action.payload };
    case CONSTANTS.GENDER_CHANGED:
      return { ...state, gender: action.payload };
    case CONSTANTS.COC_CHANGED:
      return { ...state, citizenship: action.payload };
    case CONSTANTS.DOB_CHANGED:
      return { ...state, dob: action.payload };
    case CONSTANTS.AL1_CHANGED:
      return { ...state, address_line1: action.payload };
    case CONSTANTS.AL2_CHANGED:
      return { ...state, address_line2: action.payload };
    case CONSTANTS.CITY_CHANGED:
      return { ...state, town_city: action.payload };
    case CONSTANTS.STATE_CHANGED:
      return { ...state, county_state: action.payload };
    case CONSTANTS.POSTCODE_CHANGED:
      return { ...state, postcode: action.payload };
    case CONSTANTS.COUNTRY_CHANGED:
      return { ...state, country: action.payload };
    case CONSTANTS.DTSW_CHANGED:
      return { ...state, start_date: action.payload };
    case CONSTANTS.DTEW_CHANGED:
      return { ...state, end_date: action.payload };
    case CONSTANTS.CNUMBER_CHANGED:
      return { ...state, contact_number: action.payload };
    case CONSTANTS.CITY_OF_BIRTH_CHANGED:
      return { ...state, city_of_birth: action.payload };
    case CONSTANTS.COUNTRY_OF_BIRTH_CHANGED:
      return { ...state, country_of_birth: action.payload };
    case CONSTANTS.DRIVING_LICENSE_CHANGED:
      return { ...state, driving_license: action.payload };
    case CONSTANTS.SKYPE_NAME_CHANGED:
      return { ...state, skype_name: action.payload };
    case CONSTANTS.TNUMBER_CHANGED:
      return { ...state, mailing_address: action.payload };
    case CONSTANTS.TDIAL_CODE_CHANGED:
      return { ...state, telephone_dial_code: action.payload };
    case CONSTANTS.MNUMBER_CHANGED:
      return { ...state, mobile_number: action.payload };
    case CONSTANTS.MDIAL_CODE_CHANGED:
      return { ...state, mobile_dial_code: action.payload };
    case CONSTANTS.SOCIAL_LINKS_CHANGED:
      return { ...state, social_media_links: action.payload };
    case CONSTANTS.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload.personal_info,
        social_media_links:
          action.payload.personal_info.social_media_links ||
          'Instagram: @AmeriCamp \nFacebook: @AmeriCamp \nTwitter: @AmeriCamp'
      };

    case CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return {
        ...state,
        ...action.payload.personal_info,
        social_media_links:
          action.payload.personal_info.social_media_links ||
          'Instagram: @AmeriCamp \nFacebook: @AmeriCamp \nTwitter: @AmeriCamp'
      };
    default:
      return state;
  }
};
