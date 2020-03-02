/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap, filter } from 'rxjs/operators';
import Toast from 'react-native-simple-toast';

import { inputChanged } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  UNKNOWN_ERROR_MSG,
  SUBMIT_FEEDBACK,
  FETCH_FEEDBACK_SUCCESS,
  FETCH_FEEDBACK_FAILURE,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  SETTINGS,
} from '../../constants';
import NavigationService from '../../navigator/Navigation';

export class FeedbackEpic {
  static feedback = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case SUBMIT_FEEDBACK:
            return true;
          case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async ({ payload: { feedback } }) => {
        try {
          const response = feedback
            ? await RestClient.post(API_ENDPOINTS.SUBMIT_FEEDBACK, { feedback })
            : await RestClient.get(API_ENDPOINTS.FETCH_FEEDBACK);
          const { status, data: resObj } = response;
          if (status && status === 200) {
            if (resObj) {
              const { data } = resObj;
              if (feedback) {
                NavigationService.navigate(SETTINGS);
                Toast.show(resObj.msg);
              }
              return inputChanged(data, FETCH_FEEDBACK_SUCCESS);
            }
            return inputChanged(null, FETCH_FEEDBACK_FAILURE);
          }
          return inputChanged(null, FETCH_FEEDBACK_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Fetch Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return inputChanged(null, FETCH_FEEDBACK_FAILURE);
        }
      })
    );
}
