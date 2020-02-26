/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { ShowNavigationBar } from 'react-native-navigation-bar-color';

import { showHeader, inputChanged } from '../../../redux/actions';

import { FooterWithLogo, Heading, Spinner } from '../../../components/common';
import { BEFORE_WE_START_NAV, WHERE_DO_YOU_WANT_TO_GO, DASHBOARD } from '../../../constants';

import styles from './styles';

class WhereToGo extends Component {
  state = { AMERICA: 1, CANADA: 2 };

  componentDidMount() {
    if (Platform.OS === 'android') {
      ShowNavigationBar();
    }
    this.props.showHeader();
  }

  goAmerica() {
    const {
      navigation: { navigate },
      inputChanged,
    } = this.props;
    inputChanged(this.state.AMERICA, WHERE_DO_YOU_WANT_TO_GO);
    return navigate(BEFORE_WE_START_NAV, { theme: 'america' });
  }

  goCanada() {
    const {
      navigation: { navigate },
      inputChanged,
    } = this.props;
    inputChanged(this.state.CANADA, WHERE_DO_YOU_WANT_TO_GO);
    navigate(BEFORE_WE_START_NAV, { theme: 'canada' });
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const { Container, contentContainer, image, text } = styles;
    return (
      <View style={Container}>
        <View style={{ flex: 1 }}>
          <View style={contentContainer}>
            <Heading>FIRST OFF, WHERE DO YOU WANT TO GO?</Heading>
          </View>
          <TouchableOpacity onPress={() => this.goAmerica()}>
            <ImageBackground
              style={image}
              source={require('../../../assets/images/ApplyNow/aflag.jpg')}
            >
              <Text style={text}>AMERICA BABY!</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.goCanada()}>
            <ImageBackground
              style={image}
              source={require('../../../assets/images/ApplyNow/cflag.jpg')}
            >
              <Text style={text}>CANADA ALL THE WAY!</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={contentContainer}>
          <FooterWithLogo
            navigate={() => navigate(DASHBOARD)}
            btnTxt={{ leftBtnTxt: 'HOME' }}
            teaLogo
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  stageZeroReducer: {
    apply_now_submit: { where_you_want_to_go },
  },
}) => {
  return {
    where_you_want_to_go,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, showHeader }
)(WhereToGo);
