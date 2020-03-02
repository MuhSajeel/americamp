/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { loginAction, signUpFailure } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  SIGNUP,
  ACCOUNT_CREATE_MSG,
} from '../../constants';

export class SignUpEpic {
  static signUp = action$ =>
    action$.pipe(
      ofType(SIGNUP),
      switchMap(async ({ payload }) => {
        try {
          const response = await RestClient.post(API_ENDPOINTS.SIGNUP, payload);
          const { status, data: resObj, problem } = response;
          const userObj = {
            email: payload.user.email,
            password: payload.user.password,
            fetchedUserProfile: payload.user.fetchedUserProfile,
            formsStatus: payload.user.formsStatus,
          };
          if (status && status === 200) {
            if (resObj && resObj.success) {
              Alert.alert(ACCOUNT_CREATE_MSG);
              return loginAction(userObj);
            }
            Alert.alert(NETWORK_ERROR_MSG);
            return signUpFailure();
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              Alert.alert(resObj.msg);
              return signUpFailure();
            }
            Alert.alert(NETWORK_ERROR_MSG);
            return signUpFailure();
          }
          if (problem && problem === NETWORK_ERROR_MSG) {
            Alert.alert(NETWORK_ERROR_MSG);
            return signUpFailure();
          }
          Alert.alert(ERROR_MSG);
          return signUpFailure();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Sign Up Unknown Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return signUpFailure();
        }
      })
    );
}
