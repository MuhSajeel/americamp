import {
  NEW_APPLICANT,
  RETURN_TO_CAMP,
  DIRECT_PLACEMENT,
  CAMP_COUNSELOR_ROLE
} from "../../constants";

/* eslint-disable camelcase */
const selectAppFlow = (role, application_type) => {
  switch (application_type) {
    case NEW_APPLICANT: {
      if (role === CAMP_COUNSELOR_ROLE) {
        return require("../../assets/data/AppFlow/CampCounselor/firstTimer.json");
      }
      return require("../../assets/data/AppFlow/SupportStaff/firstTimer.json");
    }
    case RETURN_TO_CAMP: {
      if (role === CAMP_COUNSELOR_ROLE) {
        return require("../../assets/data/AppFlow/CampCounselor/Returner.json");
      }
      return require("../../assets/data/AppFlow/SupportStaff/Returner.json");
    }
    case DIRECT_PLACEMENT: {
      if (role === CAMP_COUNSELOR_ROLE) {
        return require("../../assets/data/AppFlow/CampCounselor/DirectPlacement.json");
      }
      return require("../../assets/data/AppFlow/SupportStaff/DirectPlacement.json");
    }
    default:
      return require("../../assets/data/AppFlow/CampCounselor/firstTimer.json");
  }
};

export { selectAppFlow };
