import { ON_SPLASH_ACTION, ON_SPLASH_ACTION_FINISH } from '../../constants';

export const onSplashAction = () => {
  return { type: ON_SPLASH_ACTION };
};

export const onSplashActionFinish = (payload = '') => {
  return { type: ON_SPLASH_ACTION_FINISH, payload };
};
