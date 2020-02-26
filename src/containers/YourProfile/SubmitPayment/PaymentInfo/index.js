/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Screen, FooterWithButtons, Spinner } from '../../../../components/common';
import { DASHBOARD, GET_STAGES_LIST } from '../../../../constants';
import { inputChanged } from '../../../../redux/actions';
import text from './text.json';
import styles from './styles';

const PaymentInfo = ({ navigation, stripe_customer_id, inputChanged, loading }) => {
  const { navigate } = navigation;
  const { bold, para } = styles;
  const { bold1, para2, para4, bold2 } = text[0];
  return (
    <Screen>
      <View key="content">
        <Text style={bold}>{bold1}</Text>
        <Text style={para}>{para2}</Text>
        <Text style={para}>
          This is only <Text style={{ fontWeight: 'bold' }}>£50</Text> and is fully refundable if
          you are not accepted into the program after the interview stage.
        </Text>
        <Text style={para}>{para4}</Text>
        <Text style={bold}>{bold2}</Text>
      </View>
      <View key="footer">
        {loading ? (
          <Spinner />
        ) : (
          <FooterWithButtons
            leftBtnNavigation={() => navigate(DASHBOARD)}
            rightBtnNavigation={() => {
              inputChanged({ stripe_customer_id }, GET_STAGES_LIST);
            }}
            btnTxt={{ leftBtnTxt: 'FINISH', rightBtnTxt: 'PROCEED' }}
          />
        )}
      </View>
    </Screen>
  );
};

const mapStateToProps = ({
  paymentReducer: { stripe_customer_id },
  stagsListReducer: { loading },
}) => {
  return { stripe_customer_id, loading };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(PaymentInfo);
