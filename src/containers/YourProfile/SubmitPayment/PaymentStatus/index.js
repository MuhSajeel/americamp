/* eslint-disable no-shadow,no-nested-ternary */
/* eslint-disable camelcase */
import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { connect } from "react-redux";

import {
  Card,
  BottomButtonLeft,
  BottomButtonRight,
  Spinner
} from "../../../../components/common";
import {
  ApplicationStatusSceen,
  StageProgressSection
} from "../../../../components/YourProfileScreens";
import { inputChanged } from "../../../../redux/actions";
import { getPaymentFlow } from "../../../../helpers/GetPaymentFlow";
import {
  STAGES_ID,
  DASHBOARD,
  SUBMIT_PAYMENT_BOARDING,
  CURRENT_PAYMENT_STAGE_CHANGE,
  PAYMENT_TRANSACTIONS,
  GET_TRANSACTIONS,
  RETURN_TO_CAMP
} from "../../../../constants";
import { MiddleButton } from "../../../../components/PaymentOptions";
import {
  isPaid,
  isPaymentEnable,
  setRoute
} from "../../../../helpers/PaymentNavDesicion";

class PaymentStatus extends Component {
  state = { nextNav: SUBMIT_PAYMENT_BOARDING, navData: {} };

  componentDidMount() {
    const {
      apply_now: { application_type },
      Transactions,
      inputChanged,
      navigation,
      stageProgress,
      interview: { status }
    } = this.props;
    const renderData = getPaymentFlow(application_type);
    const renderArray = Object.entries(renderData[0]);
    setRoute(
      application_type,
      Transactions,
      renderArray,
      (obj, route) => inputChanged(obj, route),
      obj => this.setState(obj),
      stageProgress,
      status
    );
  }
  navigateToTransactions() {
    const { inputChanged } = this.props;
    inputChanged({ isNavigate: true }, GET_TRANSACTIONS);
  }

  render() {
    const {
      navigation: { navigate },
      apply_now: { application_type },
      Transactions,
      gettingTransactions,
      inputChanged,
      stageProgress,
      stageProgress: { stage0, stage1, stage2, stage3, stage4 },
      interview: { status },
      paying
    } = this.props;
    const stage_progress = [stage0, stage1, stage2, stage3, stage4];
    console.log(stage_progress);
    const { nextNav, navData } = this.state;
    const renderData = getPaymentFlow(application_type);
    const renderArray = Object.entries(renderData[0]);
    console.log(renderArray, Transactions);
    // const paid = isPaid(renderArray, Transactions, stageProgress);
    console.log("navData", navData, nextNav);

    return (
      <Card>
        <View key="content">
          {gettingTransactions ? null : (
            <ApplicationStatusSceen title="YOUR PAYMENT STATUS">
              {gettingTransactions ? (
                <Spinner />
              ) : (
                <>
                  {renderArray.map((stage, i) => {
                    const { name, title, id, prevId } = stage[1];
                    const isEnable = isPaymentEnable(
                      stageProgress,
                      name,
                      Transactions,
                      status,
                      application_type
                    );
                    return (
                      <StageProgressSection
                        key={`${title}_${id}`}
                        label={
                          name === "Stage 4"
                            ? title
                            : application_type === RETURN_TO_CAMP &&
                              name === "Stage 2"
                            ? "Stage 3"
                            : name
                        }
                        progress={
                          Transactions.find(val => val.stage_id === id)
                            ? 100
                            : 0
                        }
                        navigate={
                          !isEnable[stage[0]]
                            ? null
                            : () => {
                                inputChanged(
                                  {
                                    currentPaymentStage: stage[0],
                                    currentPaymentStageTitle: title
                                  },
                                  CURRENT_PAYMENT_STAGE_CHANGE
                                );
                                navigate(SUBMIT_PAYMENT_BOARDING, {
                                  dataNav: stage[0]
                                });
                              }
                        }
                      />
                    );
                  })}
                </>
              )}
            </ApplicationStatusSceen>
          )}
          <MiddleButton
            text="SEE ALL TRANSACTIONS"
            onPress={
              gettingTransactions || paying
                ? null
                : () => this.navigateToTransactions()
            }
          >
            {gettingTransactions ? (
              <Spinner />
            ) : (
              <Image
                style={{
                  height: 20,
                  width: 20
                }}
                source={require("../../../../assets/images/YourProfile/arrow.png")}
              />
            )}
          </MiddleButton>
        </View>

        {gettingTransactions ? (
          <View key="bottomLeft" />
        ) : (
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigate(DASHBOARD)}>
              HOME
            </BottomButtonLeft>
          </View>
        )}
        {gettingTransactions ? (
          <View key="bottomRight" />
        ) : (
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                nextNav === PAYMENT_TRANSACTIONS
                  ? () =>
                      inputChanged(
                        { isNavigate: true, backToDashboard: true },
                        GET_TRANSACTIONS
                      )
                  : () => navigate(nextNav, { dataNav: navData })
              }
            >
              NEXT
            </BottomButtonRight>
          </View>
        )}
      </Card>
    );
  }
}

const mapStateToProps = ({
  stageZeroReducer: { apply_now },
  transactionsReducer: { Transactions, gettingTransactions },
  stageProgress,
  submitInfoReducer: { paying },
  interview
}) => ({
  apply_now,
  Transactions,
  gettingTransactions,
  stageProgress,
  paying,
  interview
});

export default connect(
  mapStateToProps,
  { inputChanged }
)(PaymentStatus);
