import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import Toast from 'react-native-simple-toast';

import { infoSubmitSuccess, infoSubmitFailure } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  SUCCESS_MSG,
  DELETE_MSG,
  UNKNOWN_ERROR_MSG,
  INFO_SUBMITTED,
  APPLICATION_STATUS,
  DASHBOARD,
} from '../../constants';
import NavigationService from '../../navigator/Navigation';

export class SubmitInfoEpic {
  static submitInfo = action$ =>
    action$.pipe(
      ofType(INFO_SUBMITTED),
      switchMap(async ({ payload, noRoute, route, noOverlay, deleteMsg }) => {
        try {
          const response = await RestClient.post(API_ENDPOINTS.UPDATE_PROFILE, payload);
          const { status, data: resObj } = response;
          if (status && (status === 200 || status === 201)) {
            if (resObj && resObj.success) {
              Toast.show(deleteMsg ? DELETE_MSG : SUCCESS_MSG);
              if (!noRoute) {
                NavigationService.navigate(APPLICATION_STATUS);
              }
              return infoSubmitSuccess({ callingRoute: DASHBOARD, noOverlay });
            }
            Toast.show(NETWORK_ERROR_MSG);
            return infoSubmitFailure();
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              Toast.show(resObj.msg);
              return infoSubmitFailure();
            }
            Toast.show(NETWORK_ERROR_MSG);
            return infoSubmitFailure();
          }
          if (response.problem && response.problem === NETWORK_ERROR_MSG) {
            Toast.show(NETWORK_ERROR_MSG);
            return infoSubmitFailure();
          }
          Toast.show(ERROR_MSG);
          return infoSubmitFailure();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Profile Info Unknown Error', error);
          Toast.show(UNKNOWN_ERROR_MSG);
          return infoSubmitFailure();
        }
      })
    );
}
