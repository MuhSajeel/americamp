/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../../../redux/actions';
import {
  Screen,
  SubHeading,
  FooterWithButtons,
  Heading,
  YesNoSelection,
  DateAndTimePicker,
} from '../../../../components/common';
import {
  INBOUND_INFO,
  APP_COLOR,
  STAGE_FOUR,
  OUTBOUND_FLIGHT_CHANGED,
  OUTBOUND_DEPARTURE_CHANGED,
  OUTBOUND_AIRLINE_CHANGED,
} from '../../../../constants';
import { styles } from './styles';
import { callOrText } from '../../../../helpers/communication';
import { getCurrentDate } from '../../../../helpers/GetCurrentDate';

class OutboundInfo extends Component {
  state = {
    CallOrText: null,
  };

  makeCallOrText(option) {
    const {
      urlLinkReducer: { americamp_phone_number },
    } = this.props;
    callOrText(option, americamp_phone_number);
    this.setState({ CallOrText: option });
  }

  render() {
    const { CallOrText } = this.state;
    const {
      navigation: { navigate },
      outbound_departure,
      outbound_airline,
      outbound_flight,
      // eslint-disable-next-line no-shadow
      inputChanged,
    } = this.props;

    return (
      <Screen>
        <View key="header" />
        <View key="content">
          <Heading>
            PLEASE ENTER YOUR <Text style={{ color: APP_COLOR }}>OUTBOUND</Text> FLIGHT INFO
          </Heading>
          <SubHeading>THIS IS WHEN YOU&apos;RE HEADING OFF</SubHeading>
          <View>
            <DateAndTimePicker
              date={outbound_departure}
              mode="date"
              androidMode="default"
              placeholder="DEPARTURE DATE HERE"
              format="DD-MM-YYYY"
              minDate={getCurrentDate()}
              unHighlight
              onDateChange={text => inputChanged(text, OUTBOUND_DEPARTURE_CHANGED)}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={{ height: 50 }}
              placeholder="AIRLINE HERE"
              onChangeText={text => inputChanged(text, OUTBOUND_AIRLINE_CHANGED)}
              value={outbound_airline}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={{ height: 50 }}
              placeholder="FLIGHT NUMBER HERE"
              onChangeText={text => inputChanged(text, OUTBOUND_FLIGHT_CHANGED)}
              value={outbound_flight}
            />
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
              Not booked your flights yet? No problem!
            </Text>
            <Text style={{ marginTop: 5, marginBottom: 10 }}>
              We can do that for you, just give our lovely team{' '}
              <Text style={{ fontWeight: 'bold' }}>a call</Text> or{' '}
              <Text style={{ fontWeight: 'bold' }}>a text</Text> and we can get that sorted for you!
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <YesNoSelection
              selected={CallOrText}
              onPress={val => this.makeCallOrText(val)}
              firstText="CALL"
              secondText="TEXT"
              textMargin={{ marginLeft: 30 }}
            />
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(STAGE_FOUR)}
            rightBtnNavigation={
              outbound_departure && outbound_airline && outbound_flight
                ? () => navigate(INBOUND_INFO)
                : null
            }
            btnTxt={{ leftBtnTxt: 'CANCEL', rightBtnTxt: 'CONTINUE' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  FlightInfoReducer: { outbound_departure, outbound_airline, outbound_flight },
  urlLinkReducer,
}) => {
  return {
    outbound_departure,
    outbound_airline,
    outbound_flight,
    urlLinkReducer,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(OutboundInfo);
