/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { inputChanged } from '../../../redux/actions';
import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  Spinner
} from '../../../components/common';
import { LABEL_COLOR, DASHBOARD, SAVE_CARD_INFO } from '../../../constants';
import styles from './styles';
import { InputScreen } from '../../../components/PersonalInformationScreens';

const cardInfo = {
  name_on_card: 'Jhon Doe',
  card_number: '4242424242424242',
  expiryYear: '22',
  expiryMonth: '01',
  cvv: '031'
};

class PaymentOptions extends Component {
  state = {
    name_on_card: '',
    card_number: '',
    expiryYear: '',
    expiryMonth: '',
    cvv: ''
  };

  componentWillMount() {
    const {
      paymentReducer: {
        name_on_card,
        card_number,
        expiryMonth,
        expiryYear,
        cvv
      }
    } = this.props;
    const cardDetails = this.props.navigation.getParam('removeDetails');
    if (!cardDetails) {
      if ((name_on_card && card_number && expiryMonth, expiryYear && cvv)) {
        this.setState({
          name_on_card,
          card_number,
          expiryMonth,
          expiryYear,
          cvv
        });
      }
    }
  }

  onSave() {
    const { inputChanged } = this.props;
    const {
      name_on_card,
      card_number,
      expiryYear,
      expiryMonth,
      cvv
    } = this.state;
    const Payment = {
      name_on_card,
      card_number,
      expiryMonth,
      expiryYear,
      cvv,
      last_four_digits: card_number.slice([...card_number].length - 4)
    };
    inputChanged(Payment, SAVE_CARD_INFO);
  }

  render() {
    const {
      name_on_card,
      card_number,
      expiryYear,
      expiryMonth,
      cvv
    } = this.state;
    const {
      loading,
      navigation: { navigate }
    } = this.props;
    return (
      <Screen>
        <View key='header'>
          <Heading>PAYMENT OPTIONS</Heading>
          <SubHeading extraStyling={{ fontSize: 25, color: LABEL_COLOR }}>
            SETUP YOUR PAYMENT METHOD
          </SubHeading>
        </View>
        <View key='content'>
          <InputScreen
            title='NAME ON CARD'
            titleStyle={{ ...styles.label, marginBottom: -10, marginTop: 20 }}
            onChangeText={text => this.setState({ name_on_card: text })}
            value={name_on_card}
            cancel={() => this.setState({ name_on_card: '' })}
          />
          <InputScreen
            title='CARD NUMBER'
            numeric
            noPlaceHolder
            titleStyle={{ ...styles.label, marginBottom: -10 }}
            onChangeText={text => this.setState({ card_number: text })}
            value={card_number}
            cancel={() => this.setState({ card_number: '' })}
          />
          <InputScreen
            title='EXPIRY YEAR'
            placeholder='YY'
            numeric
            noPlaceHolder
            maxLength={2}
            titleStyle={{ ...styles.label, marginBottom: -10 }}
            onChangeText={text => this.setState({ expiryYear: text })}
            value={expiryYear}
            cancel={() => this.setState({ expiryYear: '' })}
          />
          <InputScreen
            title='EXPIRY MONTH'
            placeholder='MM'
            numeric
            noPlaceHolder
            maxLength={2}
            titleStyle={{ ...styles.label, marginBottom: -10 }}
            onChangeText={text => this.setState({ expiryMonth: text })}
            value={expiryMonth}
            cancel={() => this.setState({ expiryMonth: '' })}
          />
          <InputScreen
            title='SECURITY CODE'
            placeholder=''
            maxLength={15}
            noPlaceHolder
            numeric
            titleStyle={{ ...styles.label, marginBottom: -10 }}
            onChangeText={text => this.setState({ cvv: text })}
            value={cvv}
            cancel={() => this.setState({ cvv: '' })}
          />
          <View style={styles.cardImageContainer}>
            <Image
              style={styles.cardsImage}
              source={require('../../../assets/images/PaymentOptions/payment.png')}
            />
          </View>
        </View>
        <View key='footer'>
          {loading ? (
            <Spinner />
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigate(DASHBOARD)}
              rightBtnNavigation={
                name_on_card && card_number && expiryMonth && expiryYear && cvv
                  ? () => this.onSave()
                  : null
              }
              btnTxt={{ leftBtnTxt: 'HOME', rightBtnTxt: 'SAVE' }}
            />
          )}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ paymentReducer }) => {
  const { loading } = paymentReducer;
  return { paymentReducer, loading };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(PaymentOptions);
