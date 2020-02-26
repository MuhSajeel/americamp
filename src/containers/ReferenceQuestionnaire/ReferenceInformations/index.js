import React, { Component } from 'react';
import { View } from 'react-native';

import { Screen, Heading, FooterWithButtons } from '../../../components/common';

import { Input } from '../../../components/common/Input';
import { APPLICANT_SUITABILITY, STAGE_TWO } from '../../../constants';

class ReferenceInformations extends Component {
  state = { Fname: '', Lname: '', Company: '', Position: '', Cnum: '', Email: '' };

  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>REFEREE'S INFORMATION</Heading>

          <View>
            <Input
              placeholder="Referees First Name"
              onChangeText={Fname => this.setState({ Fname })}
              value={this.state.Fname}
            />
          </View>
          <View>
            <Input
              placeholder="Referees Last Name"
              onChangeText={Lname => this.setState({ Lname })}
              value={this.state.Lname}
            />
          </View>
          <View>
            <Input
              placeholder="Company (if applicable)"
              onChangeText={Company => this.setState({ Company })}
              value={this.state.Company}
            />
          </View>

          <View>
            <Input
              placeholder="Position title"
              onChangeText={Position => this.setState({ Position })}
              value={this.state.Position}
            />
          </View>
          <View>
            <Input
              placeholder="Contact number"
              onChangeText={Cnum => this.setState({ Cnum })}
              value={this.state.Cnum}
            />
          </View>
          <View>
            <Input
              placeholder="Email"
              onChangeText={Email => this.setState({ Email })}
              value={this.state.Email}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(APPLICANT_SUITABILITY)}
            rightBtnNavigation={() => navigation.navigate(STAGE_TWO)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

export default ReferenceInformations;
