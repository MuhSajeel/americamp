import { AMERICA_THEME, CANADA_THEME } from '../../constants';

const THEME_INITIAL_STATE = {
  americaTheme: true,
};

export default (state = THEME_INITIAL_STATE, action) => {
  switch (action.type) {
    case AMERICA_THEME:
      return { ...state, americaTheme: true };
    case CANADA_THEME:
      return { ...state, americaTheme: false };
    default:
      return state;
  }
};
