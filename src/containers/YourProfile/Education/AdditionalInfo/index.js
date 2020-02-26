/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import { additionalInfoAction, infoSubmited } from '../../../../redux/actions';

import {
  Heading,
  SubHeading,
  FooterWithButtons,
  TextAreaInput,
  BottomButtonLeft,
  BottomButtonRight,
  Spinner,
  Card,
} from '../../../../components/common';

import { styles } from './styles';

import { GRADUATION_DATE_NAV } from '../../../../constants';

class AdditionalInfo extends Component {
  state = { info: '' };

  componentWillMount() {
    const { extra_detail } = this.props;
    this.setState({ info: extra_detail });
  }

  navigateRight() {
    const { info } = this.state;
    this.props.additionalInfoAction(info);
    const { education: educational_background } = this.props;
    educational_background.extra_detail = info;
    this.infoSubmit(educational_background);
  }

  infoSubmit(educational_background) {
    const data = this.props.fetchedUserProfile;
    data.educational_background = educational_background;
    this.props.infoSubmited(data);
  }

  render() {
    const {
      navigation: { navigate },
      loading,
    } = this.props;
    const { additionalTxtStyle } = styles;
    const placeholder = `Have something to add that will really help you stand out?\n Tell us a little about your family, interests and other activities. Stuff that you think will help your application. Don't worry not expection an essay just a few lines would be great!\n\n250 min character count`;
    const { info } = this.state;
    return (
      <Card>
        <View key="content">
          <Heading>BACKGROUND</Heading>
          <SubHeading>This will support your application</SubHeading>
          <TextAreaInput
            additionalTxtStyle={additionalTxtStyle}
            placeholder={placeholder}
            maxLength={250}
            numberOfLines={16}
            onChangeText={val => this.setState({ info: val })}
            value={info}
          />
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(GRADUATION_DATE_NAV)}
            rightBtnNavigation={() => this.navigateRight()}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
          />
        </View>
        <View key="bottomLeft">
          <BottomButtonLeft onPress={!loading ? () => navigate(GRADUATION_DATE_NAV) : null}>
            PREVIOUS
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          {loading ? (
            <Spinner />
          ) : (
            <BottomButtonRight onPress={() => this.navigateRight()}>FINISH</BottomButtonRight>
          )}
        </View>
      </Card>
    );
  }
}

const mapStateToProps = ({ educationReducer, submitInfoReducer, fetchedUserProfile }) => {
  const { extra_detail } = educationReducer;
  const { loading } = submitInfoReducer;
  return {
    education: educationReducer,
    extra_detail,
    loading: loading || false,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { additionalInfoAction, infoSubmited }
)(AdditionalInfo);
