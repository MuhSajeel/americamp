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
  SKILL_REMOVED,
  SKILL_CHANGED,
  SKILL_ADDED,
  CHOOSEN_SKILLS,
  JOB_PREFERENCES_STARTER,
  SUPPORT_STAFF,
} from '../../../constants';
import { inputChanged } from '../../../redux/actions';
import { setItem } from '../../../helpers/Localstorage';

class CounselorApplication extends Component {
  state = {
    skillsLists: [
      {
        name: 'Arts & Crafts',
        options: [
          {
            key: 1,
            label: 'Arts 1',
          },
          {
            key: 2,
            label: 'Arts 2',
          },
          {
            key: 3,
            label: 'Arts 3',
          },
        ],
      },
      {
        name: 'Land Sports',
        options: [
          {
            key: 4,
            label: 'Land 1',
          },
          {
            key: 5,
            label: 'Land 2',
          },
          {
            key: 6,
            label: 'Land 3',
          },
        ],
      },
      {
        name: 'Nature & Adventure',
        options: [
          {
            key: 7,
            label: 'Nature 1',
          },
          {
            key: 8,
            label: 'Nature 2',
          },
          {
            key: 9,
            label: 'Nature 3',
          },
        ],
      },
      {
        name: 'Performing Arts',
        options: [
          {
            key: 10,
            label: 'Performing 1',
          },
          {
            key: 11,
            label: 'Performing 2',
          },
          {
            key: 12,
            label: 'Performing 3',
          },
        ],
      },
      {
        name: 'Water Sports',
        options: [
          {
            key: 13,
            label: 'Water 1',
          },
          {
            key: 14,
            label: 'Water 2',
          },
          {
            key: 15,
            label: 'Water 3',
          },
        ],
      },
      {
        name: 'Other Activities',
        options: [
          {
            key: 16,
            label: 'Other 1',
          },
          {
            key: 17,
            label: 'Other 2',
          },
          {
            key: 18,
            label: 'Other 3',
          },
        ],
      },
    ],
  };

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', async () => {
      this.forceUpdate();
    });
  }

  onInputChange(text, category) {
    const { skillsLists } = this.state;
    const { skills, navigation, fetchedUserProfile } = this.props;
    const actionType = navigation.getParam('actionType', null);
    const existingSkill = navigation.getParam('existingSkill', null);
    let Matched = skills
      .filter(skill => {
        const matched = skillsLists[category].options.filter(({ key }) => key === skill);
        if (matched && matched[0]) {
          return matched[0].key;
        }
        return null;
      })
      .filter(val => val != null);
    Matched = Matched && Matched[0] ? Matched[0] : null;
    if (actionType) {
      if (Matched && Matched === text) Alert.alert('Skill already choosen');
      else {
        this.props.inputChanged({ existingSkill, newSkill: text }, actionType);
        navigation.navigate(CHOOSEN_SKILLS);
      }
    } else if (Matched && Matched === text) this.props.inputChanged(text, SKILL_REMOVED);
    else if (Matched) {
      this.props.inputChanged({ existingSkill: Matched, newSkill: text }, SKILL_CHANGED);
      if (skills.length === 3) navigation.navigate(CHOOSEN_SKILLS);
    } else {
      this.props.inputChanged(text, SKILL_ADDED);
      if (skills.length === 3) navigation.navigate(CHOOSEN_SKILLS);
    }
    const data = fetchedUserProfile;
    data.job_preference.skills = skills;
    setItem('@userProfile', JSON.stringify(data));
    this.forceUpdate();
  }

  skillsChecker(skillsList) {
    const { skills } = this.props;
    const selected = skills
      .map(skill => {
        const sld = skillsList.options.filter(({ key }) => skill === key);
        if (sld.length > 0) {
          return sld[0].key;
        }
        return null;
      })
      .filter(val => val !== null);
    return selected.length ? selected[0] : null;
  }

  renderComponent() {
    const { skillsLists } = this.state;
    return skillsLists.map((skillsList, index) => {
      return (
        <View key={Math.random()} style={{ marginBottom: 10 }}>
          <SkillsDropDown
            selectedValue={this.skillsChecker(skillsList)}
            onValueChange={({ key }) => {
              this.onInputChange(key, index);
            }}
            options={skillsList.options}
            highlight={this.skillsChecker(skillsList)}
            placeholder={skillsList.name}
          />
        </View>
      );
    });
  }

  render() {
    const { skills } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>CAMP COUNSELOR APPLICATION</Heading>
          <SubHeading extraStyling={{ fontSize: 24 }}>Tell us about your top 3 skills</SubHeading>
        </View>
        <View style={{ marginTop: 10 }} key="content">
          {this.renderComponent()}
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() =>
              this.props.navigation.navigate(
                skills && skills.length ? JOB_PREFERENCES_STARTER : SUPPORT_STAFF
              )
            }
            rightBtnNavigation={
              skills && skills.length === 3
                ? () => this.props.navigation.navigate(CHOOSEN_SKILLS)
                : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ jobPreferences, fetchedUserProfile }) => {
  return {
    skills: jobPreferences.skills,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(CounselorApplication);
