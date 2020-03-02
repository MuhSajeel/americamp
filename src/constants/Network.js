import { Platform } from "react-native";
export const DEV_URL = "http://americamp-dev.attribes.com";
export const STAGING_URL = "http://americamp.attribes.com";
export const BASE_URL = Platform.OS === "ios" ? STAGING_URL : DEV_URL;
export const API_VERSION = "api/v1";

export const API_ENDPOINTS = {
  LOGIN: `/users/signin`,
  SIGNUP: `/users/signup`,
  APPLY_NOW: "/users/apply_now",
  UPDATE_PROFILE: `/profile`,
  FETCH_PROFILE: `/profile/1`,
  FETCH_FORM_STATUS: `/forms/completed`,
  RESET_PASSWORD: `/users/update_password`,
  CARD_DETAIL_SAVE: "/payments",
  UPDATE_USER: "/users/5",
  CREATE_CUSTOMER: "/stripes/create_customer",
  PAYMENTS_STAGE: "/payments/stage",
  TRANSACTIONS: "/transactions",
  STAGES_LIST: "/stages",
  CURRENT_STAGE: "/stages/3",
  SKILLS_LIST: "/skills",
  URL_LINK_FETCH: "/users/misc_url_index",
  FETCH_APPLY_NOW_DATA: "/users/application",
  BOOK_INTERVIEW: "/interviews/1",
  FETCH_INTERVIEW_STATUS: "/interviews",
  UPDATE_FCM_TOKEN: "/profile/update_fcm_token",
  FORGOT_PASSWORD: "/users/forgotpassword",
  ROLES_LIST: "/camp_roles",
  VERIFY_OLD_PASSWORD: "/users/verify_old_password",
  DATES_LIST: "/users/important_dates_index",
  FETCH_RATING: "/users/get_rating",
  SUBMIT_RATING: "/users/rate",
  FETCH_FEEDBACK: "/users/get_feedback",
  SUBMIT_FEEDBACK: "/users/feedback",
  STAGES_PROGRESS_FETCH: {
    STAGE0_PROGRESS: "/stages/0/completeness",
    STAGE1_PROGRESS: "/stages/1/completeness",
    STAGE2_PROGRESS: "/stages/2/completeness",
    STAGE3_PROGRESS: "/stages/3/completeness",
    STAGE4_PROGRESS: "/stages/4/completeness"
  }
};
