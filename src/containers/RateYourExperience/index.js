/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, Linking, Platform, Share } from 'react-native';
import { connect } from 'react-redux';
import { AirbnbRating } from 'react-native-elements';

import { Heading, Screen, TextImageButton, FooterWithButtons } from '../../components/common';
import { inputChanged } from '../../redux/actions';
import { DASHBOARD, RATE } from '../../constants';
import Styles from './styles';

class RateYourExperience extends Component {
  onShare = async (ios_url, android_url) => {
    let message = android_url;
    if (Platform.OS === 'ios') message = ios_url;
    try {
      await Share.share({
        message,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  ratingOn(rating) {
    const { ios_url, android_url } = this.props;
    if (Platform.OS === 'ios') Linking.openURL(ios_url);
    else Linking.openURL(android_url);
    this.props.inputChanged({ rating }, RATE);
  }

  render() {
    const {
      navigation: { navigate, goBack },
      ios_url,
      android_url,
      feedback_page,
      rating,
    } = this.props;
    return (
      <Screen>
        <View key="header">
          <Heading>RATE YOUR EXPERIENCE</Heading>
        </View>
        <View key="content">
          <AirbnbRating
            count={5}
            reviews={['Rating: 1/5', 'Rating: 2/5', 'Rating: 3/5', 'Rating: 4/5', 'Rating: 5/5']}
            defaultRating={rating}
            size={55}
            onFinishRating={rate => this.ratingOn(rate)}
          />
          <Text style={Styles.itemHeading}>Share on social media</Text>
          <View style={Styles.buttonStyle}>
            <TextImageButton onPress={() => this.onShare(ios_url, android_url)} icon="share">
              SHARE THE APP
            </TextImageButton>
            <TextImageButton
              onPress={() => {
                Linking.openURL(feedback_page);
              }}
              icon="feedback"
            >
              COMPLAINTS / FEEDBACK
            </TextImageButton>
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(DASHBOARD)}
            rightBtnNavigation={() => goBack()}
            btnTxt={{ leftBtnTxt: 'HOME', rightBtnTxt: 'CLOSE' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  ratingReducer: { rating },
  urlLinkReducer: { ios_url, android_url, feedback_page },
}) => ({
  rating,
  ios_url,
  android_url,
  feedback_page,
});

export default connect(
  mapStateToProps,
  { inputChanged }
)(RateYourExperience);
