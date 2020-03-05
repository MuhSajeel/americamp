/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import Toast from "react-native-simple-toast";
import { inputChanged } from "../../redux/actions";
import {
  CAMP_COUNSELOR_ROLE,
  SKILL_ONE_INPUT_CHANGE,
  SKILL_TWO_INPUT_CHANGE,
  SKILL_THREE_INPUT_CHANGE,
  RNC_SKILLS_DETAIL_ROUTE,
  SELECTED_SKILL_POSITION
} from "../../constants";
import {
  SubHeading,
  FooterWithButtons,
  Heading,
  Screen,
  DropDown
} from "../../components/common";

class SNCSkillsList extends Component {
  inputReducer(val) {
    const {
      inputChanged,
      skillsData,
      navigation: { goBack },
      selectedSkillPosition
    } = this.props;
    const actions = [
      SKILL_ONE_INPUT_CHANGE,
      SKILL_TWO_INPUT_CHANGE,
      SKILL_THREE_INPUT_CHANGE
    ];
    const toChange = { skillNo: null, Change: false };

    skillsData.forEach((skill, i) => {
      if (!skill.skill_id && !toChange.Change) {
        toChange.skillNo = i;
        toChange.Change = true;
      }
    });

    skillsData.forEach(skill => {
      if (skill.parent_id && skill.skill_id === val.id) {
        toChange.skillNo = null;
        toChange.Change = false;
      }
    });
    if (toChange.Change) {
      inputChanged(val, actions[toChange.skillNo]);
      inputChanged(selectedSkillPosition + 1, SELECTED_SKILL_POSITION);
      goBack();
    } else {
      //Toast.show("Skill Already Selected");
    }
  }

  render() {
    const {
      apply_now: { role },
      skillsList,
      navigation,
      skillsData,
      selectedSkillPosition
    } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>
            {role === CAMP_COUNSELOR_ROLE
              ? "CAMP COUNSELOR APPLICATION"
              : "SUPPORT STAFF APPLICATION"}
          </Heading>
          <SubHeading>SELECT YOUR TOP 3 SKILLS</SubHeading>
        </View>
        <View key="content">
          {skillsList.map(({ name, id, sub_categories }) => {
            return (
              <View style={{ marginTop: 15 }} key={`${id}_${name}`}>
                <DropDown
                  options={sub_categories}
                  keyExtractor={item => item.id}
                  labelExtractor={item => item.name}
                  customExtractor={() => name}
                  highlight={isMatched(id, skillsData)}
                  custom
                  onValueChange={val => this.inputReducer(val)}
                />
              </View>
            );
          })}
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.goBack()}
            rightBtnNavigation={
              selectedSkillPosition === 3
                ? () => navigation.navigate(RNC_SKILLS_DETAIL_ROUTE)
                : null
            }
            btnTxt={{ leftBtnTxt: "PREVIOUS", rightBtnTxt: "NEXT" }}
          />
        </View>
      </Screen>
    );
  }
}

const isMatched = (id, reducer) => {
  const resp = { ans: false };
  reducer.forEach(red => {
    if (id === red.parent_id) {
      resp.ans = true;
    }
  });
  return resp.ans;
};

const mapStateToProps = ({
  stageZeroReducer: { apply_now },
  skillsListReducer: { skillsList },
  profileSkillsReducer: { skillsData, selectedSkillPosition }
}) => ({ apply_now, skillsList, skillsData, selectedSkillPosition });

export default connect(
  mapStateToProps,
  { inputChanged }
)(SNCSkillsList);
