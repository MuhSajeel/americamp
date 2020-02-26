/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { courseDegreeLevelAction } from '../../../../redux/actions';

import { Screen, Heading, FooterWithButtons } from '../../../../components/common';

import { styles } from './styles';

import { UNIVERSITY_NAME_NAV, COURSE_TITLE_NAV } from '../../../../constants';

class CourseDegree extends Component {
  state = { type: false };

  componentWillMount() {
    const { is_course_degree_level } = this.props;
    this.setState({ type: is_course_degree_level });
  }

  navigateRight() {
    const {
      navigation: { navigate },
    } = this.props;
    const { type } = this.state;
    this.props.courseDegreeLevel(type);
    navigate(UNIVERSITY_NAME_NAV);
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
          <Heading>IS THIS COURSE DEGREE LEVEL OR HIGHER?</Heading>
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
          <FooterWithButtons
            leftBtnNavigation={() => navigate(COURSE_TITLE_NAV)}
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
    courseDegreeLevel: payload => {
      dispatch(courseDegreeLevelAction(payload));
    },
  };
};

const mapStateToProps = ({ educationReducer }) => {
  const { is_course_degree_level } = educationReducer;
  return { is_course_degree_level };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDegree);
