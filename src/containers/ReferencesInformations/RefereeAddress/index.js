import React, { Component } from 'react';
import { View } from 'react-native';

import {
  Screen,
  Heading,
  FooterWithButtons,
  Input,
  CountryPicker,
} from '../../../components/common';

import { REFEREE_NAME, REFEREE_CNUM } from '../../../constants';

// eslint-disable-next-line react/prefer-stateless-function
class RefereeAddress extends Component {
  state = {
    Address1: '',
    Address2: '',
    Town: '',
    City: '',
    County: '',
    Postal: '',
    Country: 'US',
  };

  // eslint-disable-next-line class-methods-use-this
  onCountryChange(text) {
    console.log(text);
  }

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>REFEREE ADDRESS</Heading>
          <View>
            <Input
              placeholder="Address line 1 here "
              onChangeText={Address1 => this.setState({ Address1 })}
              value={this.state.Address1}
            />
          </View>
          <View>
            <Input
              placeholder="Address line 2 here"
              onChangeText={Address2 => this.setState({ Address2 })}
              value={this.state.Address2}
            />
          </View>
          <View>
            <Input
              placeholder="Town here"
              onChangeText={Town => this.setState({ Town })}
              value={this.state.Town}
            />
          </View>

          <View>
            <Input
              placeholder="City here"
              onChangeText={City => this.setState({ City })}
              value={this.state.City}
            />
          </View>
          <View>
            <Input
              placeholder="County/state here"
              onChangeText={County => this.setState({ County })}
              value={this.state.County}
            />
          </View>
          <View>
            <Input
              placeholder="Post code here"
              onChangeText={Postal => this.setState({ Postal })}
              value={this.state.Postal}
            />
          </View>
          <View style={{ paddingTop: 30, paddingBottom: 20 }}>
            <CountryPicker
              countryCode={this.state.Country}
              onValueChange={({ key }) => this.onCountryChange(key)}
              unHighlight
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(REFEREE_NAME)}
            rightBtnNavigation={() => navigation.navigate(REFEREE_CNUM)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default RefereeAddress;
