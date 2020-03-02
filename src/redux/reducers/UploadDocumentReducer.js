import {
  ON_DOCUMENT_UPLOAD,
  ON_DOCUMENT_UPLOAD_SUCCESS,
  ON_DOCUMENT_UPLOAD_FAILURE,
} from '../../constants';

export default (state = { uploading: false, progress: 0, location: null }, { type, payload }) => {
  switch (type) {
    case ON_DOCUMENT_UPLOAD:
      return { ...state, uploading: true };
    case ON_DOCUMENT_UPLOAD_SUCCESS:
      return { ...state, uploading: false, location: payload };
    case ON_DOCUMENT_UPLOAD_FAILURE:
      return { ...state, uploading: false };
    default:
      return state;
  }
};
