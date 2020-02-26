import React from 'react';
import { connect } from 'react-redux';

import { withInputState } from './withInputState';
import { resetPasswordScreen } from './resetPasswordScreen';
import { inputChanged } from '../../../redux/actions';
import { VERIFY_OLD_PASSWORD } from '../../../constants';
import { validatePassword } from '../../../helpers/Validators';
import { errorMessage } from '../../../helpers/MessageAlert';

const OldPasswordComp = props => {
  const {
    navigation: { navigate },
    emailReducer: { email },
  } = props;
  const OldPasswordWithState = withInputState(resetPasswordScreen);
  return (
    <OldPasswordWithState
      {...props}
      cancel={route => navigate(route)}
      navigateNext={(data, password) =>
        validatePassword(password)
          ? props.inputChanged(
              { email, password, data: { ...data, oldPassword: password } },
              VERIFY_OLD_PASSWORD
            )
          : errorMessage('Please enter complete old password')
      }
      heading="Change Password"
      subHeading="Enter Old Password"
      rightButtonText="Next"
    />
  );
};

const mapStateToProps = ({ emailReducer, verifyOldPassword: { loading } }) => {
  return { emailReducer, loading };
};

const OldPassword = connect(
  mapStateToProps,
  { inputChanged }
)(OldPasswordComp);

export { OldPassword };
