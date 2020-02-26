import {
  PersonalInformation,
  addresses,
  EducationBackground,
  JobPreference,
  WorkExperience,
  Document,
  MedicalHistory,
  VisaInformation,
  EmergencyContact,
  CampInformation,
  program_agreement,
  PersonalStatement,
} from './index';
import { FlightInfo } from './FlightInfo';

export const USER_PROFILE = {
  id: null,
  token: null,
  email: null,
  personal_info: PersonalInformation,
  addresses: JSON.parse(JSON.stringify(addresses)),
  educational_background: EducationBackground,
  job_preference: JobPreference,
  work_experience: WorkExperience,
  documents: Document,
  medical_history: MedicalHistory,
  emergency_contact: JSON.parse(JSON.stringify(EmergencyContact)),
  visa_informations: VisaInformation,
  camp_information: CampInformation,
  program_agreement,
  personal_statement: PersonalStatement,
  flight_info: FlightInfo,
};
