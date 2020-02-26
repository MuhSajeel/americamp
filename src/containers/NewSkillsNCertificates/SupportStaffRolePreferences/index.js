import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
  Screen,
  Heading,
  FooterWithButtons,
  SubHeading,
  Spinner,
} from '../../../components/common';
import { SkillSection } from '../../../components/JobPreferences';
import {
  SUPPORT_STAFF_ROLE,
  ROLE_REMOVED,
  ROLE_ADDED,
  RNC_BOARDING_ROUTE,
} from '../../../constants';
import { inputChanged, infoSubmited } from '../../../redux/actions';
import { setItem } from '../../../helpers/Localstorage';

class SupportStaffRolePreferences extends Component {
  state = {
    rolesLists: [],
    choosenRoleSets: [],
  };

  componentDidMount() {
    const { skillsList } = this.props;
    const options = skillsList.map(option => {
      return { key: option.id, label: option.name };
    });
    const rolesLists = [{ options }];
    this.setState({ rolesLists });
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', async () => {
      setTimeout(() => this.stateSetter(), 1000);
    });
  }

  componentDidUpdate() {
    const { roles, navigation } = this.props;
    if (roles && !roles.length) navigation.navigate(SUPPORT_STAFF_ROLE);
  }

  onSubmit() {
    const { jobPreferences, fetchedUserProfile } = this.props;
    const data = fetchedUserProfile;
    data.job_preference = jobPreferences;
    return this.props.infoSubmited(data);
  }

  stateSetter() {
    const { rolesLists } = this.state;
    const { roles } = this.props;
    const indexes = roles.map(role => {
      const rolesList = rolesLists
        .map(({ options }, index) => {
          const option = options.filter(({ key }) => key === role);
          if (option && option.length > 0) {
            return index;
          }
          return null;
        })
        .filter(val => val !== null);
      return rolesList[0];
    });
    while (indexes.length < 3) {
      indexes.push(null);
    }
    this.setState({ choosenRoleSets: indexes });
  }

  renderComponent() {
    const { rolesLists, choosenRoleSets } = this.state;
    const { roles, navigation, fetchedUserProfile } = this.props;
    return choosenRoleSets.map((roleSetIndex, index) => {
      return (
        <SkillSection
          key={Math.random()}
          index={index}
          skillSet={rolesLists[roleSetIndex]}
          nextSkillSet={roles[index + 1]}
          skill={roles[index]}
          placeholder="No role Choosen . . ."
          onDelete={() => {
            this.props.inputChanged(roles[index], ROLE_REMOVED);
            const data = fetchedUserProfile;
            data.job_preference.camp_roles = roles;
            setItem('@userProfile', JSON.stringify(data));
            this.stateSetter();
          }}
          onPress={() =>
            navigation.navigate(SUPPORT_STAFF_ROLE, {
              actionType: ROLE_ADDED,
            })
          }
        />
      );
    });
  }

  render() {
    const { roles, loading, navigation } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>Support Staff Skills</Heading>
          <SubHeading extraStyling={{ fontSize: 24 }}>Which camp role would you prefer?</SubHeading>
        </View>
        <View key="content">{this.renderComponent()}</View>
        <View key="footer">
          {loading ? (
            <View style={{ alignItems: 'flex-end' }}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() =>
                navigation.navigate(roles && roles.length ? RNC_BOARDING_ROUTE : SUPPORT_STAFF_ROLE)
              }
              rightBtnNavigation={roles && roles.length === 3 ? () => this.onSubmit() : null}
              btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
            />
          )}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  skillsListReducer: { skillsList },
  jobPreferences,
  fetchedUserProfile,
  submitInfoReducer,
}) => {
  return {
    skillsList,
    roles: jobPreferences.camp_roles,
    loading: submitInfoReducer.loading,
    jobPreferences,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(SupportStaffRolePreferences);
