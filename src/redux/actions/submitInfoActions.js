import * as CONSTANTS from '../../constants';

export const infoSubmited = (
  payload,
  noRoute = null,
  route = null,
  noOverlay = null,
  deleteMsg = null
) => {
  return { type: CONSTANTS.INFO_SUBMITTED, payload, noRoute, route, noOverlay, deleteMsg };
};

export const infoSubmitSuccess = payload => {
  return { type: CONSTANTS.INFO_SUBMIT_SUCCESS, payload };
};

export const infoSubmitFailure = () => {
  return { type: CONSTANTS.INFO_SUBMIT_FAIL };
};
