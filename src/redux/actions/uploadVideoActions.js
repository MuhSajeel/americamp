import {
  ON_DOCUMENT_UPLOAD_SUCCESS,
  ON_DOCUMENT_UPLOAD,
  ON_DOCUMENT_UPLOAD_FAILURE,
} from '../../constants';

export const uploadVideoAction = paylaod => ({ type: ON_DOCUMENT_UPLOAD, paylaod });

export const uploadVideoSuccess = paylaod => ({ type: ON_DOCUMENT_UPLOAD_SUCCESS, paylaod });

export const uploadVideoFailure = paylaod => ({ type: ON_DOCUMENT_UPLOAD_FAILURE, paylaod });
