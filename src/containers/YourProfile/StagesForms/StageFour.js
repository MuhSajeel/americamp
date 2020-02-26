import React, { Component } from 'react';
import { View, BackHandler, ScrollView, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';

import { Heading, BottomButtonLeft } from '../../../components/common';
import { FormDetail } from '../../../components/YourProfileScreens/Form/index';
import styles from './styles';
import {
  APPLICATION_STATUS,
  DIRECT_PLACEMENT,
  BLACK_COLOR,
  APP_COLOR,
  PLACEHOLDER_COLOR
} from '../../../constants';

const { width } = Dimensions.get('window');

class StageFourForm extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate(APPLICATION_STATUS);
    return true;
  };

  renderData = data => {
    return data.map(item => {
      return (
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: width * 0.8,
              aspectRatio: 1,
              borderColor: BLACK_COLOR,
              borderWidth: 1
            }}
            source={{
              uri: item
            }}
            resizeMode='stretch'
            indicator={Progress.Pie}
            indicatorProps={{
              borderWidth: 0,
              color: APP_COLOR,
              unfilledColor: PLACEHOLDER_COLOR
            }}
            resizeMethod='resize'
            key={item}
          />
        </View>
      );
    });
  };

  render() {
    const {
      navigation: { navigate },
      fetchedUserProfile: { flight_info, documents, apply_now }
    } = this.props;
    const { screenContainer, buttonContainer, bottomLine } = styles;
    const {
      outbound_departure,
      outbound_airline,
      outbound_flight,
      inbound_departure,
      inbound_airline,
      inbound_flight
    } = flight_info;
    const { camp_contract } = documents;
    const { application_type } = apply_now;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={screenContainer}>
            <View style={{ alignItems: 'center' }}>
              <Heading>Stage 4</Heading>
            </View>

            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ paddingVertical: 10, fontSize: 40 }}>
                Flight Information
              </Heading>
              <Heading extraStyling={{ fontSize: 30, lineHeight: 30 }}>
                Outbound Flight Info
              </Heading>
              <FormDetail title="This is when you're heading off" />
              <FormDetail
                value={outbound_departure}
                question='DEPARTURE DATE'
              />
              <FormDetail question='AIRLINE' value={outbound_airline} />
              <FormDetail question='FLIGHT NUMBER' value={outbound_flight} />
              <Heading extraStyling={{ fontSize: 30, lineHeight: 30 }}>
                Inbound Flight Info
              </Heading>
              <FormDetail title="This is when you're coming back" />
              <FormDetail value={inbound_departure} question='DEPARTURE DATE' />
              <FormDetail question='AIRLINE' value={inbound_airline} />
              <FormDetail question='FLIGHT NUMBER' value={inbound_flight} />
            </View>
            {application_type != DIRECT_PLACEMENT ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ paddingVertical: 10, fontSize: 40 }}>
                  Camp Contract
                </Heading>
                {this.renderData(camp_contract)}
              </View>
            ) : null}
            <View style={bottomLine} />
          </View>
        </ScrollView>
        <View style={buttonContainer} key='bottomLeft'>
          <BottomButtonLeft onPress={() => navigate(APPLICATION_STATUS)}>
            Back
          </BottomButtonLeft>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    fetchedUserProfile: state.fetchedUserProfile
  };
};

export default connect(mapStateToProps)(StageFourForm);
