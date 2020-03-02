/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { currentStudyAction } from '../../../../redux/actions';

import { Screen, FooterWithButtons, Input, Heading } from '../../../../components/common';

import { styles } from './styles';
import { CURRENT_OCCUPATION_TYPE_NAV, COURSE_DEGREE_NAV } from '../../../../constants';

class CurrentStudy extends Component {
  state = { currentStudy: '' };

  componentWillMount() {
    const { currently_studying } = this.props;
    this.setState({ currentStudy: currently_studying });
  }

  navigateRight() {
    const {
      navigation: { navigate },
    } = this.props;
    const { currentStudy } = this.state;
    this.props.currentStudy(currentStudy);
    navigate(COURSE_DEGREE_NAV);
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const { currentStudy } = this.state;
    const { inputContainer } = styles;
    return (
      <Screen>
        <View key="header">
          <Heading>WHAT ARE YOU CURRENTLY STUDYING?</Heading>
        </View>
        <View key="content">
          <View>
            <View style={inputContainer}>
              <Input
                autoFocus={Platform.OS === 'android'}
                onChangeText={study => this.setState({ currentStudy: study })}
                value={currentStudy}
              />
            </View>
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(CURRENT_OCCUPATION_TYPE_NAV)}
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
    currentStudy: payload => {
      dispatch(currentStudyAction(payload));
    },
  };
};

const mapStateToProps = ({ educationReducer }) => {
  const { currently_studying } = educationReducer;
  return { currently_studying };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentStudy);
