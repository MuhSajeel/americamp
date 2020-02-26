import { Alert } from 'react-native';
import { switchMap, filter } from 'rxjs/operators';

import { fetchUserProfileSuccess, fetchUserProfileFailure, logoutAction } from '../actions';
import { getItem, setItem } from '../../helpers/Localstorage';
import {
  FETCH_USER_PROFILE,
  API_ENDPOINTS,
  DATA_NOT_SYNCED_MSG,
  NETWORK_ERROR_MSG,
  NETWORK_DATA_ERROR_MSG,
  INFO_SUBMIT_SUCCESS,
  STAGE_ZERO_SUBMIT_SUCCESS,
} from '../../constants';
import { RestClient } from '../../network/RestClient';

export class FetchUserProfileEpic {
  static fetchUserProfile = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case FETCH_USER_PROFILE:
            return true;
          case STAGE_ZERO_SUBMIT_SUCCESS:
            return true;
          case INFO_SUBMIT_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async () => {
        try {
          let localData = await getItem('@userProfile');
          if (localData) {
            localData = JSON.parse(localData);
            const { token } = localData;
            if (token) {
              RestClient.setHeader('Authorization', `${token}`);
            }
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
                return fetchUserProfileSuccess(newData);
              }
              Alert.alert(NETWORK_DATA_ERROR_MSG);
              return fetchUserProfileSuccess(localData);
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
              return fetchUserProfileSuccess(localData);
            }
            if (problem && problem === NETWORK_ERROR_MSG) {
              Alert.alert(NETWORK_DATA_ERROR_MSG);
              return fetchUserProfileSuccess(localData);
            }
            Alert.alert(DATA_NOT_SYNCED_MSG);
            return fetchUserProfileSuccess(localData);
          }
          return fetchUserProfileSuccess(localData);
        } catch (error) {
          return fetchUserProfileFailure('Error in fetching Data', error);
        }
      })
    );
}
