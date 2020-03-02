import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Screen, FooterWithButtons } from '../../../../components/common';
import { styles } from './styles';
import { STUDY_BACKGROUND_NAV, CURRENT_OCCUPATION_TYPE_NAV } from '../../../../constants';

class Notes extends Component {
  componentWillMount() {}

  /* Will implement later */
  rightBtnClick = () => {
    return null;
  };

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const { textContainer, textBold, textSize } = styles;
    return (
      <Screen>
        <View key="content">
          <View>
            <View style={textContainer}>
              <Text style={[textBold, textSize]}>
                You must complete this section otherwise we cannot proceed with your application.
              </Text>
              <Text style={textSize}>
                To work as a support staff in the USA with{' '}
                <Text style={[textBold, textSize]}>Americamp</Text>, your occupation must be
                full-time student in higher education degree level or above.
              </Text>
              <Text style={textSize}>Select the appropriate student choice on next screen.</Text>
              <Text style={textSize}>
                If you are not a full-time student there will be a travel programme we can switch
                to, we will cover this on the{' '}
                <Text style={[textBold, textSize]}>Job Prefrences</Text> section of the application
              </Text>
            </View>
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(STUDY_BACKGROUND_NAV)}
            rightBtnNavigation={() => navigate(CURRENT_OCCUPATION_TYPE_NAV)}
            btnTxt={{ leftBtnTxt: 'FINISH', rightBtnTxt: 'PROCEED' }}
          />
        </View>
      </Screen>
    );
  }
}

export default Notes;
