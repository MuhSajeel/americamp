/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

import {
  Screen,
  SubHeading,
  FooterWithButtons,
  Heading,
  DateAndTimePicker,
  Spinner
} from '../../../../components/common';
import {
  APP_COLOR,
  OUTBOUND_INFO,
  STAGE_FOUR,
  INBOUND_DEPARTURE_CHANGED,
  INBOUND_AIRLINE_CHANGED,
  INBOUND_FLIGHT_CHANGED
} from '../../../../constants';

import { styles } from './styles';

import { inputChanged, infoSubmited } from '../../../../redux/actions';

// eslint-disable-next-line react/prefer-stateless-function
class InboundInfo extends Component {
  infoSubmit() {
    const data = this.props.fetchedUserProfile;
    data.flight_info = this.props.FlightInfoReducer;
    this.props.infoSubmited(data);
  }

  render() {
    const {
      navigation: { navigate },
      outbound_departure,
      inbound_departure,
      inbound_airline,
      inbound_flight,

      // eslint-disable-next-line no-shadow
      inputChanged,
      loading
    } = this.props;
    return (
      <Screen>
        <View key="header" />
        <View key="content">
          <Heading>
            PLEASE ENTER YOUR <Text style={{ color: APP_COLOR }}>INBOUND</Text>{' '}
            FLIGHT INFO
          </Heading>
          <SubHeading>THIS IS WHEN YOU&apos;RE COMING BACK</SubHeading>
          <View>
            <DateAndTimePicker
              date={inbound_departure}
              mode="date"
              androidMode="default"
              placeholder="DEPARTURE DATE HERE"
              format="DD-MM-YYYY"
              minDate={outbound_departure}
              unHighlight
              onDateChange={text =>
                inputChanged(text, INBOUND_DEPARTURE_CHANGED)
              }
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={{height:50}}
              placeholder="AIRLINE HERE"
              onChangeText={text => inputChanged(text, INBOUND_AIRLINE_CHANGED)}
              value={inbound_airline}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={{height:50}}
              placeholder="FLIGHT NUMBER HERE"
              onChangeText={text => inputChanged(text, INBOUND_FLIGHT_CHANGED)}
              value={inbound_flight}
            />
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
              Spotted something wrong with this info?
            </Text>
            <Text style={{ marginTop: 5 }}>
              If so, get in touch and we’ll see what we can sort, if you’re
              happy simply click
              <Text style={{ fontWeight: 'bold' }}>‘continue’</Text> below.
            </Text>
          </View>
        </View>
        <View key="footer">
          {loading ? (
            <View style={styles.spinnerContainer}>
              <Spinner />
            </View>
          ) : (
              <FooterWithButtons
                leftBtnNavigation={() => navigate(OUTBOUND_INFO)}
                rightBtnNavigation={
                  inbound_departure && inbound_airline && inbound_flight
                    ? () => this.infoSubmit(STAGE_FOUR)
                    : null
                }
                btnTxt={{ leftBtnTxt: 'CANCEL', rightBtnTxt: 'FINISHED' }}
              />
            )}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  FlightInfoReducer,
  FlightInfoReducer: { outbound_departure, inbound_departure, inbound_airline, inbound_flight },
  submitInfoReducer,
  fetchedUserProfile
}) => {
  return {
    FlightInfoReducer,
    outbound_departure,
    inbound_departure,
    inbound_airline,
    inbound_flight,
    submitInfoReducer,
    loading: submitInfoReducer.loading,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(InboundInfo);
