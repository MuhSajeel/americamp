/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import Toast from "react-native-simple-toast";

import {
  Screen,
  Heading,
  ProgressSection,
  ViewButton,
  FooterWithButtons
} from "../../../components/common";
import styles from "./styles";
import {
  DASHBOARD,
  GO_TO_CANADA,
  INTERVIEW_ERROR_MSG,
  VIEW_DOCUMENTS_SCREEN
} from "../../../constants";

import { selectAppFlow } from "../../../helpers/AppFlow";
import { inputChanged, fetchInterviewStatus } from "../../../redux/actions";
import { selectPaymentNav } from "../../../helpers/PaymentNavDesicion";

class StageOne extends Component {
  checkToScheduleInterview(formsList, formsStatus, whereTo) {
    const requiredFormsList =
      whereTo === GO_TO_CANADA
        ? formsList.filter(
            val => val.id !== "visa_informations" && val.id !== "interview"
          )
        : formsList.filter(val => val.id !== "interview");
    const result = requiredFormsList
      .map(form => formsStatus[form.id])
      .filter(val => val);
    if (result.length === requiredFormsList.length)
      return this.props.fetchInterviewStatus();
    return Toast.show(INTERVIEW_ERROR_MSG);
  }

  render() {
    const {
      navigation: { navigate },
      stage1Progress,
      Transactions,
      inputChanged,
      formsStatus,
      Document,
      apply_now: { role, application_type, where_you_want_to_go }
    } = this.props;

    const { progressSection } = styles;
    const data = selectAppFlow(role, application_type);
    console.log("DAta", data);
    return (
      <Screen>
        <View key="header">
          <Heading>YOUR PROFILE</Heading>
          <ProgressSection
            style={progressSection}
            progress={stage1Progress}
            progressTitle="STAGE ONE PROGRESS"
          />
        </View>
        <View key="content">
          {data[0].stage1.map(({ name, route, id }, i) => {
            return where_you_want_to_go === GO_TO_CANADA &&
              id === "visa_informations" ? null : (
              <ViewButton
                key={`${name}_${i * 2}`}
                onPress={
                  //  eslint-disable-next-line no-nested-ternary
                  name === "Upload Profile Image" && formsStatus[id]
                    ? () =>
                        navigate(VIEW_DOCUMENTS_SCREEN, {
                          urlList: Document.photograph_upload,
                          viewOption: "photograph_upload",
                          route
                        })
                    : // eslint-disable-next-line no-nested-ternary
                    name === "Book Interview"
                    ? () =>
                        this.checkToScheduleInterview(
                          data[0].stage1,
                          formsStatus,
                          where_you_want_to_go
                        )
                    : // eslint-disable-next-line no-nested-ternary
                    name === "Payment"
                    ? () =>
                        selectPaymentNav(
                          Transactions[0],
                          null,
                          navigate,
                          inputChanged,
                          "STAGE_ONE",
                          "Deposit",
                          (data, route) => inputChanged(data, route)
                        )
                    : () => navigate(route)
                }
                done={formsStatus[id]}
              >
                {name}
              </ViewButton>
            );
          })}
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => {
              navigate(DASHBOARD);
            }}
            btnTxt={{ leftBtnTxt: "HOME" }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  stageProgress,
  formsStatus,
  Document,
  stageZeroReducer: { apply_now },
  transactionsReducer: { Transactions }
}) => {
  return {
    stage1Progress: stageProgress.stage1,
    formsStatus,
    Document,
    apply_now,
    Transactions
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, fetchInterviewStatus }
)(StageOne);
