/* eslint-disable camelcase,no-nested-ternary */
import { View } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import Toast from "react-native-simple-toast";

import { ShowNavigationBar } from "react-native-navigation-bar-color";
import { showHeader, enableHeader } from "../../../redux/actions";
import {
  BottomButtonLeft,
  BottomButtonRight,
  Card
} from "../../../components/common";
import {
  ApplicationStatusSceen,
  StageProgressSection
} from "../../../components/YourProfileScreens";
import {
  DASHBOARD,
  STAGE_ONE_NAV,
  STAGE_TWO_NAV,
  STAGE_THREE_NAV,
  STAGE_FOUR_NAV,
  APPLY_NOW_NAV,
  INTERVIEW_STATUS,
  STAGES_ID,
  INTERVIEW_STATUS_TITLE,
  RETURN_TO_CAMP,
  NEW_APPLICANT,
  DIRECT_PLACEMENT,
  BASE_URL,
  DEV_URL,
  STAGE_ONE_FORM,
  STAGE_TWO_FORM,
  STAGE_THREE_FORM,
  STAGE_FOUR_FORM
} from "../../../constants";
import styles from "./styles";

class YourApplicationStatus extends Component {
  state = { selectedStage: "" };

  componentDidMount() {
    const {
      userCurrentStageReducer: { position },
      apply_now: { application_type },
      status
    } = this.props;
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.props.showHeader();
        this.props.enableHeader();
        ShowNavigationBar();
        this.setState({ selectedStage: APPLY_NOW_NAV });
        if (this.props.stage0Progress === 100) {
          this.setState({ selectedStage: STAGE_ONE_NAV });
          if (
            this.props.stage1Progress === 100 &&
            (application_type === RETURN_TO_CAMP ||
              (position === STAGES_ID.STAGE_TWO ||
                status === INTERVIEW_STATUS.confirmed))
          ) {
            this.setState({ selectedStage: STAGE_TWO_NAV });
            if (this.props.stage2Progress === 100) {
              this.setState({ selectedStage: STAGE_THREE_NAV });
              if (this.props.stage3Progress === 100) {
                this.setState({ selectedStage: STAGE_FOUR_NAV });
                if (this.props.stage4Progress === 100) {
                  this.setState({ selectedStage: "" });
                }
              }
            }
          }
        }
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  shouldNavigateToStage(stage) {
    // TODO need some other logic
    const {
      stage0Progress,
      stage1Progress,
      stage2Progress,
      stage3Progress,
      stage4Progress
      // userCurrentStageReducer: { position },
    } = this.props;
    // const currentPosition = { position: position || 1 };
    const stages = [
      stage0Progress,
      stage1Progress,
      stage2Progress,
      stage3Progress,
      stage4Progress
    ];
    return stages[stage] === 100; // stage === currentPosition.position
  }

  render() {
    const { selectedStage } = this.state;
    const {
      navigation,
      stage0Progress,
      stage1Progress,
      stage2Progress,
      stage3Progress,
      stage4Progress,
      status,
      apply_now: { application_type }
    } = this.props;
    return (
      <View style={styles.container}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <ApplicationStatusSceen title="YOUR APPLICATION STATUS">
              <StageProgressSection
                label="INITIAL APPLICATION"
                progress={stage0Progress}
                navigate={
                  BASE_URL === DEV_URL
                    ? () => navigation.navigate(APPLY_NOW_NAV)
                    : !this.shouldNavigateToStage(0)
                    ? () => navigation.navigate(APPLY_NOW_NAV)
                    : null
                }
              />
              <StageProgressSection
                label="STAGE 1"
                progress={stage1Progress}
                navigate={
                  this.shouldNavigateToStage(0)
                    ? application_type === (NEW_APPLICANT || DIRECT_PLACEMENT)
                      ? INTERVIEW_STATUS_TITLE[status] !==
                          INTERVIEW_STATUS_TITLE[1] && stage1Progress === 100
                        ? () => navigation.navigate(STAGE_ONE_FORM)
                        : () => navigation.navigate(STAGE_ONE_NAV)
                      : stage1Progress === 100
                      ? () => navigation.navigate(STAGE_ONE_FORM)
                      : () => navigation.navigate(STAGE_ONE_NAV)
                    : null
                }
              />

              <StageProgressSection
                label="STAGE 2"
                progress={stage2Progress}
                navigate={
                  (application_type === RETURN_TO_CAMP
                  ? stage1Progress === 100
                  : status === INTERVIEW_STATUS.confirmed)
                    ? stage2Progress !== 100
                      ? () => navigation.navigate(STAGE_TWO_NAV)
                      : () => navigation.navigate(STAGE_TWO_FORM)
                    : stage1Progress === 100
                    ? () =>
                        //Toast.show(
                          application_type === RETURN_TO_CAMP
                            ? "You Have To Complete Stage One First"
                            : `Can not pass because your interview status is ${INTERVIEW_STATUS_TITLE[status]}`
                        )
                    : null
                }
              />
              <StageProgressSection
                label="STAGE 3"
                progress={stage3Progress}
                navigate={
                  this.shouldNavigateToStage(2)
                    ? stage3Progress !== 100
                      ? () => navigation.navigate(STAGE_THREE_NAV)
                      : () => navigation.navigate(STAGE_THREE_FORM)
                    : null
                }
              />
              <StageProgressSection
                label="STAGE 4"
                progress={stage4Progress}
                navigate={
                  this.shouldNavigateToStage(3)
                    ? stage4Progress !== 100
                      ? () => navigation.navigate(STAGE_FOUR_NAV)
                      : () => navigation.navigate(STAGE_FOUR_FORM)
                    : null
                }
              />
            </ApplicationStatusSceen>
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigation.navigate(DASHBOARD)}>
              HOME
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                selectedStage ? () => navigation.navigate(selectedStage) : null
              }
            >
              NEXT
            </BottomButtonRight>
          </View>
          {/* bottom end */}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({
  stageProgress,
  interview: { status },
  stageZeroReducer: { apply_now },
  userCurrentStageReducer
}) => {
  return {
    stage0Progress: stageProgress.stage0,
    stage1Progress: stageProgress.stage1,
    stage2Progress: stageProgress.stage2,
    stage3Progress: stageProgress.stage3,
    stage4Progress: stageProgress.stage4,
    status,
    apply_now,
    userCurrentStageReducer
  };
};

export default connect(
  mapStateToProps,
  { showHeader, enableHeader }
)(YourApplicationStatus);
