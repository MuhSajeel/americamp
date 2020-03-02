import { combineReducers } from 'redux';
import header from './HeaderReducer';
import theme from './themeReducer';
import personalInfo from './PersonalInfoReducer';
import MedicalHistory from './MedicalHistoryReducer';
import jobPreferences from './JobPreferencesReducer';
import fetchedUserProfile from './FetchUserProfileReducer';
import emailReducer from './EmailReducer';
import stageProgress from './StageProgressReducer';
import loginReducer from './loginReducer';
import signUpReducer from './SignUpReducer';
import submitInfoReducer from './SubmitInfoReducer';
import ResetPasswordReducer from './ResetPasswordReducer';
import referenceReducer from './ReferencesReducer';
import workExperienceReducer from './WorkExperienceReducer';
import educationReducer from './educationReducer';
import stageZeroReducer from './StageZeroReducer';
import EmergencyContact from './EmergencyContactReducer';
import Document from './documentReducer';
import paymentReducer from './PaymentReducer';
import transactionsReducer from './TransactionsReducer';
import stagsListReducer from './StagesListReducer';
import visaInformationReducer from './VisaInformationReducer';
import uploadDocument from './UploadDocumentReducer';
import campReducer from './campReducer';
import splashScreenReducer from './splashScreenReducer';
import addresses from './AddressesReducer';
import programAgreementReducer from './TermsNConditionsReducer';
import PersonalStatement from './PersonalStatementReducer';
import skillsListReducer from './skillsListReducer';
import profileSkillsReducer from './ProfileSkillsReducer';
import FlightInfoReducer from './FlightInfoReducer';
import formsStatus from './fetchFormsStatusReducer';
import interview from './interviewReducer';
import userCurrentStageReducer from './UserCurrentStageReducer';
import urlLinkReducer from './urlLinkReducer';
import verifyOldPassword from './verifyOldPasswordReducer';
import ratingReducer from './RatingReducer';
import feedbackReducer from './FeedbackReducer';
import Overlay from './OverlayReducer';

export default combineReducers({
  header,
  theme,
  personalInfo,
  addresses,
  EmergencyContact,
  MedicalHistory,
  jobPreferences,
  fetchedUserProfile,
  emailReducer,
  stageProgress,
  loginReducer,
  signUpReducer,
  submitInfoReducer,
  ResetPasswordReducer,
  referenceReducer,
  workExperienceReducer,
  educationReducer,
  Document,
  stageZeroReducer,
  paymentReducer,
  transactionsReducer,
  stagsListReducer,
  visaInformationReducer,
  uploadDocument,
  campReducer,
  splashScreenReducer,
  programAgreementReducer,
  PersonalStatement,
  skillsListReducer,
  profileSkillsReducer,
  FlightInfoReducer,
  formsStatus,
  interview,
  userCurrentStageReducer,
  urlLinkReducer,
  verifyOldPassword,
  ratingReducer,
  feedbackReducer,
  Overlay,
});
