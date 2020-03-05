import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
  Image,
  Platform,
  Keyboard,
  Dimensions
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";

import {
  hideHeader,
  inputChanged,
  loginAction,
  forgotPassword
} from "../../redux/actions";
import { EMAIL_CHANGED, SIGNUP_NAV } from "../../constants";
import { validateEmail } from "../../helpers/Validators";
import { AppLogo, Screen, Spinner } from "../../components/common";
import styles from "./styles";
import { setItem } from "../../helpers/Localstorage";

const { height } = Dimensions.get("window");
const backgroundImage = require("../../assets/images/Background/login_signup.jpg");

class Login extends Component {
  state = {
    password: null,
    secureTextEntry: true,
    keyboard: false,
    forgot: false
  };

  componentDidMount() {
    this.props.hideHeader();
    setItem("reduceOnboarding", "reduceOnboarding");
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      this.keyboardDidShow()
    );
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      this.keyboardDidHide()
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow() {
    this.setState({ keyboard: true });
  }

  keyboardDidHide() {
    this.setState({ keyboard: false });
  }

  login() {
    const { password } = this.state;
    const { email, fetchedUserProfile, formsStatus } = this.props;
    if (!validateEmail(email)) {
      // return Alert.alert("An error happened", "Please enter a valid email", [
      //   {
      //     text: "Ok"
      //   }
      // ]);
    }
    if (!password) {
      // return Alert.alert("An error happened", "Please enter a valid password", [
      //   {
      //     text: "Ok"
      //   }
      // ]);
    }

    const userObj = {
      email,
      password,
      fetchedUserProfile,
      formsStatus
    };
    return this.props.loginAction(userObj);
  }

  submit() {
    const { email } = this.props;
    if (!validateEmail(email))
      //return Alert.alert("An error happened", "Please enter a valid email");

    this.setState({ forgot: false });
    return this.props.forgotPassword({ email });
  }

  render() {
    console.log("Login", this.props.fetchedUserProfile);
    SplashScreen.hide();
    if (Platform.OS === "android") StatusBar.setTranslucent(true);
    const {
      loading,
      email,
      navigation: { navigate }
    } = this.props;
    const { secureTextEntry, password, keyboard, forgot } = this.state;
    const {
      screenContainer,
      backgroundImageStyle,
      formContainer,
      inputContainer,
      inputStyle,
      buttonContainer,
      btnStyle,
      btnText,
      logoStyle,
      skipBtnStyle,
      skipBtnText,
      cancelButton,
      cancelImage,
      passwordInputContainer,
      passwordInputStyle
    } = styles;

    return (
      <ImageBackground
        source={backgroundImage}
        style={backgroundImageStyle}
        resizeMethod="auto"
        resizeMode="stretch"
      >
        <Screen>
          <View key="content">
            <View style={screenContainer}>
              <View style={formContainer}>
                <View style={[logoStyle, { marginTop: height * 0.15 }]}>
                  {/* <AppLogo /> */}
                </View>
                <View style={inputContainer}>
                  <TextInput
                    style={inputStyle}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={text =>
                      this.props.inputChanged(text, EMAIL_CHANGED)
                    }
                    value={email || ""}
                    onSubmitEditing={() =>
                      !password ? this.Password.focus() : null
                    }
                  />
                </View>
                {!forgot ? (
                  <View style={passwordInputContainer}>
                    <TextInput
                      ref={ref => (this.Password = ref)}
                      secureTextEntry={secureTextEntry}
                      style={passwordInputStyle}
                      placeholder="Password"
                      autoCapitalize="none"
                      placeholderTextColor="#fff"
                      onChangeText={text => this.setState({ password: text })}
                      value={password}
                    />
                    {secureTextEntry ? (
                      <TouchableOpacity
                        style={cancelButton}
                        onPress={() =>
                          this.setState({ secureTextEntry: false })
                        }
                      >
                        <Image
                          style={cancelImage}
                          source={require("../../assets/images/eye/view.png")}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={cancelButton}
                        onPress={() => this.setState({ secureTextEntry: true })}
                      >
                        <Image
                          style={cancelImage}
                          source={require("../../assets/images/eye/hide.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : null}
                {forgot ? (
                  <TouchableOpacity
                    onPress={
                      !loading ? () => this.setState({ forgot: !forgot }) : null
                    }
                    style={skipBtnStyle}
                  >
                    <Text style={[skipBtnText]}>
                      Remembered Password? Go to Login!
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={
                      !loading ? () => this.setState({ forgot: !forgot }) : null
                    }
                    style={[
                      skipBtnStyle,
                      { marginTop: 0, alignSelf: "flex-end" }
                    ]}
                  >
                    <Text style={[skipBtnText]}>Forgot Password?</Text>
                  </TouchableOpacity>
                )}
                {!keyboard ? (
                  <View style={buttonContainer}>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <TouchableOpacity
                        onPress={
                          forgot ? () => this.submit() : () => this.login()
                        }
                        style={btnStyle}
                      >
                        <Text style={btnText}>
                          {forgot ? "Submit" : "Login"}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {!forgot ? (
                      <TouchableOpacity
                        onPress={!loading ? () => navigate(SIGNUP_NAV) : null}
                        style={skipBtnStyle}
                      >
                        <Text style={skipBtnText}>
                          Don&apos;t have account? Please Register
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          <View key="footer">
            {keyboard ? (
              <View style={buttonContainer}>
                {loading ? (
                  <Spinner />
                ) : (
                  <TouchableOpacity
                    onPress={forgot ? () => this.submit() : () => this.login()}
                    style={[btnStyle, { marginRight: 20 }]}
                  >
                    <Text style={btnText}>{forgot ? "Submit" : "Login"}</Text>
                  </TouchableOpacity>
                )}
                {!forgot ? (
                  <TouchableOpacity
                    onPress={!loading ? () => navigate(SIGNUP_NAV) : null}
                    style={skipBtnStyle}
                  >
                    <Text style={skipBtnText}>
                      Don&apos;t have account? Please Register
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
        </Screen>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({
  emailReducer: { email },
  fetchedUserProfile,
  formsStatus,
  loginReducer: { loading }
}) => {
  return {
    email,
    fetchedUserProfile,
    formsStatus,
    loading
  };
};

export default connect(
  mapStateToProps,
  { hideHeader, loginAction, inputChanged, forgotPassword }
)(Login);
