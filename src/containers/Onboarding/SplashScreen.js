/* eslint-disable camelcase */
import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { Spinner } from '../../components/common';
import { hideHeader } from '../../redux/actions';

class splashScreen extends Component {
  componentDidMount() {
    this.props.hideHeader();
    SplashScreen.hide();
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/Background/handheart1_overlay.jpg')}
        style={{ height: '100%', width: '100%', resizeMethod: 'auto' }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner />
        </View>
      </ImageBackground>
    );
  }
}

const Splash_Screen = connect(
  null,
  { hideHeader }
)(splashScreen);

export { Splash_Screen };
