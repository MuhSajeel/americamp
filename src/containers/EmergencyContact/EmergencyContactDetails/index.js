import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons
} from '../../../components/common';
import { inputChanged } from '../../../redux/actions';

import { Input } from '../../../components/common/Input';
import {
  EMERGENCY_CONTACT_ADDRESS,
  CONTACT_NAME_CHANGED,
  RELATIONSHIP_TO_PARTICIPANT_CHANGED,
  STAGE_TWO
} from '../../../constants';
import styles from './styles';

class EmergencyContactDetails extends Component {
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
    const { navigation, ContactName, Relationship } = this.props;
    return (
      <Screen>
        {/* Screen Content */}

        <View key="content">
          <View>
            <Heading>EMERGENCY CONTACT DETAILS</Heading>
            <SubHeading extraStyling={{ fontSize: 25 }}>
              EMERGENCY CONTACT INFORMATION
            </SubHeading>
          </View>
          <SubHeading extraStyling={{ marginTop: 20, fontSize: 25 }}>
            Contact Details
          </SubHeading>
          <View style={styles.input}>
            <Input
              placeholder="Contact name"
              onChangeText={text => {
                this.onInputChanged(text, CONTACT_NAME_CHANGED);
              }}
              value={ContactName}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder="Relationship to participant"
              onChangeText={text => {
                this.onInputChanged(text, RELATIONSHIP_TO_PARTICIPANT_CHANGED);
              }}
              value={Relationship}
            />
          </View>

          {/* <View style={styles.input}>
            <Input
              placeholder="Contact Number"
              onChangeText={text => this.onInputChanged(text, CONTACT_NUMBER_CHANGED)}
              value={ContactNumber}
            />
          </View> */}
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(STAGE_TWO)}
            rightBtnNavigation={
              ContactName && Relationship
                ? () => navigation.navigate(EMERGENCY_CONTACT_ADDRESS)
                : null
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
    ContactName: EmergencyContact.contact.info.contact_name,
    Relationship: EmergencyContact.contact.info.relationship,
    ContactNumber: EmergencyContact.contact.info.contact_number,
    EmergencyContact
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(EmergencyContactDetails);
