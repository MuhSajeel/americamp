import {
  STUDIED_AT_COLLEGE,
  CURRENT_OCCUPATION_TYPE,
  CURRENT_STUDY,
  COURSE_TITLE,
  COURSE_DEGREE_LEVEL,
  UNIVERSITY_NAME,
  DEGREE_TYPE,
  GRADUATION_DATE,
  ADDITIONAL_INFO,
  CURRENT_OCCUPATION,
  PREVIOUS_OCCUPATION,
  SUBMIT_EDUCATION,
  SUBMIT_EDUCATION_SUCCESS,
  SUBMIT_EDUCATION_FAILURE,
} from '../../constants';

export const studiedAtCollegeAction = payload => ({
  type: STUDIED_AT_COLLEGE,
  payload,
});

export const currentOccupationTypeAction = payload => ({
  type: CURRENT_OCCUPATION_TYPE,
  payload,
});

export const currentStudyAction = payload => ({
  type: CURRENT_STUDY,
  payload,
});

export const courseTitleAction = payload => ({
  type: COURSE_TITLE,
  payload,
});

export const courseDegreeLevelAction = payload => ({
  type: COURSE_DEGREE_LEVEL,
  payload,
});

export const universityNameAction = payload => ({
  type: UNIVERSITY_NAME,
  payload,
});

export const degreeTypeAction = payload => ({
  type: DEGREE_TYPE,
  payload,
});

export const graduationDateAction = payload => ({
  type: GRADUATION_DATE,
  payload,
});

export const additionalInfoAction = payload => ({
  type: ADDITIONAL_INFO,
  payload,
});

export const currentOccupationAction = payload => ({
  type: CURRENT_OCCUPATION,
  payload,
});

export const previousOccupationAction = payload => ({
  type: PREVIOUS_OCCUPATION,
  payload,
});

export const submitEducationAction = payload => ({
  type: SUBMIT_EDUCATION,
  payload,
});

export const submitEducationActionSuccess = payload => ({
  type: SUBMIT_EDUCATION_SUCCESS,
  payload,
});

export const submitEducationActionFailure = payload => ({
  type: SUBMIT_EDUCATION_FAILURE,
  payload,
});
