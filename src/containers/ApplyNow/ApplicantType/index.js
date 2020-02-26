/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { Screen, FooterWithButtons, ApplyButton } from '../../../components/common';

import { americaTheme, canadaTheme, inputChanged } from '../../../redux/actions';

import { styles } from './styles';
import {
  ROLE_APPLY_FOR_NAV,
  APPLY_STATUS,
  STAGE0_PROGRESS_CHANGED,
  BEFORE_WE_START_NAV,
} from '../../../constants';

class ApplicantType extends Component {
  state = {
    New_Applicant: 1,
    Return_To_Camp: 2,
    Direct_Placement: 3,
    isSelected: false,
  };

  componentWillMount() {
    const { navigation, americaTheme: setAmericaTheme, canadaTheme: setCanadaTheme } = this.props;
    const theme = navigation.getParam('theme');
    return theme === 'canada' ? setCanadaTheme() : setAmericaTheme();
  }

  updateState(payload) {
    const { inputChanged } = this.props;
    this.setState({ isSelected: true });
    inputChanged(payload, APPLY_STATUS);
    // inputChanged(100, STAGE0_PROGRESS_CHANGED);
  }

  render() {
    const { New_Applicant, Return_To_Camp, Direct_Placement, isSelected } = this.state;
    const {
      navigation,
      navigation: { navigate },
      application_type,
      where_you_want_to_go,
    } = this.props;
    const theme = navigation.getParam('theme');
    const {
      contentContainer,
      heading,
      primaryColor,
      btnStyle,
      btnAmerica,
      btnCanada,
      themeAmerica,
      themeCanada,
      btnText,
      selectedBtnText,
    } = styles;
    const selectedBtnStyle = theme === 'canada' ? btnCanada : btnAmerica;
    const headerColor = theme === 'canada' ? themeCanada : themeAmerica;
    return (
      <Screen>
        <View key="content">
          <View style={contentContainer}>
            <Text style={[heading, headerColor]}>
              {where_you_want_to_go === 1 ? 'Americamp' : 'Americamp Canada'}
            </Text>
            <Text style={[heading, primaryColor]}>New applicants</Text>
            <ApplyButton
              buttonStyle={
                application_type === New_Applicant ? [btnStyle, selectedBtnStyle] : [btnStyle]
              }
              textStyle={
                application_type === New_Applicant ? [btnText, selectedBtnText] : [btnText]
              }
              onPress={() => this.updateState(New_Applicant, theme)}
            />
          </View>
          <View style={contentContainer}>
            <Text style={[heading, headerColor]}>
              {where_you_want_to_go === 1 ? 'Americamp' : 'Americamp Canada'}
            </Text>
            <Text style={[heading, primaryColor]}>Return to camp</Text>
            <ApplyButton
              buttonStyle={
                application_type === Return_To_Camp ? [btnStyle, selectedBtnStyle] : [btnStyle]
              }
              textStyle={
                application_type === Return_To_Camp ? [btnText, selectedBtnText] : [btnText]
              }
              onPress={() => this.updateState(Return_To_Camp, theme)}
            />
          </View>
          <View style={contentContainer}>
            <Text style={[heading, headerColor]}>
              {where_you_want_to_go === 1 ? 'Americamp' : 'Americamp Canada'}
            </Text>
            <Text style={[heading, primaryColor]}>Direct Placement</Text>
            <ApplyButton
              buttonStyle={
                application_type === Direct_Placement ? [btnStyle, selectedBtnStyle] : [btnStyle]
              }
              textStyle={
                application_type === Direct_Placement ? [btnText, selectedBtnText] : [btnText]
              }
              onPress={() => this.updateState(Direct_Placement, theme)}
            />
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(BEFORE_WE_START_NAV)}
            rightBtnNavigation={
              application_type || isSelected ? () => navigate(ROLE_APPLY_FOR_NAV, { theme }) : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  stageZeroReducer: {
    apply_now_submit: { medical_condition, criminal_background, application_type, where_you_want_to_go },
  },
}) => {
  return {
    medical_condition,
    criminal_background,
    application_type,
    where_you_want_to_go,
  };
};

export default connect(
  mapStateToProps,
  { americaTheme, canadaTheme, inputChanged }
)(ApplicantType);
