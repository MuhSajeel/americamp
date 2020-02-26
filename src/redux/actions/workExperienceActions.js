import {
  WORKED_BEFORE_INPUT_CHANGE,
  PREVIOUS_WORK_EXPERIENCE_INPUT_CHANGE,
  EMPLOYMENT_HISTORY_INPUT_CHANGE,
  WHY_WORK_AT_CAMP_INPUT_CHANGE,
  POSITIVE_IMPACT_AT_CAMP_INPUT_CHANGE,
  WHY_HIRE_YOU_INPUT_CHANGE,
  WORK_EXPERIENCE_SUBMIT,
  WORK_EXPERIENCE_SUBMIT_SUCCESS,
  WORK_EXPERIENCE_SUBMIT_FAILURE,
} from '../../constants';

const {
  CURRENTLY_EMPLOYED,
  EMPLOYER_NAME,
  POSITION,
  LOCATION,
  START_DATE,
  END_DATE,
  EXP_WITH_CHILDREN,
} = EMPLOYMENT_HISTORY_INPUT_CHANGE;

export const workedBefore = payload => ({ type: WORKED_BEFORE_INPUT_CHANGE, payload });

export const previousWorkExperience = payload => ({
  type: PREVIOUS_WORK_EXPERIENCE_INPUT_CHANGE,
  payload,
});

export const employmentHistoryCurrentlyEmployed = payload => ({
  type: CURRENTLY_EMPLOYED,
  payload,
});

export const employmentHistoryEmployerName = payload => ({
  type: EMPLOYER_NAME,
  payload,
});

export const employmentHistoryPosition = payload => ({
  type: POSITION,
  payload,
});

export const employmentHistoryLocation = payload => ({
  type: LOCATION,
  payload,
});

export const employmentHistoryStartDate = payload => ({
  type: START_DATE,
  payload,
});

export const employmentHistoryEndDate = payload => ({
  type: END_DATE,
  payload,
});
export const workWithChildren = payload => ({
  type: EXP_WITH_CHILDREN,
  payload,
});

export const whyWorkAtCamp = payload => ({ type: WHY_WORK_AT_CAMP_INPUT_CHANGE, payload });

export const positiveImpactAtCamp = payload => ({
  type: POSITIVE_IMPACT_AT_CAMP_INPUT_CHANGE,
  payload,
});

export const whyHireYou = payload => ({ type: WHY_HIRE_YOU_INPUT_CHANGE, payload });

export const workExperienceSubmit = payload => ({ type: WORK_EXPERIENCE_SUBMIT, payload });

export const workExperienceSubmitSuccess = payload => ({
  type: WORK_EXPERIENCE_SUBMIT_SUCCESS,
  payload,
});

export const workExperienceSubmitFailure = payload => ({
  type: WORK_EXPERIENCE_SUBMIT_FAILURE,
  payload,
});
