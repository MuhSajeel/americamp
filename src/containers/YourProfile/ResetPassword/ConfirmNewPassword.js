/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';

import { resetPassword } from '../../../redux/actions/ResetPasswordActions';
import { withInputState } from './withInputState';
import { resetPasswordScreen } from './resetPasswordScreen';
import { validatePassword } from '../../../helpers/Validators';
import { errorMessage } from '../../../helpers/MessageAlert';

const ConfirmNewPassword = props => {
  const {
    navigation: { navigate },
    resetPassword,
  } = props;
  const ConfirmNewPasswordWithState = withInputState(resetPasswordScreen);
  return (
    <ConfirmNewPasswordWithState
      {...props}
      cancel={route => navigate(route)}
      navigateNext={(data, value) => onSave(resetPassword, data, value)}
      heading="Change Password"
      subHeading="Confirm New Password"
    />
  );
};
const onSave = (reset, { oldPassword, newPassword }, currentValue) => {
  if (!validatePassword(currentValue)) {
    return errorMessage('Please enter six digits Confirm password');
  }
  if (newPassword !== currentValue) {
    return errorMessage('Password mismatch');
  }
  const data = {
    oldPassword,
    newPassword,
  };
  return reset(data);
};

const stateToProps = state => {
  const { success, message, loading } = state.ResetPasswordReducer;
  return { success, message, loading };
};

export default connect(
  stateToProps,
  { resetPassword }
)(ConfirmNewPassword);
