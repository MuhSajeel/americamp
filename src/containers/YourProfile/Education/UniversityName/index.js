/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { universityNameAction } from '../../../../redux/actions/educationActions';

import { Screen, FooterWithButtons, Input, Heading } from '../../../../components/common';

import { styles } from './styles';
import { COURSE_DEGREE_NAV, ADDITIONAL_INFO_NAV } from '../../../../constants';

class UniversityName extends Component {
  state = { name: '' };

  componentWillMount() {
    const { name_of_university } = this.props;
    this.setState({ name: name_of_university });
  }

  navigateRight() {
    const {
      navigation: { navigate },
    } = this.props;
    const { name } = this.state;
    this.props.universityName(name);
    navigate(ADDITIONAL_INFO_NAV);
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const { name } = this.state;
    const { inputContainer } = styles;
    return (
      <Screen>
        <View key="header">
          <Heading>NAME OF COLLEGE/UNIVERSITY YOU ATTEND?</Heading>
        </View>
        <View key="content">
          <View>
            <View style={inputContainer}>
              <Input
                autoFocus={Platform.OS === 'android'}
                onChangeText={universityName => this.setState({ name: universityName })}
                value={name}
              />
            </View>
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(COURSE_DEGREE_NAV)}
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
    universityName: payload => {
      dispatch(universityNameAction(payload));
    },
  };
};

const mapStateToProps = ({ educationReducer }) => {
  const { name_of_university } = educationReducer;
  return { name_of_university };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UniversityName);
