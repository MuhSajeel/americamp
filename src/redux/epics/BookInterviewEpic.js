import { Alert } from 'react-native';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged, bookInterviewFailure } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  BOOK_INTERVIEW,
  DASHBOARD,
  INTERVIEW_STATUS_CHANGED,
} from '../../constants';
import NavigationService from '../../navigator/Navigation';

export class BookInterviewEpic {
  static bookInterview = action$ =>
    action$.pipe(
      ofType(BOOK_INTERVIEW),
      switchMap(async ({ payload }) => {
        try {
          const response = await RestClient.put(API_ENDPOINTS.BOOK_INTERVIEW, payload);
          const { status, data: resObj } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              NavigationService.navigate(DASHBOARD);
              return inputChanged(resObj.data.status, INTERVIEW_STATUS_CHANGED);
            }

            return bookInterviewFailure();
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              return bookInterviewFailure();
            }

            return bookInterviewFailure();
          }
          if (response.problem && response.problem === NETWORK_ERROR_MSG) {
            return bookInterviewFailure();
          }

          return bookInterviewFailure();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Profile Info Unknown Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return bookInterviewFailure();
        }
      })
    );
}
