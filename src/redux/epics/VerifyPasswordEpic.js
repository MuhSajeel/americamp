/* eslint-disable camelcase */
 
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged } from '../actions';
import {
  API_ENDPOINTS,
  ERROR_MSG,
  NETWORK_ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  VERIFY_OLD_PASSWORD,
  VERIFY_OLD_PASSWORD_SUCCESS,
  VERIFY_OLD_PASSWORD_FAILURE,
  NEW_PASSWORD_SCREEN,
} from '../../constants';
//import NavigationService from '../../navigator/Navigation';
import { RestClient } from '../../network/RestClient';

export class VerifyPasswordEpic {
  static verifyPassword = action$ =>
    action$.pipe(
      ofType(VERIFY_OLD_PASSWORD),
      switchMap(async ({ payload: { email, password, data } }) => {
        try {
          const response = await RestClient.post(API_ENDPOINTS.VERIFY_OLD_PASSWORD, {
            email,
            password,
          });
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              //NavigationService.navigate(NEW_PASSWORD_SCREEN, data);
              return inputChanged({}, VERIFY_OLD_PASSWORD_SUCCESS);
            }
            // Alert.alert(NETWORK_ERROR_MSG);
            return inputChanged({}, VERIFY_OLD_PASSWORD_FAILURE);
          }
          if (status && (status === 401 || status === 400 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              // Alert.alert(resObj.msg);
              return inputChanged({}, VERIFY_OLD_PASSWORD_FAILURE);
            }
            // Alert.alert(NETWORK_ERROR_MSG);
            return inputChanged({}, VERIFY_OLD_PASSWORD_FAILURE);
          }
          if (problem && problem === NETWORK_ERROR_MSG) {
            // Alert.alert(NETWORK_ERROR_MSG);
            return inputChanged({}, VERIFY_OLD_PASSWORD_FAILURE);
          }
          // Alert.alert(ERROR_MSG);

          return inputChanged({}, VERIFY_OLD_PASSWORD_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Login Unknown Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return inputChanged({}, VERIFY_OLD_PASSWORD_FAILURE);
        }
      })
    );
}
