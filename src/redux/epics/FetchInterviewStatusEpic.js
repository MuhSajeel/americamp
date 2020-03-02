import { Alert } from 'react-native';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged, fetchInterviewStatusFailuure } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  INTERVIEW_STATUS_CHANGED,
  FETCH_INTERVIEW_STATUS,
  INTERVIEW_NAV,
  SETUP_INTERVIEWS,
} from '../../constants';
import NavigationService from '../../navigator/Navigation';

export class FetchInterviewStatusEpic {
  static fetchInterviewStatus = action$ =>
    action$.pipe(
      ofType(FETCH_INTERVIEW_STATUS),
      switchMap(async ({ payload }) => {
        try {
          const response = await RestClient.get(API_ENDPOINTS.FETCH_INTERVIEW_STATUS, payload);
          const { status, data: resObj } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              if (resObj.data.status === 1) NavigationService.navigate(INTERVIEW_NAV);
              else NavigationService.navigate(SETUP_INTERVIEWS);
              return inputChanged(resObj.data.status, INTERVIEW_STATUS_CHANGED);
            }
            Alert.alert(NETWORK_ERROR_MSG, 'Unable to fetch interview Status');
            return fetchInterviewStatusFailuure();
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              Alert.alert(resObj.msg);
              return fetchInterviewStatusFailuure();
            }
            Alert.alert(NETWORK_ERROR_MSG, 'Unable to fetch interview Status');
            return fetchInterviewStatusFailuure();
          }
          if (response.problem && response.problem === NETWORK_ERROR_MSG) {
            Alert.alert(NETWORK_ERROR_MSG, 'Unable to fetch interview Status');
            return fetchInterviewStatusFailuure();
          }
          Alert.alert(ERROR_MSG);
          return fetchInterviewStatusFailuure();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Profile Info Unknown Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return fetchInterviewStatusFailuure();
        }
      })
    );
}
