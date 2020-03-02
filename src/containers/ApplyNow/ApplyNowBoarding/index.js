import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { HideNavigationBar } from "react-native-navigation-bar-color";

import {
  hideHeader,
  disableDrawer,
  disableHeader
} from "../../../redux/actions";
import { Screen, FooterWithLogo, Heading } from "../../../components/common";
import { WHERE_TO_GO_NAV } from "../../../constants";

const { height } = Dimensions.get("window");

class ApplyNowBoarding extends Component {
  componentDidMount() {
    this.props.disableDrawer();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.props.disableDrawer();
        if (Platform.OS === "android") {
          HideNavigationBar();
        }
        this.props.hideHeader();
        this.props.disableHeader();
      }
    );
  }

  render() {
    if (Platform.OS === "android") StatusBar.setTranslucent(true);
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <ImageBackground
        source={require("../../../assets/images/ApplyNow/AC_login_bkground-02.jpg")}
        style={{
          height: "100%",
          width: "100%",
          resizeMethod: "auto",
          resizeMode: "stretch"
        }}
      >
        <Screen>
          <View key="header" />
          <View key="content" style={{}}>
            <Heading
              extraStyling={{
                color: "#fff",
                marginTop: height * 0.65,
                fontSize: 25
              }}
            >
              READY TO CHANGE YOUR LIFE?
            </Heading>
            <Text style={{ color: "#fff", fontSize: 15 }}>
              Use our App to complete and save each stage of your application.
              We will help you every step of the way to ensure no deadline is
              ever missed!
            </Text>
          </View>
          <View key="footer">
            <FooterWithLogo
              navigate={() => navigate(WHERE_TO_GO_NAV)}
              btnTxt={{ leftBtnTxt: "APPLY" }}
              redButton
              teaLogo
              extraLogoStyle={{ tintColor: "#fff" }}
            />
          </View>
        </Screen>
      </ImageBackground>
    );
  }
}

export default connect(
  null,
  { hideHeader, disableHeader, disableDrawer }
)(ApplyNowBoarding);
