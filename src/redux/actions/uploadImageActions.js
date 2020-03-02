import {
  ON_DOCUMENT_UPLOAD,
  ON_DOCUMENT_UPLOAD_SUCCESS,
  ON_DOCUMENT_UPLOAD_FAILURE,
} from '../../constants';

export const uploadImageAction = payload => ({
  type: ON_DOCUMENT_UPLOAD,
  payload,
});

export const uploadImageActionSuccess = payload => ({
  type: ON_DOCUMENT_UPLOAD_SUCCESS,
  payload,
});

export const uploadImageActionFailure = payload => ({
  type: ON_DOCUMENT_UPLOAD_FAILURE,
  payload,
});
