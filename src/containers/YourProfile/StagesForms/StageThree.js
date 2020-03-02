import React, { Component } from 'react';
import { View, BackHandler, ScrollView, Image, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { Heading, BottomButtonLeft } from '../../../components/common';
import styles from './styles';
import {
  APPLICATION_STATUS,
  BLACK_COLOR,
  APP_COLOR,
  PLACEHOLDER_COLOR
} from '../../../constants';

const { width } = Dimensions.get('window');

class StageThreeForm extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate(APPLICATION_STATUS);
    return true;
  };

  renderData = data => {
    return data.map(item => {
      return (
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: width * 0.8,
              aspectRatio: 1,
              borderColor: BLACK_COLOR,
              borderWidth: 1
            }}
            source={{
              uri: item
            }}
            resizeMode='stretch'
            resizeMode='stretch'
            indicator={Progress.Pie}
            indicatorProps={{
              borderWidth: 0,
              color: APP_COLOR,
              unfilledColor: PLACEHOLDER_COLOR
            }}
            resizeMethod='resize'
            key={item}
          />
        </View>
      );
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { screenContainer, buttonContainer, bottomLine } = styles;
    const {
      passport,
      health_history_form,
      police_background_check
    } = this.props.documents;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={screenContainer}>
            <View style={{ alignItems: 'center' }}>
              <Heading>Stage 3</Heading>
            </View>

            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ fontSize: 40 }}>
                Your Police Check Report
              </Heading>

              {this.renderData(police_background_check)}
            </View>
            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ fontSize: 40 }}>Your Passport</Heading>
              {this.renderData(passport)}
            </View>
            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ fontSize: 40 }}>
                Health History Form
              </Heading>
              {this.renderData(health_history_form)}
            </View>

            <View style={bottomLine} />
          </View>
        </ScrollView>
        <View style={buttonContainer} key='bottomLeft'>
          <BottomButtonLeft onPress={() => navigate(APPLICATION_STATUS)}>
            Back
          </BottomButtonLeft>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    documents: state.fetchedUserProfile.documents
  };
};

export default connect(mapStateToProps)(StageThreeForm);
