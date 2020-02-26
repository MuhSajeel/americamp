/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { degreeTypeAction } from '../../../../redux/actions';

import { Screen, Heading, FooterWithButtons } from '../../../../components/common';

import { styles } from './styles';

import { UNIVERSITY_NAME_NAV, GRADUATION_DATE_NAV } from '../../../../constants';

class DegreeType extends Component {
  state = { type: 1 };

  componentWillMount() {
    const { type_of_degree } = this.props;
    this.setState({ type: type_of_degree || 1 });
  }

  navigateRight() {
    const {
      navigation: { navigate },
    } = this.props;
    const { type } = this.state;
    this.props.degreeType(type);
    navigate(GRADUATION_DATE_NAV);
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
          <Heading>TYPE OF DEGREE YOU ARE STUDYING?</Heading>
        </View>
        <View key="content">
          <View>
            <View>
              <TouchableOpacity
                onPress={() => this.setState({ type: 1 })}
                style={type === 1 ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={type === 1 ? [btnText, selectedBtnText] : [btnText]}>
                  UNDERGRADUATE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ type: 3 })}
                style={type === 3 ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={type === 3 ? [btnText, selectedBtnText] : [btnText]}>MASTERS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ type: 2 })}
                style={type === 2 ? [btnStyle, selectedBtnStyle] : [btnStyle]}
              >
                <Text style={type === 2 ? [btnText, selectedBtnText] : [btnText]}>DOCTRATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(UNIVERSITY_NAME_NAV)}
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
    degreeType: payload => {
      dispatch(degreeTypeAction(payload));
    },
  };
};

const mapStateToProps = ({ educationReducer }) => {
  const { type_of_degree } = educationReducer;
  return { type_of_degree };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DegreeType);
