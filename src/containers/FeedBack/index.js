import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { inputChanged } from '../../redux/actions';
import {
  Heading,
  SubHeading,
  TextAreaInput,
  FooterWithButtons,
  Screen,
  Spinner,
} from '../../components/common';
import { SETTINGS, INPUT_FEEDBACK, SUBMIT_FEEDBACK } from '../../constants';

// eslint-disable-next-line no-shadow
const FeedBackScreen = ({ navigation: { navigate }, feedback, loading, inputChanged }) => {
  return (
    <Screen>
      <View key="header">
        <Heading>SEND US FEEDBACK</Heading>
        <SubHeading>GOOD OR BAD, IT ALL HELPS US IMPROVE</SubHeading>
      </View>
      <View key="content">
        <TextAreaInput
          additionalTxtStyle={{
            flex: 1,
          }}
          value={feedback}
          placeholder={`Here at AmeriCamp we are obsessed with #FreeBiscuits and sometimes if a biscuit ain't quite right we want them to know too.\n\nLet us know how can improve or something or someone that has done good so we can reward or reflect!`}
          onChangeText={text => inputChanged(text, INPUT_FEEDBACK)}
          maxLength={250}
          numberOfLines={11}
        />
      </View>
      <View key="footer">
        {loading ? (
          <View style={{ alignItems: 'flex-end' }}>
            <Spinner />
          </View>
        ) : (
          <FooterWithButtons
            leftBtnNavigation={() => navigate(SETTINGS)}
            rightBtnNavigation={feedback ? () => inputChanged({ feedback }, SUBMIT_FEEDBACK) : null}
            btnTxt={{ leftBtnTxt: 'Home', rightBtnTxt: 'Submit' }}
          />
        )}
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ feedbackReducer: { feedback, loading } }) => ({
  feedback,
  loading,
});

const FeedBack = connect(
  mapStateToProps,
  { inputChanged }
)(FeedBackScreen);

export { FeedBack };
