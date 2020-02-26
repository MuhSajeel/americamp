import { Alert } from 'react-native';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import {
  logoutAction,
  fetchUserProfileSuccessOnBoarding,
  fetchUserProfileSuccessOnBoardingFailure,
} from '../actions';
import { getItem, setItem } from '../../helpers/Localstorage';
import {
  DASHBOARD,
  API_ENDPOINTS,
  DATA_NOT_SYNCED_MSG,
  NETWORK_ERROR_MSG,
  NETWORK_DATA_ERROR_MSG,
  FETCH_USER_PROFILE_ON_BOARDING,
} from '../../constants';
import { RestClient } from '../../network/RestClient';

export class FetchUserProfileFromOnBoardingEpic {
  static fetchUserProfileFromOnBoardingEpic = action$ =>
    action$.pipe(
      ofType(FETCH_USER_PROFILE_ON_BOARDING),
      switchMap(async ({ payload: { callingRoute } }) => {
        try {
          let localData = await getItem('@userProfile');
          if (localData) {
            localData = JSON.parse(localData);
            const { token } = localData;
            if (token) {
              RestClient.setHeader('Authorization', `${token}`);
            }
            if (callingRoute === DASHBOARD) {
              const response = await RestClient.get(API_ENDPOINTS.FETCH_PROFILE);
              const { status, data: resObj, problem } = response;
              if (status && status === 200) {
                const { data } = resObj;
                if (resObj && resObj.success) {
                  let newData = data;
                  newData = {
                    ...newData,
                    ...{
                      id: localData.id,
                      token: localData.token,
                      apply_now: localData.apply_now || null,
                    },
                  };
                  await setItem('@userProfile', JSON.stringify(newData));
                  return fetchUserProfileSuccessOnBoarding(localData);
                }
                Alert.alert(NETWORK_DATA_ERROR_MSG);
                return fetchUserProfileSuccessOnBoarding(localData);
              }
              if (status && (status === 401 || status === 422 || status === 512)) {
                if (
                  resObj.msg === 'Signature verification raised' ||
                  resObj.msg === 'Not enough or too many segments' ||
                  resObj.msg === 'Invalid token.'
                ) {
                  Alert.alert(resObj.msg, 'Logging you out!');
                  return logoutAction();
                }
                Alert.alert(resObj.msg);
                return fetchUserProfileSuccessOnBoarding(localData);
              }
              if (problem && problem === NETWORK_ERROR_MSG) {
                Alert.alert(NETWORK_DATA_ERROR_MSG);
                return fetchUserProfileSuccessOnBoarding(localData);
              }
              Alert.alert(DATA_NOT_SYNCED_MSG);
              return fetchUserProfileSuccessOnBoarding(localData);
            }
            return fetchUserProfileSuccessOnBoarding(localData);
          }
          return fetchUserProfileSuccessOnBoardingFailure('No Data available');
        } catch (error) {
          return fetchUserProfileSuccessOnBoardingFailure('Error in fetching Data', error);
        }
      })
    );
}
