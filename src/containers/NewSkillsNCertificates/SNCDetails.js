/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { connect } from "react-redux";

import { inputChanged, infoSubmited } from "../../redux/actions";
import {
  FooterWithButtons,
  Heading,
  SubHeading,
  Spinner,
  Screen2
} from "../../components/common";
import {
  CAMP_COUNSELOR_ROLE,
  SKILL_ONE_DETAIL_INPUT_CHANGE,
  SKILL_TWO_DETAIL_INPUT_CHANGE,
  SKILL_THREE_DETAIL_INPUT_CHANGE,
  RNC_SKILLS_LIST_ROUTE,
  DELETE_SKILL_ACTION,
  SELECTED_SKILL_POSITION
} from "../../constants";
import { QuestionWithBox } from "../../components/JobPreferences";
import styles from "./styles";

class SNCDetails extends Component {
  state = { index: 0 };

  submit() {
    const { fetchedUserProfile, skillsData, infoSubmited } = this.props;
    const data = fetchedUserProfile;
    data.skills = skillsData.slice();
    infoSubmited(data);
  }

  updateIndex(currentIndex, inc) {
    this.setState(previousState => ({
      ...previousState,
      index: inc ? currentIndex + 1 : currentIndex - 1
    }));
  }

  render() {
    const { index } = this.state;
    const {
      navigation: { navigate, goBack },
      apply_now: { role },
      skillsData,
      selectedSkillPosition,
      inputChanged,
      loading,
      skillsList
    } = this.props;
    const actions = [
      SKILL_ONE_DETAIL_INPUT_CHANGE,
      SKILL_TWO_DETAIL_INPUT_CHANGE,
      SKILL_THREE_DETAIL_INPUT_CHANGE
    ];

    return (
      <Screen2>
        <View key="header" />
        <View key="content">
          <Heading>
            {role === CAMP_COUNSELOR_ROLE
              ? "CAMP COUNSELOR APPLICATION"
              : "SUPPORT STAFF APPLICATION"}
          </Heading>
          <SubHeading>YOUR 3 CHOSEN SKILLS</SubHeading>
          <View style={{ marginTop: 10 }}>
            <Text>
              Please explain your qualifications and/or experience. Be detailed,
              employers want to see how experienced and qualified you are and
              this is the place to impress them:
            </Text>
          </View>
          <View
            key={`${skillsData[index].skill_id}` || Math.random()}
            style={{ marginTop: 10 }}
          >
            <View
              style={[
                styles.labelContainer,
                { marginTop: 10, marginBottom: 10 }
              ]}
            >
              <View style={styles.innerContainer}>
                <TouchableOpacity
                  onPress={
                    skillsData[index].name
                      ? null
                      : () => navigate(RNC_SKILLS_LIST_ROUTE)
                  }
                  style={{ flex: skillsData[index].name ? 0 : 1 }}
                >
                  <Text style={styles.label}>
                    {skillsData[index].name || `Select Skill ${index + 1}`}
                  </Text>
                </TouchableOpacity>
                {skillsData[index].name ? (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      inputChanged(index, DELETE_SKILL_ACTION);
                      inputChanged(
                        selectedSkillPosition - 1,
                        SELECTED_SKILL_POSITION
                      );
                      navigate(RNC_SKILLS_LIST_ROUTE);
                    }}
                  >
                    <Image
                      style={styles.cancelImage}
                      source={require("../../assets/images/Common/cancel.png")}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <QuestionWithBox
                line={10}
                onChangeText={val => inputChanged(val, actions[index])}
                answer={skillsData[index].detail}
              />
            </View>
          </View>
        </View>
        <View key="footer">
          {loading ? (
            <View style={styles.spinnerContainer}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              rightBtnNavigation={
                isDetailFilled(skillsData[index])
                  ? index === 2
                    ? () => this.submit()
                    : () => this.updateIndex(index, true)
                  : null
              }
              leftBtnNavigation={
                index === 0 ? () => goBack(null) : () => this.updateIndex(index)
              }
              btnTxt={{
                leftBtnTxt: "PREVIOUS",
                rightBtnTxt: index < 2 ? "NEXT" : "FINISH"
              }}
            />
          )}
        </View>
      </Screen2>
    );
  }
}

const isDetailFilled = data => {
  let res = false;
  if (data.skill_id && data.detail) res = true;
  return res;
};

const mapStateToProps = ({
  stageZeroReducer: { apply_now },
  skillsListReducer: { skillsList },
  fetchedUserProfile,
  profileSkillsReducer: { skillsData, selectedSkill, selectedSkillPosition },
  submitInfoReducer: { loading }
}) => ({
  apply_now,
  skillsList,
  skillsData,
  selectedSkill,
  selectedSkillPosition,
  fetchedUserProfile,
  loading
});

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(SNCDetails);
