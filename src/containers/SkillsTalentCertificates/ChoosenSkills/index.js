import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Screen, Heading, FooterWithButtons, SubHeading } from '../../../components/common';
import { SkillSection } from '../../../components/JobPreferences';
import {
  COUNSELOR_APPLICATION,
  SKILL_REMOVED,
  SKILL_CHANGED,
  JOB_PREFERENCES_STARTER,
  WORKING_ENVIRONMENT,
} from '../../../constants';
import { inputChanged } from '../../../redux/actions';

class ChoosenSkills extends Component {
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
    choosenSkillSets: [],
  };

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', async () => {
      this.stateSetter();
    });
  }

  stateSetter() {
    const { skillsLists } = this.state;
    const { skills } = this.props;
    const indexes = skills.map(skill => {
      const skillsList = skillsLists
        .map(({ options }, index) => {
          const option = options.filter(({ key }) => key === skill);
          if (option && option.length > 0) {
            return index;
          }
          return null;
        })
        .filter(val => val !== null);
      return skillsList[0];
    });
    while (indexes.length < 3) {
      indexes.push(null);
    }
    this.setState({ choosenSkillSets: indexes });
  }

  renderComponent() {
    const { skillsLists, choosenSkillSets } = this.state;
    const { skills, navigation } = this.props;
    return (
      <SkillSection
        key={Math.random()}
        skillSet={skillsLists[choosenSkillSets[0]]}
        skill={skills[0]}
        placeholder="Choose a skill . . ."
        onDelete={() => {
          this.props.inputChanged(skills[0], SKILL_REMOVED);
          this.stateSetter();
        }}
        onPress={() =>
          navigation.navigate(COUNSELOR_APPLICATION, {
            actionType: SKILL_CHANGED,
            existingSkill: skills[0],
          })
        }
        onNullPress={() => navigation.navigate(COUNSELOR_APPLICATION)}
      />
    );
  }

  render() {
    const { skills, navigation } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>CAMP COUNSELOR APPLICATION</Heading>
          <SubHeading extraStyling={{ fontSize: 24 }}>Your choosen skill 1</SubHeading>
        </View>
        <View key="content">{this.renderComponent()}</View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() =>
              navigation.navigate(
                skills && skills.length === 3 ? JOB_PREFERENCES_STARTER : COUNSELOR_APPLICATION
              )
            }
            rightBtnNavigation={
              skills && skills.length === 3 ? () => navigation.navigate(WORKING_ENVIRONMENT) : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'SAVE' }}
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
)(ChoosenSkills);
