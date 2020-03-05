/* eslint-disable camelcase */
 
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { inputChanged as isStageZeroSubmitted } from '../actions';
import { removeItem } from '../../helpers/Localstorage';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  NETWORK_ERROR_MSG,
  UNKNOWN_ERROR_MSG,
  YOUR_PROFILE_NAV,
  STAGE_ZERO_SUBMIT,
  STAGE_ZERO_SUBMIT_SUCCESS,
  STAGE_ZERO_SUBMIT_FAILURE,
} from '../../constants';
//import NavigationService from '../../navigator/Navigation';

export class StageZeroEpic {
  static stageZero = action$ =>
    action$.pipe(
      ofType(STAGE_ZERO_SUBMIT),
      switchMap(async ({ payload: { apply_now } }) => {
        try {
          const response = await RestClient.post(API_ENDPOINTS.APPLY_NOW, { apply_now });
          const { status, data: resObj, problem } = response;
          if (status && status === 200) {
            if (resObj && resObj.success) {
              await removeItem('@userIsFirstTimer');
              //NavigationService.navigate(YOUR_PROFILE_NAV);
              return isStageZeroSubmitted({ apply_now }, STAGE_ZERO_SUBMIT_SUCCESS);
            }
            return isStageZeroSubmitted({ apply_now }, STAGE_ZERO_SUBMIT_FAILURE);
          }
          if (status && (status === 401 || status === 422 || status === 512)) {
            if (resObj && !resObj.success) {
              return isStageZeroSubmitted({ apply_now }, STAGE_ZERO_SUBMIT_FAILURE);
            }
            return isStageZeroSubmitted({ apply_now }, STAGE_ZERO_SUBMIT_FAILURE);
          }
          if (problem && problem === NETWORK_ERROR_MSG) {
            return isStageZeroSubmitted({ apply_now }, STAGE_ZERO_SUBMIT_FAILURE);
          }
          return isStageZeroSubmitted({ apply_now }, STAGE_ZERO_SUBMIT_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Apply Now Unknown Error', error);
          // Alert.alert(UNKNOWN_ERROR_MSG);
          return isStageZeroSubmitted({ apply_now }, STAGE_ZERO_SUBMIT_FAILURE);
        }
      })
    );
}
