/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { courseTitleAction } from '../../../../redux/actions';

import { Screen, FooterWithButtons, Input, Heading } from '../../../../components/common';

import { styles } from './styles';
import { CURRENT_STUDY_NAV, COURSE_DEGREE_NAV } from '../../../../constants';

class CourseTitle extends Component {
  state = { courseTitle: '' };

  componentWillMount() {
    const { course_title } = this.props;
    this.setState({ courseTitle: course_title });
  }

  navigateRight() {
    const {
      navigation: { navigate },
    } = this.props;
    const { courseTitle } = this.state;
    this.props.currentStudy(courseTitle);
    navigate(COURSE_DEGREE_NAV);
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const { courseTitle } = this.state;
    const { inputContainer } = styles;
    return (
      <Screen>
        <View key="header">
          <Heading>WHAT IS THE COURSE TITLE?</Heading>
        </View>
        <View key="content">
          <View>
            <View style={inputContainer}>
              <Input
                autoFocus={Platform.OS === 'android'}
                onChangeText={title => this.setState({ courseTitle: title })}
                value={courseTitle}
              />
            </View>
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(CURRENT_STUDY_NAV)}
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
      dispatch(courseTitleAction(payload));
    },
  };
};

const mapStateToProps = ({ educationReducer }) => {
  const { course_title } = educationReducer;
  return { course_title };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseTitle);
