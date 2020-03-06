import React, { Component } from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";

import {
  BottomButtonLeft,
  BottomButtonRight,
  CountryPicker,
  Screen,
  Card,
  FooterWithButtons
} from "../../components/common";
import {
  OptionsPickerScreen,
  InputScreen
} from "../../components/PersonalInformationScreens";
import { setItem } from "../../helpers/Localstorage";
import { inputChanged } from "../../redux/actions";
import {
  GENDER,
  DATE_TO_START_WORK,
  COUNTRY_OF_BIRTH_CHANGED,
  CITY_OF_BIRTH_CHANGED
} from "../../constants";

class CountryCityOfBirth extends Component {
  onInputChange(text, type) {
    this.props.inputChanged(text, type);
  }

  render() {
    const {
      navigation,
      cityOfBirth,
      countryOfBirth,
      personalInfo,
      fetchedUserProfile
    } = this.props;
    return (
      <Screen>
        {/*  Screen content */}
        <View key="content">
          <InputScreen
            title="CITY OF BIRTH"
            autoFocus={Platform.OS === "android" && !cityOfBirth}
            onChangeText={text =>
              this.onInputChange(text, CITY_OF_BIRTH_CHANGED)
            }
            value={cityOfBirth}
            cancel={() => this.onInputChange("", CITY_OF_BIRTH_CHANGED)}
          />
          <OptionsPickerScreen title="COUNTRY OF BIRTH">
            <CountryPicker
              countryCode={countryOfBirth}
              onValueChange={({ key }) =>
                this.onInputChange(key, COUNTRY_OF_BIRTH_CHANGED)
              }
              unHighlight={!countryOfBirth}
              placeholder={countryOfBirth || null}
            />
          </OptionsPickerScreen>
        </View>
        {/* content end */}

        {/* Bottom buttons or logo */}
        {/* <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(GENDER)}>
            PREVIOUS
          </BottomButtonLeft>
        </View> */}
        {/* <View key="bottomRight">
          <BottomButtonRight
            onPress={
              cityOfBirth && countryOfBirth
                ? () => {
                    const data = fetchedUserProfile;
                    data.personal_info = personalInfo;
                    setItem('@userProfile', JSON.stringify(data));
                    navigation.navigate(DATE_TO_START_WORK);
                  }
                : null
            }
          >
            NEXT
          </BottomButtonRight>
        </View> */}
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(GENDER)}
            rightBtnNavigation={
              cityOfBirth && countryOfBirth
                ? () => {
                    const data = fetchedUserProfile;
                    data.personal_info = personalInfo;
                    setItem("@userProfile", JSON.stringify(data));
                    navigation.navigate(DATE_TO_START_WORK);
                  }
                : () => Alert.alert("Please enter details")
            }
            btnTxt={{ rightBtnTxt: "NEXT", leftBtnTxt: "PREVIOUS" }}
          />
        </View>
        {/* bottom end */}
      </Screen>
    );
  }
}

const mapStateToProps = ({ personalInfo, fetchedUserProfile }) => {
  return {
    cityOfBirth: personalInfo.city_of_birth,
    countryOfBirth: personalInfo.country_of_birth,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(CountryCityOfBirth);
