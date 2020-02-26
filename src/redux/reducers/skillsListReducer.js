/* eslint-disable camelcase */
import { FETCH_SKILLS_LIST_SUCCESS } from '../../constants';

import { SkillsList } from '../state/initial';

export default (state = { skillsList: SkillsList.slice() }, action) => {
  switch (action.type) {
    case FETCH_SKILLS_LIST_SUCCESS:
      return { ...state, skillsList: action.payload.skillsList || action.payload };
    default:
      return state;
  }
};
