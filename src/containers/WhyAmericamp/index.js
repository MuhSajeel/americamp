import { View, Text } from 'react-native';
import React from 'react';
import Styles from './styles';
import { Screen, FooterWithLogo, ImageText } from '../../components/common';
import { DASHBOARD } from '../../constants';

const WhyAmericamp = props => {
  return (
    <Screen>
      <View key="content" style={{ alignItems: 'center' }}>
        <Text style={Styles.headingStyle}>Why Americamp</Text>
        <Text style={Styles.subHeadingStyle}>So, why choose AmeriCamp?</Text>
        <Text style={Styles.descStyle}>
          Here at AmeriCamp each applicant is welcomed into our increasingly growing Camp family! We
          have a desire to provide super service and a Summer that will live long in your memory!
        </Text>
        <ImageText
          imageSource={require('../../assets/images/WhyAmericamp/salary.png')}
          heading="$1850"
          description="Work in amongst stunning stateside backdrops, and get paid up to $1850!"
        />
        <ImageText
          imageSource={require('../../assets/images/WhyAmericamp/awesome-camppng.png')}
          heading="Awesome Camps"
          description="Get placed at one of our gorgeous Camps in America."
        />
        <ImageText
          imageSource={require('../../assets/images/WhyAmericamp/accommodation.png')}
          heading="Accommodation"
          description="Throughout your AmeriCamp placement, snug accommodation is included; the ideal rest stop after a full day of activities!"
        />
        <ImageText
          imageSource={require('../../assets/images/WhyAmericamp/meals.png')}
          heading="Meals"
          description="With meals included throughout your time at Camp, you definitely won’t go hungry!"
        />
        <ImageText
          imageSource={require('../../assets/images/WhyAmericamp/insurance.png')}
          heading="Insurance"
          description="Hopefully you won’t need it, but comprehensive medical insurance is included in your fees!"
        />
      </View>
      <View key="footer">
        <FooterWithLogo
          navigate={() => props.navigation.navigate(DASHBOARD)}
          btnTxt={{ leftBtnTxt: 'HOME' }}
        />
      </View>
    </Screen>
  );
};
export default WhyAmericamp;
