/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  TextAreaInput,
} from '../../../components/common';

import { americaTheme, canadaTheme, inputChanged } from '../../../redux/actions';

import { styles } from './styles';

import { BACKGROUND_DETAILS_NAV, FURTHER_DETAILS, APPLICANT_TYPE_NAV } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class FurtherDetails extends Component {
  componentWillMount() {
    const { navigation, americaTheme: setAmericaTheme, canadaTheme: setCanadaTheme } = this.props;
    const theme = navigation.getParam('theme');
    return theme === 'canada' ? setCanadaTheme() : setAmericaTheme();
  }

  render() {
    const {
      navigation,
      navigation: { navigate },
      further_details,
      inputChanged,
    } = this.props;
    const { themeAmerica, themeCanada } = styles;
    const theme = navigation.getParam('theme');
    const placeholder = `Your application may not be affected, but if we are aware of these things from the beginning we can help you avoid any last-minute surprises!\n\n250 min character count`;
    const themeStyle = theme === 'canada' ? themeCanada : themeAmerica;
    return (
      <Screen>
        <View key="header">
          <Heading>FURTHER DETAILS</Heading>
          <SubHeading>
            If you answered either of the <Text style={themeStyle}>medical</Text> or{' '}
            <Text style={themeStyle}>criminal background</Text> declarations with a{' '}
            <Text style={themeStyle}>yes</Text>, please give more info here
          </SubHeading>
        </View>
        <View key="content">
          <TextAreaInput
            additionalTxtStyle={{
              flex: 1,
            }}
            onChangeText={val => inputChanged(val, FURTHER_DETAILS)}
            value={further_details}
            placeholder={placeholder}
            maxLength={250}
            numberOfLines={16}
          />
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(BACKGROUND_DETAILS_NAV)}
            rightBtnNavigation={() => navigate(APPLICANT_TYPE_NAV, { theme })}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
            btnTheme={theme}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  stageZeroReducer: {
    apply_now: { further_details },
  },
}) => {
  return {
    further_details,
  };
};

export default connect(
  mapStateToProps,
  { americaTheme, canadaTheme, inputChanged }
)(FurtherDetails);
