/* eslint-disable camelcase */
import * as CONSTANTS from '../../constants';
import { USER_PROFILE } from '../state/initial/UserProfile';

const PERSONAL_INFO_INITIAL_STATE = JSON.parse(JSON.stringify(USER_PROFILE.addresses));

export default (state = PERSONAL_INFO_INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.MA_CHANGED: {
      const { mailing_address, current_address } = state;
      mailing_address.address = JSON.parse(JSON.stringify(current_address.address));
      return { ...state, mailing_address };
    }
    case CONSTANTS.MA_REMOVED: {
      const { mailing_address } = state;
      mailing_address.address = JSON.parse(
        JSON.stringify(USER_PROFILE.addresses.mailing_address.address)
      );
      return { ...state, mailing_address };
    }
    case CONSTANTS.CA_AL1_CHANGED: {
      const { current_address } = state;
      current_address.address.address_line1 = action.payload;
      return { ...state, current_address };
    }
    case CONSTANTS.CA_AL2_CHANGED: {
      const { current_address } = state;
      current_address.address.address_line2 = action.payload;
      return { ...state, current_address };
    }
    case CONSTANTS.CA_TOWN_CHANGED: {
      const { current_address } = state;
      current_address.address.town = action.payload;
      return { ...state, current_address };
    }
    case CONSTANTS.CA_CITY_CHANGED: {
      const { current_address } = state;
      current_address.address.city = action.payload;
      return { ...state, current_address };
    }
    case CONSTANTS.CA_STATE_CHANGED: {
      const { current_address } = state;
      current_address.address.state = action.payload;
      return { ...state, current_address };
    }
    case CONSTANTS.CA_POSTCODE_CHANGED: {
      const { current_address } = state;
      current_address.address.postcode = action.payload;
      return { ...state, current_address };
    }
    case CONSTANTS.CA_COUNTRY_CHANGED: {
      const { current_address } = state;
      current_address.address.country = action.payload;
      return { ...state, current_address };
    }
    case CONSTANTS.MA_AL1_CHANGED: {
      const { mailing_address } = state;
      mailing_address.address.address_line1 = action.payload;
      return { ...state, mailing_address };
    }
    case CONSTANTS.MA_AL2_CHANGED: {
      const { mailing_address } = state;
      mailing_address.address.address_line2 = action.payload;
      return { ...state, mailing_address };
    }
    case CONSTANTS.MA_TOWN_CHANGED: {
      const { mailing_address } = state;
      mailing_address.address.town = action.payload;
      return { ...state, mailing_address };
    }
    case CONSTANTS.MA_CITY_CHANGED: {
      const { mailing_address } = state;
      mailing_address.address.city = action.payload;
      return { ...state, mailing_address };
    }
    case CONSTANTS.MA_STATE_CHANGED: {
      const { mailing_address } = state;
      mailing_address.address.state = action.payload;
      return { ...state, mailing_address };
    }
    case CONSTANTS.MA_POSTCODE_CHANGED: {
      const { mailing_address } = state;
      mailing_address.address.postcode = action.payload;
      return { ...state, mailing_address };
    }
    case CONSTANTS.MA_COUNTRY_CHANGED: {
      const { mailing_address } = state;
      mailing_address.address.country = action.payload;
      return { ...state, mailing_address };
    }
    case CONSTANTS.FETCH_USER_PROFILE_SUCCESS: {
      const { addresses } = action.payload;
      if (!addresses.current_address.address)
        addresses.current_address.address = state.current_address.address;
      if (!addresses.mailing_address.address)
        addresses.mailing_address.address = state.mailing_address.address;
      return { ...state, ...addresses };
    }
    case CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...action.payload.addresses };
    default:
      return state;
  }
};
