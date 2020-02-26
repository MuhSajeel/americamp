import { StageZero } from '../state/initial';
import {
  WHERE_DO_YOU_WANT_TO_GO,
  DO_YOU_HAVE_ANY_MEDICAL_CONDITION,
  CRIMINAL_BACKGROUND,
  FURTHER_DETAILS,
  ROLE_APPLYING_FOR,
  APPLY_STATUS,
  USER_NAME,
  USER_EMAIL,
  STAGE_ZERO_SUBMIT,
  STAGE_ZERO_SUBMIT_SUCCESS,
  STAGE_ZERO_SUBMIT_FAILURE,
  FETCH_APPLY_NOW_DATA_SUCCESS,
  LOGIN_SUCCESS,
  ON_SPLASH_ACTION_FINISH,
  FETCH_USER_PROFILE_ON_BOARDING_SUCCESS,
  COPY_TO_APPLY_NOW,
} from '../../constants';

export default (state = { ...StageZero, loading: false }, { type, payload }) => {
  switch (type) {
    case WHERE_DO_YOU_WANT_TO_GO:
      return {
        ...state,
        apply_now_submit: { ...state.apply_now_submit, where_you_want_to_go: payload },
      };
    case DO_YOU_HAVE_ANY_MEDICAL_CONDITION:
      return {
        ...state,
        apply_now_submit: { ...state.apply_now_submit, medical_condition: payload },
      };
    case CRIMINAL_BACKGROUND:
      return {
        ...state,
        apply_now_submit: { ...state.apply_now_submit, criminal_background: payload },
      };
    case FURTHER_DETAILS:
      return {
        ...state,
        apply_now_submit: { ...state.apply_now_submit, further_details: payload },
      };
    case ROLE_APPLYING_FOR:
      return { ...state, apply_now_submit: { ...state.apply_now_submit, role: payload } };
    case APPLY_STATUS:
      return {
        ...state,
        apply_now_submit: { ...state.apply_now_submit, application_type: payload },
      };
    case USER_NAME:
      return { ...state, apply_now: { ...state.apply_now, name: payload } };
    case COPY_TO_APPLY_NOW:
      return { ...state, apply_now: JSON.parse(JSON.stringify(payload)) };
    case USER_EMAIL:
      return { ...state, email: payload };
    case STAGE_ZERO_SUBMIT:
      return { ...state, loading: true };
    case STAGE_ZERO_SUBMIT_SUCCESS:
      return { ...state, loading: false };
    case STAGE_ZERO_SUBMIT_FAILURE:
      return { ...state, loading: false };
    case FETCH_APPLY_NOW_DATA_SUCCESS:
      return { ...state, apply_now: payload || StageZero.apply_now };
    case LOGIN_SUCCESS:
      return { ...state, apply_now: payload.apply_now ? payload.apply_now : StageZero.apply_now };
    case ON_SPLASH_ACTION_FINISH:
      return { ...state };
    case FETCH_USER_PROFILE_ON_BOARDING_SUCCESS:
      return { ...state, apply_now: (payload && payload.apply_now) || StageZero.apply_now };
    default:
      return state;
  }
};
