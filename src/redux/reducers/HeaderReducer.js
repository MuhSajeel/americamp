import {
  SHOW_HEADER,
  HIDE_HEADER,
  DISABLE_HEADER,
  ENABLE_HEADER,
  USER_FIRST_TIMER,
  USER_NOT_FIRST_TIMER,
  ENABLE_DRAWER,
  DISABLE_DRAWER,
} from '../../constants/App';

const INITIAL_STATE = {
  showHeader: true,
  disableHeader: false,
  firstTimer: false,
  disableDrawer: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_HEADER:
      return { ...state, showHeader: true };
    case ENABLE_DRAWER:
      return { ...state, disableDrawer: false };
    case DISABLE_DRAWER:
      return { ...state, disableDrawer: true };
    case HIDE_HEADER:
      return { ...state, showHeader: false };
    case DISABLE_HEADER:
      return { ...state, disableHeader: true };
    case ENABLE_HEADER:
      return { ...state, disableHeader: false };
    case USER_FIRST_TIMER:
      return { ...state, firstTimer: true };
    case USER_NOT_FIRST_TIMER:
      return { ...state, firstTimer: false };
    default:
      return state;
  }
};
