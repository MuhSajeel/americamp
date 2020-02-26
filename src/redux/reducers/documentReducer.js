/* eslint-disable camelcase */
import * as CONSTANTS from '../../constants';
import { USER_PROFILE } from '../state/initial/UserProfile';

const DOCUMENTS_INITIAL_STATE = USER_PROFILE.documents;

export default (state = DOCUMENTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.PHOTOGRAPH_UPLOAD_CHANGED || CONSTANTS.UPLOAD_IMAGE_SUCCESS:
      return { ...state, photograph_upload: action.payload };
    case CONSTANTS.POLICE_BACKGROUND_CHANGED:
      return { ...state, police_background_check: action.payload };
    case CONSTANTS.CAMP_CONTRACT_CHANGED:
      return { ...state, camp_contract: action.payload };
    case CONSTANTS.PASSPORT_CHANGED:
      return { ...state, passport: action.payload };
    case CONSTANTS.PROOF_OF_STUDENT_STATUS_CHANGED:
      return { ...state, proof_of_student_status: action.payload };
    case CONSTANTS.VIDEO_CHANGED:
      return { ...state, video: action.payload };
    case CONSTANTS.PHOTO_ALBUM_CHANGED:
      return { ...state, photo_album: action.payload };
    case CONSTANTS.OTHER_DOCUMENTS_CHANGED:
      return { ...state, documents: action.payload };
    case CONSTANTS.HEALTH_HISTORY_FORM_CHANGED:
      return { ...state, health_history_form: action.payload };
    case CONSTANTS.FETCH_USER_PROFILE_SUCCESS:
      return { ...state, ...action.payload.documents };
    case CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, ...action.payload.documents };
    default:
      return state;
  }
};
