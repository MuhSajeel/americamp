import * as CONSTANTS from '../../constants';
import { EmergencyContact } from '../state/initial';

export default (state = { ...EmergencyContact }, action) => {
  switch (action.type) {
    case CONSTANTS.CONTACT_NAME_CHANGED: {
      const ecName = state.contact;
      ecName.info.contact_name = action.payload;
      return { ...state, ecName };
    }
    case CONSTANTS.RELATIONSHIP_TO_PARTICIPANT_CHANGED: {
      const ecRelation = state.contact;

      ecRelation.info.relationship = action.payload;
      return { ...state, ecRelation };
    }
    case CONSTANTS.CONTACT_NUMBER_CHANGED: {
      const ecContact = state.contact;
      ecContact.info.contact_number = action.payload;
      return { ...state, ecContact };
    }

    case CONSTANTS.CONTACT_TYPE_CHANGED: {
      const ecCtype = state.contact;
      ecCtype.info.contact_type = action.payload;
      return { ...state, contact: ecCtype };
    }
    case CONSTANTS.HOME_PHONE_CHANGED: {
      const ecHomePhone = state.contact;
      ecHomePhone.info.home_phone = action.payload;
      return { ...state, contact: ecHomePhone };
    }
    case CONSTANTS.HOME_DIAL_CODE_CHANGED: {
      const ecDialCode = state.contact;
      ecDialCode.info.home_dial_code = action.payload;
      return { ...state, contact: ecDialCode };
    }
    case CONSTANTS.MOBILE_NUMBER_CHANGED: {
      const ecMobileNumber = state.contact;
      ecMobileNumber.info.mobile_number = action.payload;
      return { ...state, contact: ecMobileNumber };
    }
    case CONSTANTS.MOBILE_DIAL_CODE_CHANGED: {
      const ecMobileDialCode = state.contact;
      ecMobileDialCode.info.mobile_dial_code = action.payload;
      return { ...state, contact: ecMobileDialCode };
    }
    case CONSTANTS.CONTACT_EMAIL_CHANGED: {
      const ecContactEmail = state.contact;
      ecContactEmail.info.contact_email = action.payload;
      return { ...state, contact: ecContactEmail };
    }

    case CONSTANTS.ADDRESS1_CHANGED: {
      const ecAddress1 = state.contact;
      ecAddress1.address.address_line1 = action.payload;

      return { ...state, contact: ecAddress1 };
    }

    case CONSTANTS.ADDRESS2_CHANGED: {
      const ecAddress2 = state.contact;
      ecAddress2.address.address_line2 = action.payload;
      return { ...state, contact: ecAddress2 };
    }
    case CONSTANTS.ECTOWN_CHANGED: {
      const ecTown = state.contact;
      ecTown.address.town = action.payload;
      return { ...state, contact: ecTown };
    }

    case CONSTANTS.ECSTATE_CHANGED: {
      const ecState = state.contact;
      ecState.address.state = action.payload;

      return { ...state, contact: ecState };
    }
    case CONSTANTS.ECCOUNTRY_CHANGED: {
      const ecCountry = state.contact;
      ecCountry.address.country = action.payload;
      return { ...state, contact: ecCountry };
    }

    case CONSTANTS.ECPOSTCODE_CHANGED: {
      const ecPostcode = state.contact;
      ecPostcode.address.postcode = action.payload;
      return { ...state, contact: ecPostcode };
    }
    case CONSTANTS.ECCITY_CHANGED: {
      const ecCity = state.contact;
      ecCity.address.city = action.payload;
      return { ...state, contact: ecCity };
    }

    //  KIN DETAILS SSSSSSSSSS

    case CONSTANTS.KIN_CONTACT_NAME_CHANGED: {
      const knName = state.next_of_kin;
      knName.info.contact_name = action.payload;
      return { ...state, next_of_kin: knName };
    }
    case CONSTANTS.KIN_RELATIONSHIP_TO_PARTICIPANT_CHANGED: {
      const knRelation = state.next_of_kin;

      knRelation.info.relationship = action.payload;
      return { ...state, next_of_kin: knRelation };
    }
    case CONSTANTS.KIN_CONTACT_NUMBER_CHANGED: {
      const knContact = state.next_of_kin;
      knContact.info.contact_number = action.payload;
      return { ...state, next_of_kin: knContact };
    }

    case CONSTANTS.KIN_CONTACT_TYPE_CHANGED: {
      const knCtype = state.next_of_kin;
      knCtype.info.contact_type = action.payload;
      return { ...state, next_of_kin: knCtype };
    }

    case CONSTANTS.KIN_HOME_PHONE_CHANGED: {
      const kinHomePhone = state.next_of_kin;
      kinHomePhone.info.home_phone = action.payload;
      return { ...state, next_of_kin: kinHomePhone };
    }
    case CONSTANTS.KIN_HOME_DIAL_CODE_CHANGED: {
      const kinDialCode = state.next_of_kin;
      kinDialCode.info.home_dial_code = action.payload;
      return { ...state, next_of_kin: kinDialCode };
    }

    case CONSTANTS.KIN_MOBILE_NUMBER_CHANGED: {
      const kinMobileNumber = state.next_of_kin;
      kinMobileNumber.info.mobile_number = action.payload;
      return { ...state, next_of_kin: kinMobileNumber };
    }
    case CONSTANTS.KIN_MOBILE_DIAL_CODE_CHANGED: {
      const kinMobileDialCode = state.next_of_kin;
      kinMobileDialCode.info.mobile_dial_code = action.payload;
      return { ...state, next_of_kin: kinMobileDialCode };
    }
    case CONSTANTS.KIN_CONTACT_EMAIL_CHANGED: {
      const kinContactEmail = state.next_of_kin;
      kinContactEmail.info.contact_email = action.payload;
      return { ...state, next_of_kin: kinContactEmail };
    }

    case CONSTANTS.KIN_ADDRESS1_CHANGED: {
      const knAddress1 = state.next_of_kin;
      knAddress1.address.address_line1 = action.payload;

      return { ...state, next_of_kin: knAddress1 };
    }

    case CONSTANTS.KIN_ADDRESS2_CHANGED: {
      const knAddress2 = state.next_of_kin;
      knAddress2.address.address_line2 = action.payload;
      return { ...state, next_of_kin: knAddress2 };
    }
    case CONSTANTS.KIN_TOWN_CHANGED: {
      const knTown = state.next_of_kin;
      knTown.address.town = action.payload;
      return { ...state, next_of_kin: knTown };
    }

    case CONSTANTS.KIN_STATE_CHANGED: {
      const knState = state.next_of_kin;
      knState.address.state = action.payload;

      return { ...state, next_of_kin: knState };
    }
    case CONSTANTS.KIN_COUNTRY_CHANGED: {
      const knCountry = state.next_of_kin;
      knCountry.address.country = action.payload;
      return { ...state, next_of_kin: knCountry };
    }

    case CONSTANTS.KIN_POSTCODE_CHANGED: {
      const knPostcode = state.next_of_kin;
      knPostcode.address.postcode = action.payload;
      return { ...state, next_of_kin: knPostcode };
    }
    case CONSTANTS.KIN_CITY_CHANGED: {
      const knCity = state.next_of_kin;
      knCity.address.city = action.payload;
      return { ...state, next_of_kin: knCity };
    }
    case CONSTANTS.FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...action.payload.emergency_contact };
    case CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...action.payload.emergency_contact };
    default:
      return state;
  }
};
