import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import {
  BottomButtonLeft,
  BottomButtonRight,
  Card
} from "../../components/common";
import { InputScreen } from "../../components/PersonalInformationScreens";
import { setItem } from "../../helpers/Localstorage";
import { inputChanged } from "../../redux/actions";
import { COUNTRY_STATE, CITY_CHANGED, ADDRESS_LINE_2 } from "../../constants";

class TownCity extends Component {
  onTownCityChange(text) {
    this.props.inputChanged(text, CITY_CHANGED);
  }

  render() {
    const {
      navigation,
      townCity,
      personalInfo,
      fetchedUserProfile
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <InputScreen
              title="TOWN/CITY"
              autoFocus
              onChangeText={text => this.onTownCityChange(text)}
              value={townCity}
              cancel={() => this.onTownCityChange("")}
            />
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft
              onPress={() => navigation.navigate(ADDRESS_LINE_2)}
            >
              PREVIOUS
            </BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <BottomButtonRight
              onPress={
                townCity
                  ? () => {
                      const data = fetchedUserProfile;
                      data.personal_info = personalInfo;
                      setItem("@userProfile", JSON.stringify(data));
                      navigation.navigate(COUNTRY_STATE);
                    }
                  : null
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
    townCity: personalInfo.town_city,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(TownCity);
