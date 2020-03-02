import React, { Component } from 'react';
import { View } from 'react-native';

import { Screen, Heading, SubHeading, FooterWithButtons, Input } from '../../../components/common';

import { REFEREE_ADDRESS, REFEREE_EMAIL } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class RefereeCnum extends Component {
  state = { text: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>REFEREE</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>CONTACT NUMBER </SubHeading>
          <View style={{ marginTop: 10 }}>
            <Input
              placeholder="Contact Number"
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(REFEREE_ADDRESS)}
            rightBtnNavigation={() => navigation.navigate(REFEREE_EMAIL)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default RefereeCnum;
