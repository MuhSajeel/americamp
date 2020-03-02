import { SHOW_HEADER, HIDE_HEADER, DISABLE_HEADER, ENABLE_HEADER, ENABLE_DRAWER, DISABLE_DRAWER } from '../../constants';

export const showHeader = () => {
  return { type: SHOW_HEADER };
};

export const enableDrawer = () => {
  return { type: ENABLE_DRAWER };
}

export const disableDrawer = () => {
  return { type: DISABLE_DRAWER };
}

export const hideHeader = () => {
  return { type: HIDE_HEADER };
};

export const disableHeader = () => {
  return { type: DISABLE_HEADER };
};

export const enableHeader = () => {
  return { type: ENABLE_HEADER };
};
