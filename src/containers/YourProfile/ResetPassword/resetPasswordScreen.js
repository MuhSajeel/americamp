import React from 'react';
import { View, Platform } from 'react-native';

import {
  Screen,
  Heading,
  SubHeading,
  Input,
  FooterWithButtons,
  Spinner,
} from '../../../components/common';
import { SETTINGS } from '../../../constants';

const resetPasswordScreen = ({
  heading,
  subHeading,
  inputState,
  setInputState,
  navigateNext,
  cancel,
  rightButtonText,
  navigateData,
  loading,
}) => {
  return (
    <Screen>
      <View key="header">
        <Heading>{heading}</Heading>
        <SubHeading>{subHeading}</SubHeading>
      </View>
      <View key="content">
        <Input
          autoFocus={Platform.OS === 'android'}
          secureTextEntry
          placeholder=""
          onChangeText={text => setInputState(text)}
          value={inputState}
        />
      </View>
      <View key="footer">
        {loading ? (
          <View style={{ alignItems: 'flex-end' }}>
            <Spinner />
          </View>
        ) : (
          <FooterWithButtons
            leftBtnNavigation={() => cancel(SETTINGS)}
            rightBtnNavigation={inputState ? () => navigateNext(navigateData, inputState) : null}
            btnTxt={{
              leftBtnTxt: 'Cancel',
              rightBtnTxt: rightButtonText || 'Save',
            }}
          />
        )}
      </View>
    </Screen>
  );
};

export { resetPasswordScreen };
