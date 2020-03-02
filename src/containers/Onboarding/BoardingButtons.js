import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { SIGNUP_NAV, LOGIN_NAV } from '../../constants';
import { BottomButtonRight } from '../../components/common';

const BoardingButtons = ({ navigate }) => {
  const { lowerButtonContainer } = styles;
  return (
    <View style={lowerButtonContainer}>
      <BottomButtonRight
        onPress={() => {
          navigate(SIGNUP_NAV);
        }}
      >
        GET STARTED
      </BottomButtonRight>
      <BottomButtonRight
        onPress={() => {
          navigate(LOGIN_NAV);
        }}
      >
        LOG IN
      </BottomButtonRight>
    </View>
  );
};

export default BoardingButtons;
