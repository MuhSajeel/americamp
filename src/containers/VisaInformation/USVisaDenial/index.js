/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../../redux/actions';

import {
  Screen,
  Heading,
  FooterWithButtons,
  Spinner,
  SubHeading,
} from '../../../components/common';

import styles from './styles';
import {
  VISA_INFORMATION_VISA_TYPES,
  HAVE_VISA_DENIAL_ACTION,
  VISA_INFORMATION_VISA_DENIAL_DETAILS,
} from '../../../constants';

class USVisaDenial extends Component {
  state = { type: false };

  componentWillMount() {
    const {
      visaInformationReducer: { us_visa_denial },
    } = this.props;
    this.setState({ type: us_visa_denial });
  }

  navigateRight() {
    const {
      navigation: { navigate },
      inputChanged,
      infoSubmited,
      fetchedUserProfile,
      visaInformationReducer,
    } = this.props;
    const { type } = this.state;
    if (type) {
      inputChanged(type, HAVE_VISA_DENIAL_ACTION);
      navigate(VISA_INFORMATION_VISA_DENIAL_DETAILS);
    } else {
      const data = fetchedUserProfile;
      data.visa_informations = visaInformationReducer;
      infoSubmited(data);
    }
  }

  render() {
    const { type } = this.state;
    const {
      navigation: { navigate, goBack },
      loading,
    } = this.props;
    const { btnStyle, btnText, selectedBtnStyle, selectedBtnText } = styles;
    return (
      <Screen>
        <View key="header">
          <Heading>VISA APPLICATION</Heading>
          <SubHeading>HAVE YOU EVER HAD A UNITED STATES VISA DENIAL?</SubHeading>
        </View>
        <View key="content">
          <View>
            <View>
              <TouchableOpacity
                onPress={() => this.setState({ type: true })}
                style={type ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={type ? [btnText, selectedBtnText] : [btnText]}>YES</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ type: false })}
                style={!type ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={!type ? [btnText, selectedBtnText] : [btnText]}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View key="footer">
          {loading ? (
            <View style={{ alignItems: 'flex-end' }}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => goBack()}
              rightBtnNavigation={() => this.navigateRight()}
              btnTxt={{
                leftBtnTxt: 'PREVIOUS',
                rightBtnTxt: type ? 'NEXT' : 'FINISH',
              }}
            />
          )}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  visaInformationReducer,
  fetchedUserProfile,
  submitInfoReducer: { loading },
}) => {
  return { visaInformationReducer, fetchedUserProfile, loading };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(USVisaDenial);
