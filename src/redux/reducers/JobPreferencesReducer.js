/* eslint-disable camelcase */
import * as CONSTANTS from '../../constants';
import { USER_PROFILE } from '../state/initial/UserProfile';

const JOB_PREFERENCES_INITIAL_STATE = USER_PROFILE.job_preference;

export default (state = JOB_PREFERENCES_INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.SKILL_ADDED: {
      const { skills } = state;
      skills.push(action.payload);
      return { ...state, skills };
    }
    case CONSTANTS.SKILL_REMOVED: {
      const { skills } = state;
      const index = skills.indexOf(action.payload);
      skills.splice(index, 1);
      return { ...state, skills };
    }
    case CONSTANTS.SKILL_CHANGED: {
      const { skills } = state;
      const index = skills.indexOf(action.payload.existingSkill);
      skills[index] = action.payload.newSkill;
      return { ...state, skills };
    }
    case CONSTANTS.ROLE_ADDED: {
      const { camp_roles } = state;
      camp_roles.push(action.payload);
      return { ...state, camp_roles };
    }
    case CONSTANTS.ROLE_REMOVED: {
      const { camp_roles } = state;
      const index = camp_roles.indexOf(action.payload);
      camp_roles.splice(index, 1);
      return { ...state, camp_roles };
    }
    case CONSTANTS.ROLE_CHANGED: {
      const { camp_roles } = state;
      const index = camp_roles.indexOf(action.payload.existingRole);
      camp_roles[index] = action.payload.newRole;
      return { ...state, camp_roles };
    }
    case CONSTANTS.WORK_AT_CAMP_CHANGED:
      return { ...state, work_at_camp: action.payload };
    case CONSTANTS.POSITIVE_IMPACT_AT_CAMP_CHANGED:
      return { ...state, positive_impact_at_camp: action.payload };
    case CONSTANTS.WHY_HIRE_YOU_CHANGED:
      return { ...state, why_hire_you: action.payload };

    case CONSTANTS.TRADITIONAL_DAY_CAMP_CHANGED:
      return { ...state, at_traditional_day_camp: action.payload };
    case CONSTANTS.RESIDENTIAL_CAMP_CHANGED:
      return { ...state, at_residential_camp: action.payload };
    case CONSTANTS.FEMALE_CAMPERS_CHANGED:
      return { ...state, with_female_campers: action.payload };
    case CONSTANTS.MALE_CAMPERS_CHANGED:
      return { ...state, with_male_campers: action.payload };
    case CONSTANTS.FAMILY_GROUPS_CHANGED:
      return { ...state, with_family_groups: action.payload };
    case CONSTANTS.CHILDREN_CHANGED:
      return { ...state, with_children: action.payload };
    case CONSTANTS.NO_RUNNING_WATER_CHANGED:
      return { ...state, with_no_running_water: action.payload };
    case CONSTANTS.NO_ELECTRICITY_CHANGED:
      return { ...state, with_no_electricity: action.payload };
    case CONSTANTS.PLATFORM_TENT_CHANGED:
      return { ...state, camp_with_platform_tent: action.payload };

    case CONSTANTS.SPECIAL_NEED_CAMP_CHANGED:
      return { ...state, special_need_camp: action.payload };
    case CONSTANTS.WHY_SPECIAL_NEED_CHANGED:
      return { ...state, why_special_need_camp: action.payload };
    case CONSTANTS.VOLUNTERING_WITH_CHANGED:
      return { ...state, exp_special_needs: action.payload };
    case CONSTANTS.EXP_VOLUNTERING_WITH_CHANGED:
      return { ...state, exp_special_need_camp: action.payload };
    case CONSTANTS.WILLING_TO_WORK_AT_CAMP_CHANGED:
      return { ...state, select_special_needs: action.payload };
    case CONSTANTS.AGE_GROUP_WILLING_TO_WORK_CHANGED:
      return { ...state, age_group: action.payload };
    case CONSTANTS.PROVIDE_PERSONAL_CARE_CHANGED:
      return { ...state, provide_personal_care: action.payload };

    case CONSTANTS.RELIGIOUS_CAMPS_CHANGED:
      return { ...state, religious_camps: action.payload };
    case CONSTANTS.FAITH_BASED_CAMP_TYPE_CHANGED:
      return { ...state, religious_camp: action.payload };
    case CONSTANTS.RELIGIOUS_CAMPS_DETAILS_CHANGED:
      return { ...state, religious_camp_details: action.payload };
    case CONSTANTS.COMFORTABLE_WITH_OTHERS_CHANGED:
      return { ...state, comfortable_with_others: action.payload };

    case CONSTANTS.AFFILIATED_WITH_YMCA_CHANGED:
      return { ...state, affiliated_with_ymca: action.payload };
    case CONSTANTS.YMCA_CAMP_DETAILS_CHANGED:
      return { ...state, ymca_camp_detail: action.payload };

    case CONSTANTS.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload.job_preference,
        religious_camp_details:
          action.payload.job_preference.religious_camp_details ||
          'I am open to working at a camp with a faith- based program and would be respectful and participate in any activities involving religion.'
      };
    case CONSTANTS.FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return {
        ...state,
        ...action.payload.job_preference,
        religious_camp_details:
          action.payload.job_preference.religious_camp_details ||
          'I am open to working at a camp with a faith- based program and would be respectful and participate in any activities involving religion.'
      };
    default:
      return state;
  }
};
