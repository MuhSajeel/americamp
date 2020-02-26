import { STAGE1_PROGRESS_CHANGED } from '../../constants';

export const stage1ProgressChanged = payload => {
  return { type: STAGE1_PROGRESS_CHANGED, payload };
};
