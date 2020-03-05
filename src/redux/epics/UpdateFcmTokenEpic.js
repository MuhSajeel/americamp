/* eslint-disable no-console */
/* eslint-disable camelcase */
 
import { switchMap, filter } from 'rxjs/operators';

import { inputChanged as isSavedCardDetails } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  UNKNOWN_ERROR_MSG,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  LOGIN_SUCCESS,
  UPDATE_FCM_SUCCESS,
  UPDATE_FCM_FAILURE,
  PUSH_NOTIFICATIONS,
} from '../../constants';
import { getFcmToken } from '../../helpers/FireBase/FCM/getFcmToken';
import { getItem } from '../../helpers/Localstorage/Localstorage';

export class UpdateFcmTokenEpic {
  static updateFcmTokenEpic = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case LOGIN_SUCCESS:
            return true;
          case PUSH_NOTIFICATIONS:
            return true;
          case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async () => {
        try {
          const token = { fcm_token: '' };
          const tokenKey = await getItem('tokenKey');
          let fcmtoken = '';
          if (!tokenKey) fcmtoken = await getFcmToken();
          token.fcm_token = fcmtoken;
          const response = await RestClient.post(API_ENDPOINTS.UPDATE_FCM_TOKEN, {
            fcm_token: token.fcm_token,
          });
          console.log(response);
          const { status, data: resObj, problem } = response;
          if (status && resObj && (status === 200 || status === 201)) {
            return isSavedCardDetails(resObj, UPDATE_FCM_SUCCESS);
            // eslint-disable-next-line no-else-return
          } else if (status && resObj && status === 512) {
            //   // Alert.alert('Something went wrong, Contact Admin');
            return isSavedCardDetails(null, UPDATE_FCM_FAILURE);
          } else if (problem) {
            return isSavedCardDetails(null, UPDATE_FCM_FAILURE);
          } else {
            return isSavedCardDetails(null, UPDATE_FCM_FAILURE);
          }
        } catch (error) {
          console.log('Sign Up Unknown Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return isSavedCardDetails(null, UPDATE_FCM_FAILURE);
        }
      })
    );
}
