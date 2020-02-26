/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { loginActionSuccess, loginActionFailure } from '../actions';
import { setItem } from '../../helpers/Localstorage';
import {
  LOGIN,
  API_ENDPOINTS,
  ERROR_MSG,
  NETWORK_ERROR_MSG,
  UNKNOWN_ERROR_MSG,
} from '../../constants';
import NavigationService from '../../navigator/Navigation';
import { RestClient } from '../../network/RestClient';

export class LoginEpic {
  static login = action$ =>
    action$.pipe(
      ofType(LOGIN),
      switchMap(
        async ({ payload: { email, password, route, fetchedUserProfile, formsStatus } }) => {
          try {
            const response = await RestClient.post(API_ENDPOINTS.LOGIN, {
              email,
              password,
            });
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              if (resObj && resObj.success) {
                // eslint-disable-next-line no-console
                const {
                  data: { token, id, apply_now },
                } = resObj;
                const data = fetchedUserProfile;
                data.id = id;
                data.token = token;
                data.apply_now = apply_now;
                RestClient.setHeader('Authorization', token);
                await setItem('@userProfile', JSON.stringify(data));
                setItem('@formsStatus', JSON.stringify(formsStatus));
                if (route) NavigationService.navigate(route);
                // else NavigationService.navigate(DASHBOARD);
                return loginActionSuccess(resObj.data);
              }
              Alert.alert(NETWORK_ERROR_MSG);
              return loginActionFailure();
            }
            if (status && (status === 401 || status === 422 || status === 512)) {
              if (resObj && !resObj.success) {
                Alert.alert(resObj.msg);
                return loginActionFailure();
              }
              Alert.alert(NETWORK_ERROR_MSG);
              return loginActionFailure();
            }
            if (problem && problem === NETWORK_ERROR_MSG) {
              Alert.alert(NETWORK_ERROR_MSG);
              return loginActionFailure();
            }
            Alert.alert(ERROR_MSG);

            return loginActionFailure();
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log('Login Unknown Error', error);
            Alert.alert(UNKNOWN_ERROR_MSG);
            return loginActionFailure();
          }
        }
      )
    );
}
