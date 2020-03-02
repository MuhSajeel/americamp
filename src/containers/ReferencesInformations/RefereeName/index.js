import React, { Component } from 'react';
import { View } from 'react-native';

import { Screen, Heading, SubHeading, FooterWithButtons, Input } from '../../../components/common';

import { REFERENCES_INFORMATIONS, REFEREE_ADDRESS } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class RefereeName extends Component {
  state = { text: '' };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>REFEREE INFORMATION</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>REFEREE'S Name</SubHeading>
          <View style={{ marginTop: 10 }}>
            <Input value={this.state.text} onChangeText={text => this.setState({ text })} />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(REFERENCES_INFORMATIONS)}
            rightBtnNavigation={() => navigation.navigate(REFEREE_ADDRESS)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default RefereeName;
