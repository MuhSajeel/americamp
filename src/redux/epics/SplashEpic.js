import { Alert } from 'react-native';
import { switchMap, filter } from 'rxjs/operators';

import { inputChanged as isLoginFirstTime, onSplashActionFinish } from '../actions';
import {
  UNKNOWN_ERROR_MSG,
  DASHBOARD,
  LOGIN_FIRST_CHECK_FAILURE,
  LOGIN_NAV,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_FAILURE,
  LOGIN_FIRST_CHECK_SUCCESS,
} from '../../constants';
import NavigationService from '../../navigator/Navigation';
import { getAllKeys, getItem, removeItem } from '../../helpers/Localstorage';
import { RestClient } from '../../network/RestClient';
import { isApplyNowNull } from '../../helpers/isApplyNowNull';
// import { isApplyNowNull } from '../../helpers/isApplyNowNull';

export class SplashEpic {
  static splashScreenEpic = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
            return true;
          case FETCH_USER_PROFILE_ON_BOARDING_FAILURE:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async () => {
        try {
          const dataExists = await getAllKeys();
          if (dataExists) {
            let data = await getItem('@userProfile');
            data = JSON.parse(data);
            if (data && data.apply_now) {
              const isApplied = isApplyNowNull(data.apply_now);
              if (isApplied) {
                await removeItem('@userIsFirstTimer');
              }
            }
            if (data && data.token) {
              RestClient.setHeader('Authorization', `${data.token}`);
            }
            if (data && data.token) {
              NavigationService.navigate(DASHBOARD, { fromOnBoarding: true });
            } else NavigationService.navigate(LOGIN_NAV);
          }
          // eslint-disable-next-line no-unused-vars
          const pr = Promise.resolve();
          return onSplashActionFinish();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Login Unknown Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return isLoginFirstTime(null, LOGIN_FIRST_CHECK_FAILURE);
        }
      })
    );
}
