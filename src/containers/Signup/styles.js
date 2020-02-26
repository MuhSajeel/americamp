import { StyleSheet } from "react-native";

import { BUTTON_COLOR, WHITE_COLOR, STATUSBAR_COLOR } from "../../constants";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: "20%"
  },
  backgroundImageStyle: {
    height: "100%",
    width: "100%"
  },
  formContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 20
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5
  },

  inputStyle: {
    flex: 1,
    height: 34,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 15,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff",
    shadowColor: WHITE_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    color: "#fff"
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginTop: 20
  },
  logoStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },
  btnStyle: {
    backgroundColor: BUTTON_COLOR,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BUTTON_COLOR
  },
  skipBtnStyle: {
    backgroundColor: STATUSBAR_COLOR,
    justifyContent: "flex-end",
    alignSelf: "center",
    marginTop: 20
  },
  passwordInputContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff"
  },
  passwordInputStyle: {
    flex: 1,
    height: 36,
    fontSize: 15,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    shadowColor: WHITE_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    color: "#fff"
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: WHITE_COLOR
  },
  skipBtnText: {
    fontSize: 15,
    color: WHITE_COLOR,
    textDecorationLine: "underline"
  },
  cancelImage: {
    width: 20,
    height: 20
  },

  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },

  dialcode: {
    color: "#fff",
    fontSize: 15,
    marginBottom: -5
  },

  phoneseperater: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    marginBottom: -5
  },
  phone: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    marginBottom: -5
  },

  SignupContainer: {
    height: 70,
    flex: 1,
    flexDirection: "row"
  },
  SignupCancelButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  SignupCancelImage: {
    width: 20,
    height: 20
  }
});

export default styles;
