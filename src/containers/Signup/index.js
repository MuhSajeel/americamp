/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  Dimensions
} from "react-native";

import { connect } from "react-redux";

import { hideHeader, inputChanged, signUp } from "../../redux/actions";

import { EMAIL_CHANGED, LOGIN_NAV } from "../../constants";
import { validateEmail } from "../../helpers/Validators";
import { AppLogo, Screen, Spinner, DropDown } from "../../components/common";

import styles from "./styles";
const { height } = Dimensions.get("window");
import { setItem } from "../../helpers/Localstorage";

import options from "../../assets/data/newCountryCode";

const backgroundImage = require("../../assets/images/Background/login_signup.jpg");

class SignUp extends Component {
  state = {
    password: null,
    first_name: null,
    last_name: null,
    dialCode: "+44",
    number: "",
    keyboard: false,
    secureTextEntry: true
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

  signup() {
    const { first_name, last_name, dialCode, number, password } = this.state;
    const { email, signUp, fetchedUserProfile, formsStatus } = this.props;
    if (!validateEmail(email))
      return Alert.alert("An error happened", "Please enter a valid email");
    if (!password)
      return Alert.alert("An error happened", "Please enter a valid password");
    if (!first_name)
      return Alert.alert("An error happened", "Please enter first name");
    if (!last_name)
      return Alert.alert("An error happened", "Please enter last name");
    const dial = dialCode || "+44";
    const contact_number = `${dial}-${number}`;
    if (dial[0] !== "+" || dial.length < 2)
      return Alert.alert("Invalid Dial Code!");
    if (number.length < 10) return Alert.alert("Invalid Phone Number!");

    const user = {
      first_name,
      last_name,
      contact_number,
      email,
      password,
      fetchedUserProfile,
      formsStatus
    };
    return signUp({ user });
  }

  render() {
    if (Platform.OS === "android") StatusBar.setTranslucent(true);

    const {
      loading,
      email,
      navigation: { navigate }
    } = this.props;
    const { first_name, last_name, dialCode, number, password } = this.state;
    const {
      screenContainer,
      backgroundImageStyle,
      formContainer,
      inputContainer,
      inputStyle,
      buttonContainer,
      btnStyle,
      passwordInputStyle,
      skipBtnStyle,
      skipBtnText,
      btnText,
      logoStyle,
      cancelImage,
      cancelButton,
      passwordInputContainer,
      dialcode,
      phoneseperater,
      phone,
      SignupContainer
    } = styles;

    return (
      <ImageBackground
        source={backgroundImage}
        style={backgroundImageStyle}
        resizeMethod="auto"
        resizeMode="stretch"
      >
        <Screen>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={50}
            key="content"
          >
            <View style={screenContainer}>
              <View style={formContainer}>
                <View style={[logoStyle, { marginTop: height * 0.15 }]}>
                  {/* <AppLogo /> */}
                </View>
                <View style={inputContainer}>
                  <TextInput
                    style={{ ...inputStyle, marginRight: 5 }}
                    placeholder="First name"
                    placeholderTextColor="#fff"
                    onChangeText={first_name => this.setState({ first_name })}
                    value={first_name || ""}
                    onSubmitEditing={() => this.lname.focus()}
                  />
                  <TextInput
                    style={inputStyle}
                    ref={ref => (this.lname = ref)}
                    placeholder="Last name"
                    placeholderTextColor="#fff"
                    onChangeText={last_name => this.setState({ last_name })}
                    value={last_name || ""}
                  />
                </View>
                <View style={inputContainer}>
                  <View style={[inputStyle, { padding: 0 }]}>
                    <View style={[SignupContainer, { borderBottomWidth: 0.5 }]}>
                      <DropDown
                        options={options}
                        customStyle={{
                          height: 30,
                          paddingRight: 5,
                          borderRadius: 0,
                          borderWidth: 0,
                          borderBottomWidth: 0,
                          fontSize: 15,
                          color: "white"
                        }}
                        onValueChange={({ label }) =>
                          this.setState({
                            dialCode: label.replace(/[^\d.+]/g, "")
                          })
                        }
                        value={dialCode}
                      />

                      {dialCode ? (
                        <TextInput
                          style={phoneseperater}
                          value="-"
                          editable={false}
                        />
                      ) : null}
                      <TextInput
                        style={phone}
                        ref={ref => (this.phoneNo = ref)}
                        keyboardType="numeric"
                        maxLength={11}
                        placeholderTextColor="#fff"
                        placeholder="Phone number"
                        value={number}
                        onChangeText={text => this.setState({ number: text })}
                        onSubmitEditing={() => this.email.focus()}
                      />
                    </View>
                  </View>
                </View>
                <View style={inputContainer}>
                  <TextInput
                    style={inputStyle}
                    ref={ref => (this.email = ref)}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={email =>
                      this.props.inputChanged(email, EMAIL_CHANGED)
                    }
                    onSubmitEditing={() => this.password.focus()}
                    value={email || ""}
                  />
                </View>
                <View style={passwordInputContainer}>
                  <TextInput
                    ref={ref => (this.password = ref)}
                    secureTextEntry={this.state.secureTextEntry}
                    style={passwordInputStyle}
                    placeholder="Password"
                    autoCapitalize="none"
                    placeholderTextColor="#fff"
                    onChangeText={password => this.setState({ password })}
                    value={password || ""}
                  />
                  {this.state.secureTextEntry ? (
                    <TouchableOpacity
                      style={cancelButton}
                      onPress={() => this.setState({ secureTextEntry: false })}
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
                {!this.state.keyboard ? (
                  <View style={buttonContainer}>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.signup()}
                        style={btnStyle}
                      >
                        <Text style={btnText}>Signup</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        navigate(LOGIN_NAV);
                      }}
                      style={skipBtnStyle}
                    >
                      <Text style={skipBtnText}>
                        Already registered? Please login.
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          </KeyboardAvoidingView>
          <View key="footer">
            {this.state.keyboard ? (
              <View style={buttonContainer}>
                {loading ? (
                  <Spinner />
                ) : (
                  <TouchableOpacity
                    onPress={() => this.signup()}
                    style={[btnStyle, { marginRight: 20 }]}
                  >
                    <Text style={btnText}>Signup</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    navigate(LOGIN_NAV);
                  }}
                  style={skipBtnStyle}
                >
                  <Text style={skipBtnText}>
                    Already registered? Please login.
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </Screen>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({
  fetchedUserProfile,
  formsStatus,
  emailReducer: { email },
  signUpReducer: { loading }
}) => {
  return {
    email,
    loading,
    fetchedUserProfile,
    formsStatus
  };
};

export default connect(
  mapStateToProps,
  { hideHeader, signUp, inputChanged }
)(SignUp);
