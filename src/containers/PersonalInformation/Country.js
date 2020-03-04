import React, { Component } from "react";
import { View } from "react-native";
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
import { DATE_TO_START_WORK, COUNTRY_CHANGED, POSTCODE } from "../../constants";

class Country extends Component {
  onCountryChange(text) {
    this.props.inputChanged(text, COUNTRY_CHANGED);
  }

  render() {
    const {
      navigation,
      country,
      personalInfo,
      fetchedUserProfile
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <OptionsPickerScreen title="COUNTRY">
              <CountryPicker
                countryCode={country}
                onValueChange={({ key }) => this.onCountryChange(key)}
                unHighlight={!country}
              />
            </OptionsPickerScreen>
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigation.navigate(POSTCODE)}>
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                country
                  ? () => {
                      const data = fetchedUserProfile;
                      data.personal_info = personalInfo;
                      setItem("@userProfile", JSON.stringify(data));
                      navigation.navigate(DATE_TO_START_WORK);
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
    country: personalInfo.country,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(Country);
