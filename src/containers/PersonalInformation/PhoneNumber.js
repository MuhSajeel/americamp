import React, { Component } from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";

import {
  BottomButtonLeft,
  BottomButtonRight,
  Card
} from "../../components/common";
import { PhoneInputScreen } from "../../components/PersonalInformationScreens";
import { inputChanged, infoSubmited } from "../../redux/actions";
import {
  CNUMBER_CHANGED,
  DATE_TO_END_WORK,
  DRIVER_LICENSE
} from "../../constants";

class PhoneNumber extends Component {
  state = { dialCode: "", number: "" };

  componentDidMount() {
    const { phoneNumber } = this.props;
    let dialCode = "+44";
    let number = "";
    if (phoneNumber) {
      const newNumber = phoneNumber.split("-");
      number = phoneNumber;
      if (newNumber.length > 1) {
        [dialCode, number] = [newNumber[0], newNumber[1]];
      }
    }
    this.setState({ dialCode, number });
  }

  validateNum() {
    const { dialCode, number } = this.state;
    const dial = dialCode || "+44";
    const num = `${dial}-${number}`;
    console.log("Number ", num);

    if (dial[0] !== "+" || dial.length < 2)
      //return Alert.alert("Invalid Dial Code!");
    if (number.length < 10) //return Alert.alert("Invalid Phone Number!");
    return (
      this.props.inputChanged(num, CNUMBER_CHANGED),
      this.props.navigation.navigate(DRIVER_LICENSE)
    );
  }

  render() {
    const { navigation } = this.props;
    const { dialCode, number } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <PhoneInputScreen
              dropdown={true}
              customStyle={{
                height: 65,
                paddingLeft: 5,
                borderRadius: 0,
                borderWidth: 0,
                borderBottomWidth: 0,
                fontSize: 20
              }}
              title="CONTACT NUMBER"
              autoFocus={Platform.OS === "android" && !number ? false : true}
              dialCode={dialCode}
              number={number}
              onChangeValue={({ label }) =>
                this.setState({
                  dialCode: label.replace(/[^\d.+]/g, "")
                })
              }
              onChangeDialCode={text =>
                text ? this.setState({ dialCode: text }) : null
              }
              onChangeNum={text => this.setState({ number: text })}
              cancel={() => this.setState({ number: "" })}
            />
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft
              onPress={() => navigation.navigate(DATE_TO_END_WORK)}
            >
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                dialCode && number
                  ? () => this.validateNum()
                  : () => Alert.alert("Please enter details")
              }
            >
              NEXT
            </BottomButtonRight>
          </View>
          {/* bottom end */}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ personalInfo }) => {
  return {
    phoneNumber: personalInfo.contact_number
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(PhoneNumber);
