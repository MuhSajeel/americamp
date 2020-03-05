 
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged as isLoginFirstTime } from '../actions';
import {
  UNKNOWN_ERROR_MSG,
  DASHBOARD,
  LOGIN_SUCCESS,
  LOGIN_FIRST_CHECK_FAILURE,
  LOGIN_FIRST_CHECK_SUCCESS,
} from '../../constants';
//import NavigationService from '../../navigator/Navigation';
import { isApplyNowNull } from '../../helpers/isApplyNowNull';
import { setItem } from '../../helpers/Localstorage';

export class LoginFirstTimerEpic {
  static loginFirstTimerEpic = action$ =>
    action$.pipe(
      ofType(LOGIN_SUCCESS),
      switchMap(async ({ payload }) => {
        try {
          const isApplied = isApplyNowNull(payload.apply_now);
          if (!isApplied) {
            await setItem('@userIsFirstTimer', JSON.stringify({ userIsFirstTimer: true }));
            Promise.resolve();
            //NavigationService.navigate(DASHBOARD);
            return isLoginFirstTime(payload, LOGIN_FIRST_CHECK_SUCCESS);
          }
          Promise.resolve();
          //NavigationService.navigate(DASHBOARD);
          return isLoginFirstTime(payload, LOGIN_FIRST_CHECK_SUCCESS);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Login Unknown Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return isLoginFirstTime(null, LOGIN_FIRST_CHECK_FAILURE);
        }
      })
    );
}
