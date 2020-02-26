import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Screen, Heading, SubHeading, FooterWithButtons } from '../../../components/common';
import { Input } from '../../../components/common/Input';
import {
  EMERGENCY_CONTACT_ADDRESS,
  KIN_ADDRESS,
  KIN_CONTACT_NAME_CHANGED,
  KIN_RELATIONSHIP_TO_PARTICIPANT_CHANGED,
  KIN_CONTACT_NUMBER_CHANGED,
  EMERGENCY_CONTACT_NUM,
} from '../../../constants';
import { inputChanged } from '../../../redux/actions';

import styles from './styles';

class KinDetails extends Component {
  onInputChanged(text, type) {
    this.props.inputChanged(text, type);
  }

  // eslint-disable-next-line class-methods-use-this
  validate(text) {
    const alph = /^$|^[a-zA-Z ]{1,100}$/;
    if (alph.test(text)) return true;
    return false;
  }

  render() {
    const { navigation, ContactName, Relationship, ContactNumber } = this.props;

    return (
      <Screen>
        {/* Screen Content */}

        <View key="content">
          <View>
            <Heading>EMERGENCY CONTACT DETAILS</Heading>
            <SubHeading extraStyling={{ fontSize: 25 }}>EMERGENCY CONTACT INFORMATION</SubHeading>
          </View>
          <SubHeading extraStyling={{ marginTop: 20, fontSize: 25 }}>
            NEXT OF KIN DETAILS
          </SubHeading>
          <View style={styles.input}>
            <Input
              placeholder="Next of kin name"
              onChangeText={text => this.onInputChanged(text, KIN_CONTACT_NAME_CHANGED)}
              value={ContactName}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder="Relationship to participant"
              onChangeText={text =>
                this.onInputChanged(text, KIN_RELATIONSHIP_TO_PARTICIPANT_CHANGED)
              }
              value={Relationship}
            />
          </View>
          {/* <View style={styles.input}>
            <Input
              placeholder="Next of kin number"
              onChangeText={text => this.onInputChanged(text, KIN_CONTACT_NUMBER_CHANGED)}
              value={ContactNumber}
            />
          </View> */}
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(EMERGENCY_CONTACT_NUM)}
            rightBtnNavigation={
              ContactName && Relationship ? () => navigation.navigate(KIN_ADDRESS) : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}
const mapStateToProps = ({ EmergencyContact }) => {
  return {
    ContactName: EmergencyContact.next_of_kin.info.contact_name,
    Relationship: EmergencyContact.next_of_kin.info.relationship,
    ContactNumber: EmergencyContact.next_of_kin.info.contact_number,
    EmergencyContact,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(KinDetails);
