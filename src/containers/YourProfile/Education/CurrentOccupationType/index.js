/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { currentOccupationAction } from '../../../../redux/actions';

import { Screen, Heading, FooterWithButtons } from '../../../../components/common';

import { styles } from './styles';

import { NOTES_NAV, CURRENT_STUDY_NAV } from '../../../../constants';

class CurrentOccupationType extends Component {
  state = { type: 1 };

  componentWillMount() {
    const { current_occupation } = this.props;
    this.setState({ type: current_occupation || 1 });
  }

  navigateRight() {
    const {
      navigation: { navigate },
    } = this.props;
    const { type } = this.state;
    this.props.currentOccupationType(type);
    navigate(CURRENT_STUDY_NAV);
  }

  render() {
    const { type } = this.state;

    const {
      navigation: { navigate },
    } = this.props;
    const { btnStyle, btnText, selectedBtnStyle, selectedBtnText } = styles;
    return (
      <Screen>
        <View key="header">
          <Heading>WHAT IS YOUR CURRENT OCCUPATION?</Heading>
        </View>
        <View key="content">
          <View>
            <View>
              <TouchableOpacity
                onPress={() => this.setState({ type: 1 })}
                style={type === 1 ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={type === 1 ? [btnText, selectedBtnText] : [btnText]}>
                  STUDENT - FULL TIME
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ type: 2 })}
                style={type === 2 ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={type === 2 ? [btnText, selectedBtnText] : [btnText]}>
                  STUDENT - PART TIME
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ type: 3 })}
                style={type === 3 ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={type === 3 ? [btnText, selectedBtnText] : [btnText]}>
                  STUDENT - HIGH SCHOOL/6TH FORM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ type: 4 })}
                style={type === 4 ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={type === 4 ? [btnText, selectedBtnText] : [btnText]}>
                  EMPLOYED FULL TIME
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ type: 5 })}
                style={type === 5 ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={type === 5 ? [btnText, selectedBtnText] : [btnText]}>UNEMPLOYED</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(NOTES_NAV)}
            rightBtnNavigation={() => this.navigateRight()}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ educationReducer }) => {
  const { current_occupation } = educationReducer;
  return { current_occupation };
};

const mapDispatchToProps = dispatch => {
  return {
    currentOccupationType: payload => {
      dispatch(currentOccupationAction(payload));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentOccupationType);
