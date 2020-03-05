import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
  Screen,
  Heading,
  FooterWithButtons,
  SubHeading,
  SkillsDropDown,
} from '../../../components/common';
import {
  SUPPORT_STAFF_ROLE_PREFERENCES,
  ROLE_ADDED,
  ROLE_CHANGED,
  ROLE_REMOVED,
} from '../../../constants';
import { inputChanged } from '../../../redux/actions';
import { setItem } from '../../../helpers/Localstorage';

class SupportStaffRole extends Component {
  state = {
    rolesLists: [],
  };

  componentDidMount() {
    const { skillsList } = this.props;
    const options = skillsList.map(option => {
      return { key: option.id, label: option.name };
    });
    const rolesLists = [{ options }];
    this.setState({ rolesLists });
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', async () => {
      this.forceUpdate();
    });
  }

  onInputChange(text, category) {
    const { rolesLists } = this.state;
    const { roles, navigation, fetchedUserProfile } = this.props;
    const actionType = navigation.getParam('actionType', null);
    const existingRole = navigation.getParam('existingRole', null);
    let Matched = roles
      .filter(role => {
        const matched = rolesLists[category].options.filter(({ key }) => key === role);
        if (matched && matched[0]) {
          return matched[0].key;
        }
        return null;
      })
      .filter(val => val != null);
    Matched = Matched && Matched[0] ? Matched[0] : null;
    if (actionType === ROLE_CHANGED) {
      if (Matched === text) Alert.alert('Role already choosen');
      else {
        this.props.inputChanged({ existingRole, newRole: text }, actionType);
        navigation.navigate(SUPPORT_STAFF_ROLE_PREFERENCES);
      }
    } else if (actionType === ROLE_ADDED) {
      if (Matched && Matched === text) Alert.alert('Role already choosen');
      else {
        this.props.inputChanged(text, actionType);
        navigation.navigate(SUPPORT_STAFF_ROLE_PREFERENCES);
      }
    } else if (Matched && Matched === text) this.props.inputChanged(text, ROLE_REMOVED);
    else if (Matched) {
      this.props.inputChanged({ existingRole: Matched, newRole: text }, ROLE_CHANGED);
      navigation.navigate(SUPPORT_STAFF_ROLE_PREFERENCES);
    } else {
      this.props.inputChanged(text, ROLE_ADDED);
      navigation.navigate(SUPPORT_STAFF_ROLE_PREFERENCES);
    }
    const data = fetchedUserProfile;
    data.job_preference.camp_roles = roles;
    setItem('@userProfile', JSON.stringify(data));
    this.forceUpdate();
  }

  rolesChecker(rolesList) {
    const { roles } = this.props;
    const selected = roles
      .map(role => {
        const sld = rolesList.options.filter(({ key }) => role === key);
        if (sld.length > 0) {
          return sld[0].key;
        }
        return null;
      })
      .filter(val => val !== null);
    return selected.length ? selected[0] : null;
  }

  renderComponent() {
    const { rolesLists } = this.state;
    return rolesLists.map((rolesList, index) => {
      return (
        <View key={Math.random()} style={{ marginBottom: 10 }}>
          <SkillsDropDown
            selectedValue={null}
            onValueChange={({ key }) => {
              this.onInputChange(key, index);
            }}
            options={rolesList.options}
            placeholder="Select your role . . ."
          />
        </View>
      );
    });
  }

  render() {
    const { roles, navigation } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>Support Staff Skills</Heading>
          <SubHeading extraStyling={{ fontSize: 24 }}>Which camp role would you prefer?</SubHeading>
        </View>
        <View style={{ marginTop: 10 }} key="content">
          {this.renderComponent()}
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() =>
              roles && roles.length
                ? navigation.navigate(SUPPORT_STAFF_ROLE_PREFERENCES)
                : navigation.goBack(null)
            }
            rightBtnNavigation={
              roles && roles.length
                ? () => this.props.navigation.navigate(SUPPORT_STAFF_ROLE_PREFERENCES)
                : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  skillsListReducer: { skillsList },
  jobPreferences,
  fetchedUserProfile,
}) => {
  return {
    skillsList,
    jobPreferences,
    roles: jobPreferences.camp_roles,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(SupportStaffRole);
