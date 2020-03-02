/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { currentOccupationTypeAction } from '../../../../redux/actions';

import { Screen, FooterWithButtons, Input, Heading } from '../../../../components/common';

import { styles } from './styles';
import { ADDITIONAL_INFO_NAV, PREVIOUS_OCCUPATION_NAV } from '../../../../constants';

class CurrentOccupation extends Component {
  state = { currentOccupation: '' };

  componentWillMount() {
    const { current_occupation_type } = this.props;
    this.setState({ currentOccupation: current_occupation_type });
  }

  navigateRight() {
    const {
      navigation: { navigate },
    } = this.props;
    const { currentOccupation } = this.state;
    this.props.currentOccupation(currentOccupation);
    navigate(PREVIOUS_OCCUPATION_NAV);
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const { currentOccupation } = this.state;
    const { inputContainer } = styles;
    return (
      <Screen>
        <View key="header">
          <Heading>WHAT IS YOUR CURRENT OCCUPATION?</Heading>
        </View>
        <View key="content">
          <View>
            <View style={inputContainer}>
              <Input
                autoFocus={Platform.OS === 'android'}
                onChangeText={occupation => this.setState({ currentOccupation: occupation })}
                value={currentOccupation}
              />
            </View>
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(ADDITIONAL_INFO_NAV)}
            rightBtnNavigation={() => this.navigateRight()}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    currentOccupation: payload => {
      dispatch(currentOccupationTypeAction(payload));
    },
  };
};

const mapStateToProps = ({ educationReducer }) => {
  const { current_occupation_type } = educationReducer;
  return { current_occupation_type };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentOccupation);
