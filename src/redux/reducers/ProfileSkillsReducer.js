/* eslint-disable no-param-reassign */
import {
  SKILL_ONE_INPUT_CHANGE,
  SKILL_TWO_INPUT_CHANGE,
  SKILL_THREE_INPUT_CHANGE,
  SELECTED_SKILL_CHANGE,
  SELECTED_SKILL_POSITION,
  SKILL_ONE_DETAIL_INPUT_CHANGE,
  SKILL_TWO_DETAIL_INPUT_CHANGE,
  SKILL_THREE_DETAIL_INPUT_CHANGE,
  DELETE_SKILL_ACTION,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  FETCH_USER_PROFILE_SUCCESS,
} from '../../constants';

import { SkillsData } from '../state/initial';

export default (
  state = {
    skillsData: SkillsData.slice(),
    selectedSkill: { skill_id: null, parent_id: null },
    selectedSkillPosition: 0,
  },
  { type, payload }
) => {
  switch (type) {
    case SKILL_ONE_INPUT_CHANGE: {
      const skills = state.skillsData.slice();
      skills[0] = {
        ...skills[0],
        skill_id: payload.id,
        parent_id: payload.parent_id,
        name: payload.name,
      };
      return { ...state, skillsData: skills };
    }
    case SKILL_TWO_INPUT_CHANGE: {
      const skills = state.skillsData.slice();
      skills[1] = {
        ...skills[1],
        skill_id: payload.id,
        parent_id: payload.parent_id,
        name: payload.name,
      };
      return { ...state, skillsData: skills };
    }
    case SKILL_THREE_INPUT_CHANGE: {
      const skills = state.skillsData.slice();
      skills[2] = {
        ...skills[2],
        skill_id: payload.id,
        parent_id: payload.parent_id,
        name: payload.name,
      };
      return { ...state, skillsData: skills };
    }
    case SKILL_ONE_DETAIL_INPUT_CHANGE: {
      const skills = state.skillsData.slice();
      skills[0] = { ...skills[0], detail: payload };
      return { ...state, skillsData: skills };
    }
    case SKILL_TWO_DETAIL_INPUT_CHANGE: {
      const skills = state.skillsData.slice();
      skills[1] = { ...skills[1], detail: payload };
      return { ...state, skillsData: skills };
    }
    case SKILL_THREE_DETAIL_INPUT_CHANGE: {
      const skills = state.skillsData.slice();
      skills[2] = { ...skills[2], detail: payload };
      return { ...state, skillsData: skills };
    }
    case DELETE_SKILL_ACTION: {
      const skills = state.skillsData.slice();
      skills[payload] = { ...SkillsData[0] };
      return { ...state, skillsData: skills };
    }
    case SELECTED_SKILL_CHANGE: {
      return { ...state, selectedSkill: payload };
    }
    case SELECTED_SKILL_POSITION: {
      return { ...state, selectedSkillPosition: payload };
    }
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return {
        ...state,
        skillsData: payload?.skills?.length > 0 ? payload?.skills : SkillsData.slice(),
        selectedSkillPosition: payload?.skills?.length > 0 ? 3 : 0,
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        skillsData: payload?.skills?.length > 0 ? payload.skills : SkillsData.slice(),
        selectedSkillPosition: payload?.skills?.length > 0 ? 3 : 0,
      };
    default:
      return state;
  }
};
