/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';

import { hideHeader, onSplashAction, fetchUserProfileOnBoarding } from '../../redux/actions';
import BoardingButtons from './BoardingButtons';
import styles from './styles';
import OnboardingData from '../../assets/data/Onboarding.json';
import IndicatorAndLogo from './IndicatorAndLogo';
import { Splash_Screen } from './SplashScreen';
import { DASHBOARD } from '../../constants';

const { width } = Dimensions.get('window');

class OnboardingScreen extends Component {
  state = { update: '' };

  scrollView = '';

  scrollX = new Animated.Value(0);

  componentDidMount() {
    const { hideHeader, fetchUserProfileOnBoarding } = this.props;
    fetchUserProfileOnBoarding({ callingRoute: DASHBOARD });
    hideHeader();
  }

  getImage = image => {
    switch (image) {
      case '1':
        return require('../../assets/images/Onboarding/1.png');
      case '2':
        return require('../../assets/images/Onboarding/2.png');
      case '3':
        return require('../../assets/images/Onboarding/3.png');
      default:
        return null;
    }
  };

  renderOnboarding() {
    const { upperContainer, imageStyle, textContainer, title, text } = styles;
    return OnboardingData.map(data => (
      <View key={Math.random()} style={upperContainer}>
        <Image
          style={imageStyle}
          source={this.getImage(data.image)}
          resizeMode="stretch"
          resizeMethod="auto"
        />
        <View style={textContainer}>
          <Text style={title}>{data.title}</Text>
          <Text style={text}>{data.text}</Text>
        </View>
      </View>
    ));
  }

  render() {
    if (Platform.OS === 'android') StatusBar.setTranslucent(true);
    const position = Animated.divide(this.scrollX, width);
    const {
      navigation: { navigate },
      loading,
      showBoarding,
    } = this.props;
    const { container, scrollContainer } = styles;
    return (
      <>
        {loading || !showBoarding ? (
          <Splash_Screen />
        ) : (
          <View style={container}>
            <ScrollView
              style={scrollContainer}
              horizontal
              pagingEnabled
              ref={ref => {
                this.scrollView = ref;
              }}
              onMomentumScrollEnd={() => this.setState({ update: '' })}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
              scrollEventThrottle={16}
            >
              {this.renderOnboarding()}
            </ScrollView>
            {Math.ceil(this.scrollX._value) === Math.ceil(2 * width) ? (
              <BoardingButtons navigate={navigate} />
            ) : (
              <IndicatorAndLogo
                OnboardingData={OnboardingData}
                scrollX={this.scrollX}
                width={width}
                scrollTo={loc => this.scrollView.scrollTo(loc)}
                position={position}
                update={() => this.setState({ update: '' })}
                scrollXChange={value => {
                  this.scrollX = new Animated.Value(value);
                }}
              />
            )}
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ splashScreenReducer: { loading, showBoarding } }) => ({
  loading,
  showBoarding,
});

export default connect(
  mapStateToProps,
  { hideHeader, onSplashAction, fetchUserProfileOnBoarding }
)(OnboardingScreen);
