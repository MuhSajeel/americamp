import React, { Component } from "react";
import { View, Alert } from "react-native";
import { connect } from "react-redux";

import {
  BottomButtonLeft,
  BottomButtonRight,
  CountryPicker,
  Card
} from "../../components/common";
import { OptionsPickerScreen } from "../../components/PersonalInformationScreens";
import { setItem } from "../../helpers/Localstorage";
import { inputChanged } from "../../redux/actions";
import { DATE_OF_BIRTH, COC_CHANGED, MIDDLE_NAME } from "../../constants";

class CountryOfCitizenship extends Component {
  onCountryOfCitizenshipChange(text) {
    this.props.inputChanged(text, COC_CHANGED);
  }

  render() {
    const {
      navigation,
      countryOfCitizenship,
      personalInfo,
      fetchedUserProfile
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <OptionsPickerScreen
              title="COUNTRY OF CITIZENSHIP"
              subHeading="AS STATED IN YOUR PASSPORT"
            >
              <CountryPicker
                countryCode={countryOfCitizenship}
                onValueChange={({ key }) =>
                  this.onCountryOfCitizenshipChange(key)
                }
                unHighlight={!countryOfCitizenship}
                placeholder={countryOfCitizenship || null}
              />
            </OptionsPickerScreen>
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigation.navigate(MIDDLE_NAME)}>
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                countryOfCitizenship
                  ? () => {
                      const data = fetchedUserProfile;
                      data.personal_info = personalInfo;
                      setItem("@userProfile", JSON.stringify(data));
                      navigation.navigate(DATE_OF_BIRTH);
                    }
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

const mapStateToProps = ({ personalInfo, fetchedUserProfile }) => {
  return {
    countryOfCitizenship: personalInfo.citizenship,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(CountryOfCitizenship);
