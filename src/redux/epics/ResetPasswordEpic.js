import { Alert } from 'react-native';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  SUBMIT_RESET_PASSWORD,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  SETTINGS,
} from '../../constants';
import { resetPasswordSuccess, resetPasswordFailure } from '../actions/ResetPasswordActions';
import { errorMessage, successMessage } from '../../helpers/MessageAlert';
import NavigationService from '../../navigator/Navigation';

export class ResetPasswordEpic {
  static ResetPassword = action$ =>
    action$.pipe(
      ofType(SUBMIT_RESET_PASSWORD),
      switchMap(async ({ payload }) => {
        try {
          const response = await RestClient.post(API_ENDPOINTS.RESET_PASSWORD, {
            current_password: payload.oldPassword,
            new_password: payload.newPassword,
          });
          const { status, data: resObj } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              successMessage(response.data.msg);
              NavigationService.navigate(SETTINGS);
              return resetPasswordSuccess(response);
            }
            return resetPasswordFailure();
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              return resetPasswordFailure();
            }
            return resetPasswordFailure();
          }
          if (response.problem && response.problem === NETWORK_ERROR_MSG) {
            return resetPasswordFailure();
          }
          errorMessage(response.data.msg);
          return resetPasswordFailure();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return resetPasswordFailure();
        }
      })
    );
}
