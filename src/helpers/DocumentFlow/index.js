import {
  NEW_APPLICANT,
  RETURN_TO_CAMP,
  DIRECT_PLACEMENT,
  CAMP_COUNSELOR_ROLE,
} from '../../constants';

/* eslint-disable camelcase */
const selectDocumentFlow = (role, application_type) => {
  switch (application_type) {
    case NEW_APPLICANT: {
      if (role === CAMP_COUNSELOR_ROLE) {
        return require('../../assets/data/DocumentsFlow/CampCounselor/firstTimerDoc.json');
      }
      return require('../../assets/data/DocumentsFlow/SupportStaff/firstTimerDoc.json');
    }
    case RETURN_TO_CAMP: {
      if (role === CAMP_COUNSELOR_ROLE) {
        return require('../../assets/data/DocumentsFlow/CampCounselor/returnerDoc.json');
      }
      return require('../../assets/data/DocumentsFlow/SupportStaff/returnerDoc.json');
    }
    case DIRECT_PLACEMENT: {
      if (role === CAMP_COUNSELOR_ROLE) {
        return require('../../assets/data/DocumentsFlow/CampCounselor/directPlacementDoc.json');
      }
      return require('../../assets/data/DocumentsFlow/SupportStaff/directPlacementDoc.json');
    }
    default:
      return require('../../assets/data/DocumentsFlow/CampCounselor/firstTimerDoc.json');
  }
};

export { selectDocumentFlow };
