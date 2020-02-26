import React from 'react';
import { connect } from 'react-redux';

import { inputChanged, logoutAction } from '../../redux/actions';
import { withState } from './withState';
import settingComponent from './settingComponent';

const Settings = props => {
  const SettingsWithState = withState(settingComponent);
  return <SettingsWithState {...props} />;
};

const mapStateToProps = ({ fetchedUserProfile, stageZeroReducer: { apply_now } }) => {
  return {
    fetchedUserProfile,
    apply_now,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged, logoutAction }
)(Settings);
