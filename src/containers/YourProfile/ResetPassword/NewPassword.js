import React from 'react';
import { withInputState } from './withInputState';
import { resetPasswordScreen } from './resetPasswordScreen';
import { CONFIRM_NEW_PASSWORD_SCREEN } from '../../../constants';
import { validatePassword } from '../../../helpers/Validators';
import { errorMessage } from '../../../helpers/MessageAlert';

const NewPassword = props => {
  const {
    navigation: { navigate },
  } = props;
  const NewPasswordWithState = withInputState(resetPasswordScreen);
  return (
    <NewPasswordWithState
      {...props}
      cancel={route => navigate(route)}
      navigateNext={(data, value) => onNavigate(data, value, navigate, CONFIRM_NEW_PASSWORD_SCREEN)}
      heading="Change Password"
      subHeading="Enter New Password"
      rightButtonText="Next"
    />
  );
};

const onNavigate = (data, value, navigate, route) => {
  if (!validatePassword(value)) {
    return errorMessage('Please enter six digits New password');
  }
  return navigate(route, { ...data, newPassword: value });
};

export { NewPassword };
