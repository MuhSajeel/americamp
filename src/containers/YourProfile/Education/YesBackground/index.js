/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import SimpleToast from 'react-native-simple-toast';
import { inputChanged, infoSubmited } from '../../../../redux/actions';

import {
  Heading,
  FooterWithButtons,
  TextAreaInput,
  Spinner,
  Screen2,
} from '../../../../components/common';
import { ADDITIONAL_INFO_CHANGED } from '../../../../constants';

class YesBackground extends Component {
  infoSubmit() {
    if (this.props.extra_detail.length < 250) {
      return SimpleToast.show('Must enter at least 250 characters');
    }
    const data = this.props.fetchedUserProfile;
    data.educational_background = this.props.educationReducer;
    this.props.infoSubmited(data);
    return null;
  }

  render() {
    const { navigation, extra_detail, inputChanged, loading } = this.props;

    return (
      <Screen2>
        {/* Screen Content */}
        <View key="header" />
        <View key="content">
          <Heading>BACKGROUND</Heading>
          <TextAreaInput
            placeholder="Please tell us about your family and
                  educational background, your interests
                   and spare time activities, your future
                  plans and anything else which you
                think will be helpful to your application:"
            multiline
            onChangeText={textData => inputChanged(textData, ADDITIONAL_INFO_CHANGED)}
            value={extra_detail}
            numberOfLines={16}
            minLength={250}
            maxLength={1000}
          />
        </View>

        <View key="footer">
          {loading ? (
            <View style={{ alignItems: 'flex-end' }}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigation.goBack()}
              rightBtnNavigation={extra_detail ? () => this.infoSubmit() : null}
              btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
            />
          )}
        </View>
        {/* Content end */}
      </Screen2>
    );
  }
}

const mapStateToProps = ({
  fetchedUserProfile,
  educationReducer,
  educationReducer: { extra_detail },
  submitInfoReducer,
}) => {
  return {
    extra_detail,
    educationReducer,
    fetchedUserProfile,
    loading: submitInfoReducer.loading,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(YesBackground);
