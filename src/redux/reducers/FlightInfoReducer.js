/* eslint-disable camelcase */
import {
  OUTBOUND_DEPARTURE_CHANGED,
  OUTBOUND_AIRLINE_CHANGED,
  OUTBOUND_FLIGHT_CHANGED,
  INBOUND_DEPARTURE_CHANGED,
  INBOUND_AIRLINE_CHANGED,
  INBOUND_FLIGHT_CHANGED,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  FETCH_USER_PROFILE_SUCCESS,
} from '../../constants';

import { USER_PROFILE } from '../state/initial/UserProfile';

export default (state = USER_PROFILE.flight_info, action) => {
  switch (action.type) {
    case OUTBOUND_DEPARTURE_CHANGED:
      return { ...state, outbound_departure: action.payload };
    case OUTBOUND_AIRLINE_CHANGED:
      return { ...state, outbound_airline: action.payload };
    case OUTBOUND_FLIGHT_CHANGED:
      return { ...state, outbound_flight: action.payload };
    case INBOUND_DEPARTURE_CHANGED:
      return { ...state, inbound_departure: action.payload };
    case INBOUND_AIRLINE_CHANGED:
      return { ...state, inbound_airline: action.payload };
    case INBOUND_FLIGHT_CHANGED:
      return { ...state, inbound_flight: action.payload };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...(action.payload.flight_info || USER_PROFILE.flight_info) };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...(action.payload.flight_info || USER_PROFILE.flight_info) };
    default:
      return state;
  }
};
