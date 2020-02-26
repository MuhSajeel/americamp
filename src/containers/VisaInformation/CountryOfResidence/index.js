/* eslint-disable camelcase */
import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {
  Screen,
  FooterWithButtons,
  Heading,
  SubHeading,
  CountryPicker
} from "../../../components/common";
import { inputChanged } from "../../../redux/actions";
import {
  VISA_INFORMATION_BOARDING,
  VISA_INFORMATION_J1_CAMP_COUNSELOR_VISAS,
  COUNTRY_OF_LEGAL_RESIDENCE_ACTION
} from "../../../constants";
import { OptionsPickerSection } from "../../../components/YourProfileScreens";

// eslint-disable-next-line no-shadow
const CountryOfLegalResidence = ({
  navigation,
  country_of_legal_residence,
  inputChanged
}) => {
  const { navigate } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading>VISA APPLICATION</Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>
          COUNTRY OF LEGAL RESIDENCE
        </SubHeading>
      </View>
      <View key="content" style={{ paddingTop: 30 }}>
        <OptionsPickerSection>
          <CountryPicker
            countryCode={country_of_legal_residence}
            initValue="Select Country"
            placeholder={country_of_legal_residence || null}
            onValueChange={({ key }) =>
              inputChanged(key, COUNTRY_OF_LEGAL_RESIDENCE_ACTION)
            }
            unHighlight={!country_of_legal_residence}
          />
        </OptionsPickerSection>
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(VISA_INFORMATION_BOARDING)}
          rightBtnNavigation={
            country_of_legal_residence
              ? () => navigate(VISA_INFORMATION_J1_CAMP_COUNSELOR_VISAS)
              : null
          }
          btnTxt={{ leftBtnTxt: "PREVIOUS", rightBtnTxt: "NEXT" }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({
  visaInformationReducer: { country_of_legal_residence }
}) => {
  return { country_of_legal_residence };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(CountryOfLegalResidence);
