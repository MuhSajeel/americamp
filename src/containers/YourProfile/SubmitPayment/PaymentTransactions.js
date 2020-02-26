/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons
} from '../../../components/common';
import { LABEL_COLOR, DASHBOARD } from '../../../constants';
import { BottomSection } from '../../../components/PaymentOptions';
import styles from './styles';

const PaymentTransactions = ({ Transactions, navigation }) => {
  const toDashboard = navigation.getParam('toDashboard', false);
  console.log(toDashboard);
  const stageId = navigation.getParam('stageRouteId', 0);
  console.log('std', stageId);
  const transactionMessages = {
    1: 'Due Before Interview',
    2: 'Due within 14 Days of interview',
    3: 'Due 14 days after placement',
    0: null
  };
  return (
    <Screen>
      <View key='header'>
        <Heading>YOUR PAYMENT TRANSACTIONS</Heading>
        <SubHeading extraStyling={{ fontSize: 25, color: LABEL_COLOR }}>
          SEE YOUR SPEND AND FINANCES
        </SubHeading>
      </View>
      <View key='content'>
        {Transactions.map(({ amount, created_at, stage_id }) => {
          return (
            <View key={created_at}>
              <Text style={[styles.label, { marginTop: 20 }]}>
                {created_at ? dateFormatter(created_at) : 'DD/MM/YYYY'}
              </Text>
              <BottomSection
                deposit={amount}
                stageNumber={stage_id || null}
                stageTitle={transactionMessages[stage_id || 0]}
                paid
              />
            </View>
          );
        })}
      </View>
      <View key='footer'>
        <FooterWithButtons
          leftBtnNavigation={
            toDashboard
              ? () => navigation.navigate(DASHBOARD)
              : () => {
                  navigation.goBack(null);
                }
          }
          btnTxt={{ leftBtnTxt: 'CLOSE' }}
        />
      </View>
    </Screen>
  );
};

const dateFormatter = s => {
  const a = s.split('-');
  const b = a[2].split('T');
  const c = b[1].split('.');
  return `${b[0]}/${a[1]}/${a[0]}   ${c[0]}`;
};

const mapStateToProps = ({ transactionsReducer: { Transactions } }) => {
  return { Transactions };
};

export default connect(mapStateToProps)(PaymentTransactions);
