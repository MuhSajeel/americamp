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
import { inputChanged, infoSubmited } from "../../../redux/actions";

import { Input } from "../../../components/common/Input";
import {
  KIN_DETAILS,
  KIN_COUNTRY_CHANGED,
  KIN_ADDRESS1_CHANGED,
  KIN_ADDRESS2_CHANGED,
  KIN_STATE_CHANGED,
  KIN_CITY_CHANGED,
  KIN_POSTCODE_CHANGED,
  KIN_CONTACT_NUM
} from "../../../constants";
import styles from "./styles";

class KinAddress extends Component {
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
            NEXT OF KIN ADDRESS
          </SubHeading>
          <View style={styles.input}>
            <Input
              placeholder="Address line 1"
              onChangeText={text =>
                this.onInputChanged(text, KIN_ADDRESS1_CHANGED)
              }
              value={EmergencyContact.next_of_kin.address.address_line1}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder="Address line 2 (Optional)"
              onChangeText={text =>
                this.onInputChanged(text, KIN_ADDRESS2_CHANGED)
              }
              value={EmergencyContact.next_of_kin.address.address_line2}
            />
          </View>
          {/* <View style={styles.input}>
            <Input
              placeholder="Town here"
              onChangeText={text => this.onInputChanged(text, KIN_TOWN_CHANGED)}
              value={EmergencyContact.next_of_kin.address.town}
            />
          </View> */}
          <View style={styles.input}>
            <Input
              placeholder="City"
              onChangeText={text => this.onInputChanged(text, KIN_CITY_CHANGED)}
              value={EmergencyContact.next_of_kin.address.city}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder="County/state (Optional)"
              onChangeText={text =>
                this.onInputChanged(text, KIN_STATE_CHANGED)
              }
              value={EmergencyContact.next_of_kin.address.state}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder="Postal code"
              onChangeText={text =>
                this.onInputChanged(text, KIN_POSTCODE_CHANGED)
              }
              value={EmergencyContact.next_of_kin.address.postcode}
            />
          </View>

          <View style={{ paddingTop: 30, paddingBottom: 20 }}>
            <CountryPicker
              countryCode={EmergencyContact.next_of_kin.address.country}
              onValueChange={({ key }) =>
                this.onInputChanged(key, KIN_COUNTRY_CHANGED)
              }
              unHighlight={!EmergencyContact.next_of_kin.address.country}
            />
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(KIN_DETAILS)}
            rightBtnNavigation={
              EmergencyContact.next_of_kin.address.address_line1 &&
              EmergencyContact.next_of_kin.address.city &&
              EmergencyContact.next_of_kin.address.postcode &&
              EmergencyContact.next_of_kin.address.country
                ? () => navigation.navigate(KIN_CONTACT_NUM)
                : null
            }
            btnTxt={{ leftBtnTxt: "PREVIOUS", rightBtnTxt: "NEXT" }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  EmergencyContact,
  submitInfoReducer,
  fetchedUserProfile
}) => {
  return {
    EmergencyContact,
    loading: submitInfoReducer.loading,

    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(KinAddress);
