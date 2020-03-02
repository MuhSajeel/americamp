/* eslint-disable no-param-reassign,no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  Spinner
} from '../../../components/common';
import {
  LABEL_COLOR,
  PAYMENT_OPTIONS,
  APP_COLOR,
  DASHBOARD,
  DO_PAYMENT,
  GET_TRANSACTIONS,
  STAGES_ID,
  NEW_APPLICANT,
  RETURN_TO_CAMP
} from '../../../constants';
import { inputChanged } from '../../../redux/actions';
import {
  MiddleButton,
  PaymentCard,
  BottomSection,
  PaymentProgressSection
} from '../../../components/PaymentOptions';
import PopUpModal from '../../../components/common/PopUpModal';
import styles from './styles';

class DepositeAmount extends Component {
  state = { visible: false };

  openModal() {
    this.setState({ visible: true });
  }

  closeModal() {
    this.setState({ visible: false });
    this.props.navigation.navigate(DASHBOARD);
  }

  pay() {
    const { inputChanged, currentPaymentStage } = this.props;
    this.openModal();
    inputChanged({ stage: STAGES_ID[currentPaymentStage] }, DO_PAYMENT);
  }

  navigateToTransactions() {
    const { inputChanged } = this.props;
    inputChanged({ isNavigate: true }, GET_TRANSACTIONS);
  }

  render() {
    const { visible } = this.state;
    const {
      navigation: { navigate },
      apply_now: { application_type },
      last_four_digits,
      currentPaymentStage,
      currentPaymentStageTitle,
      stagsListReducer: { StagesList },
      gettingTransactions,
      paying,
      Transactions
    } = this.props;
    console.log(currentPaymentStage, StagesList);
    console.log(currentPaymentStageTitle);
    const Total_Fee =
      application_type === RETURN_TO_CAMP
        ? StagesList[0].due_amount + StagesList[2].due_amount
        : StagesList.reduce((acc, val) => acc + val.due_amount, 0);
    const AmountPaid = Transactions.reduce((acc, val) => acc + val.amount, 0);
    const { due_amount, returneeFee } = StagesList.filter(({ position }) => {
      if (
        application_type === RETURN_TO_CAMP &&
        currentPaymentStage === 'STAGE_TWO'
      ) {
        return position === STAGES_ID.STAGE_THREE;
      }
      return position === STAGES_ID[currentPaymentStage];
    })[0];
    console.log(due_amount, returneeFee);
    const amount =
      application_type === RETURN_TO_CAMP
        ? returneeFee || due_amount
        : due_amount;
    console.log(amount);
    console.log(Transactions, StagesList);
    return (
      <Screen>
        <View key='header'>
          <Heading>DEPOSIT AMOUNT</Heading>
          <SubHeading extraStyling={{ fontSize: 25, color: LABEL_COLOR }}>
            WE NEED{' '}
            <Text style={{ color: APP_COLOR }}>
              {' '}
              &pound;{amount ? Math.abs(amount) : 'XX'}.00{' '}
            </Text>{' '}
            FROM YOU TODAY
          </SubHeading>
        </View>
        <View key='content'>
          <PopUpModal
            visible={paying === false && visible}
            onPress={() => this.closeModal()}
            source={require('../../../assets/images/PaymentOptions/rocket_new.png')}
          />
          {/* Fee Break Down */}
          <BottomSection
            TITLE='FEE BREAKDOWN'
            deposit={amount}
            stageNumber={
              currentPaymentStage
                ? application_type === RETURN_TO_CAMP &&
                  currentPaymentStage === 'STAGE_TWO'
                  ? STAGES_ID.STAGE_THREE
                  : STAGES_ID[currentPaymentStage]
                : null
            }
            stageTitle={currentPaymentStageTitle || null}
            boldTitle={
              currentPaymentStage
                ? application_type === RETURN_TO_CAMP &&
                  currentPaymentStage === 'STAGE_TWO'
                  ? `Stage ${STAGES_ID.STAGE_THREE} Application`
                  : `Stage ${STAGES_ID[currentPaymentStage]} Application`
                : null
            }
          />
          {/* Payment Card */}
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text>
              Pay this using stored card info ending in&nbsp;
              {last_four_digits || 'XXXX'}
            </Text>
            <PaymentCard
              paying={paying}
              amountDue={amount ? Math.abs(amount) : null}
              onPress={
                amount && currentPaymentStage && !gettingTransactions
                  ? () => this.pay()
                  : null
              }
            />
            <TouchableOpacity
              onPress={() => navigate(PAYMENT_OPTIONS, { removeDetails: true })}
            >
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                Use another card?
              </Text>
            </TouchableOpacity>
          </View>
          {/* You Current Balance */}
          <SubHeading extraStyling={{ marginTop: 20, marginBottom: 10 }}>
            YOUR CURRENT BALANCE
          </SubHeading>
          <PaymentProgressSection totalAmount={Total_Fee} paid={AmountPaid} />
          <View style={{ marginBottom: 20 }} />
          {/* Payment Card End */}
          <MiddleButton
            text='SEE ALL TRANSACTIONS'
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
                style={styles.arrowImage}
                source={require('../../../assets/images/YourProfile/arrow.png')}
              />
            )}
          </MiddleButton>
        </View>
        <View key='footer'>
          <FooterWithButtons
            rightBtnNavigation={
              gettingTransactions || paying
                ? null
                : () => {
                    navigate(DASHBOARD);
                  }
            }
            btnTxt={{ rightBtnTxt: 'FINISH' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  paymentReducer: {
    last_four_digits,
    currentPaymentStage,
    currentPaymentStageTitle
  },
  stagsListReducer,
  submitInfoReducer: { paying },
  transactionsReducer: { gettingTransactions, Transactions },
  stageZeroReducer: { apply_now }
}) => {
  return {
    apply_now,
    last_four_digits,
    currentPaymentStage,
    currentPaymentStageTitle,
    stagsListReducer,
    paying,
    gettingTransactions,
    Transactions
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(DepositeAmount);
