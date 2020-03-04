import React, { Component } from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";
import Toast from "react-native-simple-toast";
import { inputChanged, infoSubmited } from "../../../redux/actions";

import options from "../../../assets/data/newCountryCode";

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  DropDown,
  Spinner,
  PhoneInput
} from "../../../components/common";
import { Input } from "../../../components/common/Input";
import {
  KIN_ADDRESS,
  STAGE_TWO,
  KIN_HOME_PHONE_CHANGED,
  KIN_HOME_DIAL_CODE_CHANGED,
  KIN_CONTACT_EMAIL_CHANGED,
  ENTER_VALID_EMAIL,
  VALID_PHONE_NUM
} from "../../../constants";
import styles from "./styles";

class KinContactNum extends Component {
  onInputChanged(text, type) {
    this.props.inputChanged(text, type);
  }
  componentDidMount() {
    this.onInputChanged(
      this.props.EmergencyContact.next_of_kin.info.home_dial_code || "+44",
      KIN_HOME_DIAL_CODE_CHANGED
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

  infoSubmit() {
    if (
      this.validateEmail(
        this.props.EmergencyContact.next_of_kin.info.contact_email
      )
    ) {
      const data = this.props.fetchedUserProfile;
      data.emergency_contact = this.props.EmergencyContact;
      this.props.infoSubmited(data);
    } else {
      //Toast.show("Please Enter Valid Email");
    }
  }

  render() {
    const {
      navigation: { navigate },
      EmergencyContact,
      loading
    } = this.props;
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
            NEXT OF KIN DETAILS
          </SubHeading>

          <SubHeading extraStyling={{ marginTop: 20, fontSize: 15 }}>
            Contact Number
          </SubHeading>
          <View>
            <PhoneInput
              dropdown={true}
              customStyle={{
                height: 66,
                paddingLeft: 0,
                borderWidth: 0,
                fontSize: 20
              }}
              placeholder={"1234567890"}
              dialCode={EmergencyContact.next_of_kin.info.home_dial_code}
              number={EmergencyContact.next_of_kin.info.home_phone}
              onChangeValue={({ label }) => {
                label ? (label = label.replace(/[^\d.+]/g, "")) : null;
                this.onInputChanged(label, KIN_HOME_DIAL_CODE_CHANGED);
              }}
              onChangeNum={text =>
                this.onInputChanged(text, KIN_HOME_PHONE_CHANGED)
              }
              cancel={() => this.onInputChanged("", HOME_DIAL_CODE_CHANGED)}
            />
          </View>
          {/* 
          <View style={styles.input}>
            <Input
              placeholder="Contact Number"
              number
              maxLength={10}
              onChangeText={text =>
                this.onInputChanged(text, KIN_HOME_PHONE_CHANGED)
              }
              value={EmergencyContact.next_of_kin.info.home_phone}
            />
          </View>
          <View>
            <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "bold" }}>
              Dial code
            </Text>

            <DropDown
              selectedValue={EmergencyContact.next_of_kin.info.home_dial_code}
              options={options}
              onValueChange={({ label }) => {
                label = label.replace(/[^\d.+]/g, "");
                this.onInputChanged(label, KIN_HOME_DIAL_CODE_CHANGED);
              }}
            />
          </View> */}

          <View style={styles.input}>
            <Input
              placeholder="Email Address"
              onChangeText={text =>
                this.onInputChanged(text, KIN_CONTACT_EMAIL_CHANGED)
              }
              value={EmergencyContact.next_of_kin.info.contact_email}
            />
          </View>
        </View>

        <View key="footer">
          {loading ? (
            <View style={{ alignItems: "flex-end" }}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigate(KIN_ADDRESS)}
              rightBtnNavigation={
                EmergencyContact.next_of_kin.info.home_phone &&
                EmergencyContact.next_of_kin.info.home_dial_code &&
                EmergencyContact.next_of_kin.info.contact_email
                  ? () => {
                      if (
                        !this.validateEmail(
                          EmergencyContact.next_of_kin.info.contact_email
                        )
                      ) {
                        //Toast.show(ENTER_VALID_EMAIL);
                      } else if (
                        EmergencyContact.next_of_kin.info.home_phone.length < 10
                      ) {
                        //Toast.show(VALID_PHONE_NUM);
                      } else {
                        this.infoSubmit();
                      }
                    }
                  : () => Alert.alert("Please enter details")
              }
              btnTxt={{ rightBtnTxt: "FINISH", leftBtnTxt: "PREVIOUS" }}
            />
          )}
        </View>
        {/* Content end */}
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
)(KinContactNum);
