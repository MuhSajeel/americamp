/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { Screen, Heading, FooterWithButtons, Spinner } from '../../../components/common';

import { americaTheme, canadaTheme, inputChanged } from '../../../redux/actions';

import { styles } from './styles';

import {
  APPLICANT_TYPE_NAV,
  ROLE_APPLYING_FOR,
  STAGE_ZERO_SUBMIT,
  STAGE0_PROGRESS_CHANGED,
  COPY_TO_APPLY_NOW,
} from '../../../constants';

class RoleApplyFor extends Component {
  state = { Camp_Counselor: 1, Support_Staff: 2, isSelected: false };

  componentWillMount() {
    const { americaTheme: setAmericaTheme } = this.props;
    // const theme = navigation.getParam('theme');
    return setAmericaTheme();
  }

  updateState(payload) {
    const { inputChanged } = this.props;
    this.setState({ isSelected: true });
    inputChanged(payload, ROLE_APPLYING_FOR);
    // inputChanged(100, STAGE0_PROGRESS_CHANGED);
  }

  submitInfo() {
    const {
      inputChanged,
      stageZeroReducer: { apply_now_submit, apply_now },
    } = this.props;
    apply_now_submit.id = apply_now.id;
    inputChanged(apply_now_submit, COPY_TO_APPLY_NOW);
    inputChanged({ apply_now: apply_now_submit }, STAGE_ZERO_SUBMIT);
  }

  render() {
    const { Camp_Counselor, Support_Staff, isSelected } = this.state;
    const {
      navigation: { navigate },
      role,
      loading,
    } = this.props;
    const {
      buttonContainer,
      btnStyle,
      btnText,
      textContainer,
      paragraphText,
      btnAmerica,
      selectedBtnText,
    } = styles;
    const selectedBtnStyle = btnAmerica;
    return (
      <Screen>
        <View key="header">
          <Heading>WHAT ROLE DO YOU WANT TO APPLY FOR?</Heading>
        </View>
        <View key="content">
          <View>
            <TouchableOpacity
              onPress={() => this.updateState(Camp_Counselor)}
              style={role === Camp_Counselor ? [btnStyle, selectedBtnStyle] : [btnStyle]}
            >
              <Text style={role === Camp_Counselor ? [btnText, selectedBtnText] : [btnText]}>
                Camp Counselor
              </Text>
            </TouchableOpacity>
          </View>
          <View style={textContainer}>
            <Text style={paragraphText}>
              You do not need to be a student. Have a skill you&apos;d love to teach? Do you enjoy
              working with kids? General counselor or specialist instructor this is the role for
              you!
            </Text>
          </View>
          <View style={buttonContainer}>
            <TouchableOpacity
              onPress={() => this.updateState(Support_Staff)}
              style={role === Support_Staff ? [btnStyle, selectedBtnStyle] : [btnStyle]}
            >
              <Text style={role === Support_Staff ? [btnText, selectedBtnText] : [btnText]}>
                Support Staff
              </Text>
            </TouchableOpacity>
          </View>
          <View style={textContainer}>
            <Text style={paragraphText}>
              Please note: Support staff need to be in full-time education. Office work, kitchen
              support or maintenance, camp can&apos;t function without an awesome behind the scenes
              team!
            </Text>
          </View>
        </View>
        <View key="footer">
          {loading ? (
            <View style={{ alignItems: 'flex-end' }}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigate(APPLICANT_TYPE_NAV)}
              rightBtnNavigation={role || isSelected ? () => this.submitInfo() : null}
              btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
            />
          )}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  stageZeroReducer: {
    apply_now_submit: { role },
    loading,
  },
  stageZeroReducer,
}) => {
  return {
    role,
    loading,
    stageZeroReducer,
  };
};

export default connect(
  mapStateToProps,
  { americaTheme, canadaTheme, inputChanged }
)(RoleApplyFor);
