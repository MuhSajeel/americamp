/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { americaTheme, canadaTheme, inputChanged } from '../../../redux/actions';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  YesNoSelection,
} from '../../../components/common';
import { styles } from './styles';
import {
  BEFORE_WE_START_NAV,
  FURTHER_DETAILS_NAV,
  CRIMINAL_BACKGROUND,
  DO_YOU_HAVE_ANY_MEDICAL_CONDITION,
  APPLICANT_TYPE_NAV,
} from '../../../constants';

class BackgroundDetails extends Component {
  componentWillMount() {
    const { navigation, americaTheme: setAmericaTheme, canadaTheme: setCanadaTheme } = this.props;
    const theme = navigation.getParam('theme');
    return theme === 'canada' ? setCanadaTheme() : setAmericaTheme();
  }

  shouldSkipNext(theme) {
    const {
      navigation: { navigate },
      medical_condition,
      criminal_background,
    } = this.props;
    if (medical_condition || criminal_background) {
      return navigate(FURTHER_DETAILS_NAV, { theme });
    }
    return navigate(APPLICANT_TYPE_NAV, { theme });
  }

  render() {
    const {
      navigation,
      navigation: { navigate },
      medical_condition,
      criminal_background,
      inputChanged,
    } = this.props;
    const theme = navigation.getParam('theme');
    const { textContainer, heading, themeAmerica, themeCanada, contentText } = styles;
    const themeStyle = theme === 'canada' ? themeCanada : themeAmerica;
    return (
      <Screen>
        <View key="header">
          <Heading>BEFORE WE START</Heading>
          <SubHeading>
            Let us know the answer of these 2 questions, we may need more info from you before we
            can proceed with your application
          </SubHeading>
        </View>
        <View key="content">
          <View style={textContainer}>
            <Text style={[heading, themeStyle]}>Medical</Text>
            <Text style={contentText}>
              Do you have any current pre-existing medical conditions?
            </Text>
            <View style={{ paddingTop: 10 }}>
              <YesNoSelection
                onPress={val => inputChanged(val, DO_YOU_HAVE_ANY_MEDICAL_CONDITION)}
                selected={medical_condition}
                themeCanada={theme === 'canada' ? theme : null}
                switchButtons
              />
            </View>
          </View>
          <View style={textContainer}>
            <Text style={[heading, themeStyle]}>Criminal Background</Text>
            <Text style={contentText}>
              Do you have any convictions or cautions that may effect your application?
            </Text>
            <View style={{ paddingTop: 10 }}>
              <YesNoSelection
                onPress={val => inputChanged(val, CRIMINAL_BACKGROUND)}
                selected={criminal_background}
                themeCanada={theme === 'canada' ? theme : null}
                switchButtons
              />
            </View>
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(BEFORE_WE_START_NAV)}
            rightBtnNavigation={() => this.shouldSkipNext(theme)}
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
    apply_now: { medical_condition, criminal_background },
  },
}) => {
  return {
    medical_condition,
    criminal_background,
  };
};

export default connect(
  mapStateToProps,
  { americaTheme, canadaTheme, inputChanged }
)(BackgroundDetails);
