import {
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
} from '../../constants';
import { USER_PROFILE } from '../state/initial/UserProfile';
import { EmergencyContact } from '../state/initial';

export default (state = JSON.parse(JSON.stringify(USER_PROFILE)), action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_SUCCESS: {
      const data = action.payload;
      data.emergency_contact.contact.address = action.payload.emergency_contact.contact.address
        ? action.payload.emergency_contact.contact.address
        : EmergencyContact.contact.address;
      data.emergency_contact.next_of_kin.address = action.payload.emergency_contact.next_of_kin
        .address
        ? action.payload.emergency_contact.next_of_kin.address
        : EmergencyContact.next_of_kin.address;
      return { ...state, ...data };
    }
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS: {
      const data = action.payload;
      data.emergency_contact.contact.address = action.payload.emergency_contact.contact.address
        ? action.payload.emergency_contact.contact.address
        : EmergencyContact.contact.address;
      data.emergency_contact.next_of_kin.address = action.payload.emergency_contact.next_of_kin
        .address
        ? action.payload.emergency_contact.next_of_kin.address
        : EmergencyContact.next_of_kin.address;
      return { ...state, ...data };
    }
    default:
      return state;
  }
};
