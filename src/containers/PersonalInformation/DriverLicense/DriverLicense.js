import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import {
  Screen,
  Heading,
  FooterWithButtons,
  RadioButton,
  Input,
  Screen2,
  TextAreaInput
} from "../../../components/common";
import { inputChanged } from "../../../redux/actions";
import * as CONSTANTS from "../../../constants";

import styles from "./styles";

class DriverLicense extends Component {
  onInputChange(text, type) {
    this.props.inputChanged(text, type);
  }

  render() {
    const RadioOptions = [
      { label: "Yes       ", value: true },
      { label: "No", value: false }
    ];
    const {
      navigation: { navigate },
      personalInfo
    } = this.props;

    return (
      <Screen2>
        {/* Screen Content */}

        <View key="content">
          <View>
            <Heading>PERSONAL DETAILS</Heading>
          </View>

          <View>
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 15 }}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Do You have a driver's license?
            </Text>
            <View>
              <RadioButton
                options={RadioOptions}
                value={personalInfo.driving_license}
                formHorizontal
                onPress={value =>
                  this.onInputChange(value, CONSTANTS.DRIVING_LICENSE_CHANGED)
                }
              />
            </View>
          </View>
          <View>
            <TextAreaInput
              additionalTxtStyle={{
                height: 50,
                borderColor: "#000000",
                borderWidth: 1,
                borderRadius: 6,
                marginTop: 10,
                alignItems: "center"
              }}
              numberOfLines={1}
              placeholder="Skype Name (Optional)"
              onChangeText={SkypeName => {
                this.onInputChange(SkypeName, CONSTANTS.SKYPE_NAME_CHANGED);
              }}
              value={personalInfo.skype_name}
            />
          </View>
          {/* <View style={styles.input}>
            <Input
              placeholder="Telephone Number (Optional)"
              onChangeText={tnumber => this.onInputChange(tnumber, CONSTANTS.TNUMBER_CHANGED)}
              value={personalInfo.mailing_address}
              maxLength={11}
              number
            />
          </View> */}
          {/* <View>
            <Text style={{ fontSize: 15, marginTop: 10, fontWeight: 'bold' }}>Dial code</Text>
            <DropDown
              selectedValue={personalInfo.telephone_dial_code}
              options={options}
              onValueChange={({ key }) => {
                this.onInputChange(key, CONSTANTS.TDIAL_CODE_CHANGED);
              }}
            />
          </View> */}
          <View>
            <Text style={{ fontSize: 15, marginTop: 10, fontWeight: "bold" }}>
              Remember to get involved with our social media!
            </Text>

            <TextInput
              style={{
                height: 100,
                borderColor: "#000000",
                borderWidth: 1,
                borderRadius: 6,
                marginTop: 10
              }}
              value={personalInfo.social_media_links}
              multiline
              additionalTxtStyle={{ flex: 1 }}
              onChangeText={textData =>
                this.onInputChange(textData, CONSTANTS.SOCIAL_LINKS_CHANGED)
              }
              maxLength={250}
              numberOfLines={16}
            />
          </View>
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(CONSTANTS.PHONE_NUMBER)}
            rightBtnNavigation={
              personalInfo.driving_license !== null &&
              (!personalInfo.mailing_address ||
                (personalInfo.mailing_address.length >= 11 &&
                  personalInfo.telephone_dial_code)) &&
              personalInfo.social_media_links
                ? () => {
                    navigate(CONSTANTS.MAILING_ADDRESS);
                  }
                : () => Alert.alert("Please enter details")
            }
            btnTxt={{ leftBtnTxt: "PREVIOUS", rightBtnTxt: "NEXT" }}
          />
        </View>
        {/* Content end */}
      </Screen2>
    );
  }
}

const mapStateToProps = ({ personalInfo }) => {
  return {
    personalInfo
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(DriverLicense);
