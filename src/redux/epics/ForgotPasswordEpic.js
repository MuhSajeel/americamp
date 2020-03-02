/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { forgotPasswordSuccess, forgotPasswordFailure } from '../actions';
import {
  API_ENDPOINTS,
  ERROR_MSG,
  NETWORK_ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  FORGOT_PASSWORD,
} from '../../constants';
import { RestClient } from '../../network/RestClient';

export class ForgotPasswordEpic {
  static forgotPassword = action$ =>
    action$.pipe(
      ofType(FORGOT_PASSWORD),
      switchMap(async ({ payload: { email } }) => {
        try {
          const response = await RestClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              Alert.alert(resObj.msg);
              return forgotPasswordSuccess(resObj.data);
            }
            Alert.alert(NETWORK_ERROR_MSG);
            return forgotPasswordFailure();
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              Alert.alert(resObj.msg);
              return forgotPasswordFailure();
            }
            Alert.alert(NETWORK_ERROR_MSG);
            return forgotPasswordFailure();
          }
          if (problem && problem === NETWORK_ERROR_MSG) {
            Alert.alert(NETWORK_ERROR_MSG);
            return forgotPasswordFailure();
          }
          Alert.alert(ERROR_MSG);

          return forgotPasswordFailure();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Login Unknown Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return forgotPasswordFailure();
        }
      })
    );
}
