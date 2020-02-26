import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  CountryPicker
} from "../../../components/common";
import { inputChanged } from "../../../redux/actions";

import { Input } from "../../../components/common/Input";
import {
  EMERGENCY_CONTACT_DETAILS,
  KIN_DETAILS,
  ADDRESS1_CHANGED,
  ADDRESS2_CHANGED,
  ECCITY_CHANGED,
  ECTOWN_CHANGED,
  ECSTATE_CHANGED,
  EMERGENCY_CONTACT_NUM,
  ECPOSTCODE_CHANGED,
  ECCOUNTRY_CHANGED
} from "../../../constants";
import styles from "./styles";

class EmergencyContactAddress extends Component {
  onInputChanged(text, type) {
    this.props.inputChanged(text, type);
  }

  // eslint-disable-next-line class-methods-use-this
  validate(text) {
    const alph = /^$|^[a-zA-Z ]{1,100}$/;
    if (alph.test(text)) return true;
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  validateNum(text) {
    const num = /^$|^[0-9]{1,100}$/;
    if (num.test(text)) return true;
    return false;
  }

  render() {
    const { navigation, EmergencyContact } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="content">
          <Heading>EMERGENCY CONTACT DETAILS</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            EMERGENCY CONTACT INFORMATION
          </SubHeading>
          <SubHeading extraStyling={{ marginTop: 20, fontSize: 25 }}>
            CONTACTS ADDRESS
          </SubHeading>
          <View style={styles.input}>
            <Input
              placeholder="Address line 1"
              onChangeText={text => this.onInputChanged(text, ADDRESS1_CHANGED)}
              value={EmergencyContact.contact.address.address_line1}
            />
          </View>

          <View style={styles.input}>
            <Input
              placeholder="Address line 2 (Optional)"
              onChangeText={text => this.onInputChanged(text, ADDRESS2_CHANGED)}
              value={EmergencyContact.contact.address.address_line2}
            />
          </View>
          {/* <View style={styles.input}>
            <Input
              placeholder="Town here"
              onChangeText={text => this.onInputChanged(text, ECTOWN_CHANGED)}
              value={EmergencyContact.contact.address.town}
            />
          </View> */}

          <View style={styles.input}>
            <Input
              placeholder="City"
              onChangeText={text => this.onInputChanged(text, ECCITY_CHANGED)}
              value={EmergencyContact.contact.address.city}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder="County/state (Optional)"
              onChangeText={text => this.onInputChanged(text, ECSTATE_CHANGED)}
              value={EmergencyContact.contact.address.state}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder="Postal code"
              onChangeText={text =>
                this.onInputChanged(text, ECPOSTCODE_CHANGED)
              }
              value={EmergencyContact.contact.address.postcode}
            />
          </View>
          <View style={{ paddingTop: 30, paddingBottom: 20 }}>
            <CountryPicker
              countryCode={EmergencyContact.contact.address.country}
              onValueChange={({ key }) =>
                this.onInputChanged(key, ECCOUNTRY_CHANGED)
              }
              unHighlight={!EmergencyContact.contact.address.country}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() =>
              navigation.navigate(EMERGENCY_CONTACT_DETAILS)
            }
            rightBtnNavigation={
              EmergencyContact.contact.address.address_line1 &&
              EmergencyContact.contact.address.city &&
              EmergencyContact.contact.address.postcode &&
              EmergencyContact.contact.address.country
                ? () => navigation.navigate(EMERGENCY_CONTACT_NUM)
                : null
            }
            btnTxt={{ leftBtnTxt: "PREVIOUS", rightBtnTxt: "NEXT" }}
          />
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

const mapStateToProps = ({ EmergencyContact }) => {
  return {
    EmergencyContact
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(EmergencyContactAddress);
