import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { Screen, Heading, SubHeading, FooterWithButtons } from '../../../components/common';

import { americaTheme, canadaTheme } from '../../../redux/actions';

import { styles } from './styles';
import { WHERE_TO_GO_NAV, APPLICANT_TYPE_NAV } from '../../../constants';

class BeforeWeStart extends Component {
  componentWillMount() {
    const { americaTheme: setAmericaTheme } = this.props;
    // const theme = navigation.getParam('theme');
    return setAmericaTheme();
  }

  componentWillUnmount() {
    const { americaTheme: setAmericaTheme } = this.props;
    setAmericaTheme();
  }

  render() {
    const {
      navigation,
      navigation: { navigate },
    } = this.props;
    const theme = navigation.getParam('theme');
    const { textContainer, heading, themeAmerica, contentText } = styles;
    const themeStyle = themeAmerica;
    return (
      <Screen>
        <View key="header">
          <Heading>BEFORE WE START</Heading>
          <SubHeading>
            Some important stuff that you need to know before we can make this happen
          </SubHeading>
        </View>
        <View key="content">
          <View style={textContainer}>
            <Text style={[heading, themeStyle]}>CAMP AVAILABILITY DATES</Text>
            <Text style={contentText}>
              You need to be available for a minimum of 9 week period starting between June 1st and
              June 20th 2020 and available until at least August 16th 2020.
            </Text>
          </View>
          <View style={textContainer}>
            <Text style={[heading, themeStyle]}>DATE OF BIRTH</Text>
            <Text style={contentText}>You need to be 18 years old before 1st June 2020.</Text>
          </View>
          <View style={textContainer}>
            <Text style={[heading, themeStyle]}>CITIZENSHIP</Text>
            <Text style={contentText}>
              You cannot be a US citizen or be eligible for US citizenship
            </Text>
          </View>
          <View style={textContainer}>
            <Text style={[heading, themeStyle]}>MEDICAL</Text>
            <Text style={contentText}>You must declare all pre-existing medical conditions.</Text>
          </View>
          <View style={textContainer}>
            <Text style={[heading, themeStyle]}>CRIMINAL BACKGROUND</Text>
            <Text style={contentText}>
              You must declare any previous or current convictions regardless of types or dates
            </Text>
          </View>
          <Text style={contentText}>
            If you&apos;re happy with all of the above then let&apos;s get this application sorted
            for you, welcome to AmeriCamp!
          </Text>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(WHERE_TO_GO_NAV)}
            rightBtnNavigation={() => navigate(APPLICANT_TYPE_NAV, { theme })}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'CONTINUE' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    americaTheme: () => {
      dispatch(americaTheme());
    },
    canadaTheme: () => {
      dispatch(canadaTheme());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(BeforeWeStart);
