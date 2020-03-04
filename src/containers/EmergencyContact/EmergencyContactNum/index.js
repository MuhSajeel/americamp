import React, { Component } from "react";
import { View, Text, Alert, Platform } from "react-native";
import { connect } from "react-redux";
import Toast from "react-native-simple-toast";
import { inputChanged } from "../../../redux/actions";

import { PhoneInputScreen } from "../../../components/PersonalInformationScreens";

import options from "../../../assets/data/newCountryCode";

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  PhoneInput
} from "../../../components/common";
import { Input } from "../../../components/common/Input";
import {
  KIN_DETAILS,
  EMERGENCY_CONTACT_ADDRESS,
  HOME_PHONE_CHANGED,
  HOME_DIAL_CODE_CHANGED,
  MOBILE_NUMBER_CHANGED,
  MOBILE_DIAL_CODE_CHANGED,
  CONTACT_EMAIL_CHANGED,
  ENTER_VALID_EMAIL,
  VALID_PHONE_NUM
} from "../../../constants";
import styles from "./styles";

class EmergencyContactNum extends Component {
  onInputChanged(text, type) {
    this.props.inputChanged(text, type);
  }
  componentDidMount() {
    this.onInputChanged(
      this.props.EmergencyContact.contact.info.home_dial_code || "+44",
      HOME_DIAL_CODE_CHANGED
    );
    this.onInputChanged(
      this.props.EmergencyContact.contact.info.mobile_dial_code || "+44",
      MOBILE_DIAL_CODE_CHANGED
    );
  }
  // eslint-disable-next-line class-methods-use-this
  validateNum(text) {
    const num = /^$|^[0-9]{1,100}$/;
    if (num.test(text)) return true;
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  validateEmail(text) {
    const email = /^$|^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.test(text)) return true;
    return false;
  }

  render() {
    const {
      navigation: { navigate },
      EmergencyContact
    } = this.props;
    console.log("EmergencyContact", EmergencyContact);

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
            CONTACTS DETAILS
          </SubHeading>
          <SubHeading extraStyling={{ marginTop: 20, fontSize: 15 }}>
            Home Phone (Optional)
          </SubHeading>
          <View>
            <PhoneInput
              dropdown={true}
              customStyle={{
                height: 66,
                paddingLeft: 0,
                borderRadius: 0,
                borderWidth: 0,
                borderBottomWidth: 0,
                fontSize: 20
              }}
              placeholder={"1234567890"}
              dialCode={EmergencyContact.contact.info.home_dial_code}
              number={EmergencyContact.contact.info.home_phone}
              onChangeValue={({ label }) => {
                label ? (label = label.replace(/[^\d.+]/g, "")) : null;
                this.onInputChanged(label, HOME_DIAL_CODE_CHANGED);
              }}
              onChangeNum={text => {
                this.onInputChanged(text, HOME_PHONE_CHANGED);
              }}
              cancel={() => this.onInputChanged("", HOME_DIAL_CODE_CHANGED)}
            />
          </View>

          <SubHeading extraStyling={{ marginTop: 20, fontSize: 15 }}>
            Mobile Number
          </SubHeading>
          <View key="content">
            <PhoneInput
              dropdown={true}
              customStyle={{
                height: 66,
                paddingLeft: 0,
                borderRadius: 0,
                borderWidth: 0,
                borderBottomWidth: 0,
                fontSize: 20
              }}
              placeholder={"1234567890"}
              // autoFocus={Platform.OS === "android" ? false : true}
              dialCode={EmergencyContact.contact.info.mobile_dial_code}
              number={EmergencyContact.contact.info.mobile_number}
              onChangeValue={({ label }) => {
                label ? (label = label.replace(/[^\d.+]/g, "")) : null;
                this.onInputChanged(label, MOBILE_DIAL_CODE_CHANGED);
              }}
              onChangeNum={text => {
                this.onInputChanged(text, MOBILE_NUMBER_CHANGED);
              }}
            />
          </View>

          <View style={styles.input}>
            <Input
              placeholder="Email Address"
              onChangeText={text =>
                this.onInputChanged(text, CONTACT_EMAIL_CHANGED)
              }
              value={EmergencyContact.contact.info.contact_email}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            rightBtnNavigation={
              EmergencyContact.contact.info.mobile_number &&
              EmergencyContact.contact.info.mobile_dial_code &&
              EmergencyContact.contact.info.contact_email
                ? () => {
                    if (
                      !this.validateEmail(
                        EmergencyContact.contact.info.contact_email
                      )
                    ) {
                      //Toast.show(ENTER_VALID_EMAIL);
                    } else if (
                      EmergencyContact.contact.info.mobile_number.length < 10
                    ) {
                      //Toast.show(VALID_PHONE_NUM);
                    } else {
                      navigate(KIN_DETAILS);
                    }
                  }
                : () => Alert.alert("Please enter details")
            }
            btnTxt={{ leftBtnTxt: "PREVIOUS", rightBtnTxt: "NEXT" }}
            leftBtnNavigation={() => navigate(EMERGENCY_CONTACT_ADDRESS)}
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
)(EmergencyContactNum);
