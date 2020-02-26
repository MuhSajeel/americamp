import { combineEpics } from "redux-observable";
import { LoginEpic } from "./loginEpic";
import { LogoutEpic } from "./LogoutEpic";
import { SignUpEpic } from "./SignUpEpic";
import { FetchUserProfileEpic } from "./FetchUserProfileEpic";
import { SubmitInfoEpic } from "./SubmitInfoEpic";
import { StageZeroEpic } from "./stageZeroEpic";
import { ResetPasswordEpic } from "./ResetPasswordEpic";
import { CardDetailsSaveEpic } from "./CardDetailsSaveEpic";
import { StripeTokenGenerateEpic } from "./StripeTokenGenerateEpic";
import { GetTransactionsEpic } from "./GetTransactionsEpic";
import { GetStagesListEpic } from "./GetStagesListEpic";
import { PaymentEpic } from "./PaymentEpic";
import { FetchStripeCustomerIdEpic } from "./FetchStripeCustomerIdEpic";
import { FetchFourDigitEpic } from "./FetchFourDigitEpic";
import { StagesCompletenessEpic } from "./StagesCompletenessEpic";
import { FetchApplyNowDataEpic } from "./FetchApplyNowEpic";
import { LoginFirstTimerEpic } from "./loginFirstTimeEpic";
import { SplashEpic } from "./SplashEpic";
import { FetchUserProfileFromOnBoardingEpic } from "./fetchUserProfileFromOnBoardingEpic";
import { SaveStripeCustomerEpic } from "./SaveStripeCustomerEpic";
import { FetchSkillsListEpic } from "./FetchSkillsListEpic";
import { FetchFormsStatusEpic } from "./FetchFormsStatusEpic";
import { BookInterviewEpic } from "./BookInterviewEpic";
import { FetchInterviewStatusEpic } from "./FetchInterviewStatusEpic";
import { FetchCurrentStageEpic } from "./FetchCurrentStageEpic";
import { UpdateFcmTokenEpic } from "./UpdateFcmTokenEpic";
import { FetchUrlLinkEpic } from "./fetchURLLinksEpic";
import { ForgotPasswordEpic } from "./ForgotPasswordEpic";
import { VerifyPasswordEpic } from "./VerifyPasswordEpic";
import { RatingEpic } from "./RatingEpic";
import { FeedbackEpic } from "./FeedbackEpic";

export const epics = combineEpics(
  LoginEpic.login,
  LogoutEpic.logout,
  SignUpEpic.signUp,
  FetchUserProfileEpic.fetchUserProfile,
  FetchUserProfileFromOnBoardingEpic.fetchUserProfileFromOnBoardingEpic,
  SubmitInfoEpic.submitInfo,
  ResetPasswordEpic.ResetPassword,
  StageZeroEpic.stageZero,
  CardDetailsSaveEpic.cardDetailsSave,
  StripeTokenGenerateEpic.stripeTokenGenerate,
  SaveStripeCustomerEpic.saveStripeCustomerEpic,
  GetTransactionsEpic.getTransactions,
  GetStagesListEpic.getStagesList,
  PaymentEpic.payment,
  FetchStripeCustomerIdEpic.fetchStripeCustomerId,
  FetchFourDigitEpic.fetchFourDigit,
  StagesCompletenessEpic.stagesCompletenessEpic,
  FetchApplyNowDataEpic.fetchApplyNowDataEpic,
  LoginFirstTimerEpic.loginFirstTimerEpic,
  SplashEpic.splashScreenEpic,
  FetchSkillsListEpic.fetchSkillsListEpic,
  FetchFormsStatusEpic.fetchFormsStatus,
  BookInterviewEpic.bookInterview,
  FetchCurrentStageEpic.fetchCurrentStageEpic,
  UpdateFcmTokenEpic.updateFcmTokenEpic,
  FetchInterviewStatusEpic.fetchInterviewStatus,
  FetchUrlLinkEpic.fetchUrlLinkEpic,
  ForgotPasswordEpic.forgotPassword,
  VerifyPasswordEpic.verifyPassword,
  RatingEpic.rating,
  FeedbackEpic.feedback
);
