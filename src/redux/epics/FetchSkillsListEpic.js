/* eslint-disable camelcase */
import { Alert } from 'react-native';
import { switchMap, filter } from 'rxjs/operators';

import { inputChanged as isApplyNowFetched } from '../actions';
import { RestClient } from '../../network/RestClient';
import {
  API_ENDPOINTS,
  UNKNOWN_ERROR_MSG,
  FETCH_SKILLS_LIST_FAILURE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_SKILLS_LIST_SUCCESS,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  CAMP_COUNSELOR_ROLE,
} from '../../constants';

export class FetchSkillsListEpic {
  static fetchSkillsListEpic = action$ =>
    action$.pipe(
      filter(({ type }) => {
        switch (type) {
          case FETCH_USER_PROFILE_SUCCESS:
            return true;
          case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
            return true;
          default:
            return false;
        }
      }),
      switchMap(async ({ payload: { apply_now: { role } } }) => {
        try {
          if (role) {
            const response = await RestClient.get(
              role === CAMP_COUNSELOR_ROLE ? API_ENDPOINTS.SKILLS_LIST : API_ENDPOINTS.ROLES_LIST
            );
            const { status, data: resObj, problem } = response;
            if (status && status === 200) {
              if (resObj) {
                let { data } = resObj;
                if (role === CAMP_COUNSELOR_ROLE) data = parseSkillsData(data);
                return isApplyNowFetched(data, FETCH_SKILLS_LIST_SUCCESS);
              }
              return isApplyNowFetched(null, FETCH_SKILLS_LIST_FAILURE);
            }
            if (status && status === 512) {
              return isApplyNowFetched(null, FETCH_SKILLS_LIST_FAILURE);
            }
            if (problem) {
              return isApplyNowFetched(null, FETCH_SKILLS_LIST_FAILURE);
            }
            return isApplyNowFetched(null, FETCH_SKILLS_LIST_FAILURE);
          }
          return isApplyNowFetched(null, FETCH_SKILLS_LIST_FAILURE);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Fetch Error', error);
          Alert.alert(UNKNOWN_ERROR_MSG);
          return isApplyNowFetched(null, FETCH_SKILLS_LIST_FAILURE);
        }
      })
    );
}

const parseSkillsData = data => {
  const structuredList = [];
  data.forEach(obj => {
    if (obj.parent_id === 0) {
      structuredList.push({ ...obj, sub_categories: [] });
    }
  });
  data.forEach(obj => {
    if (obj.parent_id !== 0) {
      structuredList[structuredList.findIndex(val => val.id === obj.parent_id)].sub_categories.push(
        obj
      );
    }
  });
  return { skillsList: structuredList.slice() };
};
