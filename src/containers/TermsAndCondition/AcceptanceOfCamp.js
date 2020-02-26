/* eslint-disable no-return-assign,react/jsx-pascal-case */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, Image } from "react-native";
import { connect } from "react-redux";
import SignatureCapture from "react-native-signature-capture";

import { CheckBox, Icon } from "react-native-elements";
import { inputChanged, infoSubmited } from "../../redux/actions";
import {
  Heading,
  Screen,
  FooterWithButtons,
  BottomButtonLeft,
  Input,
  Spinner
} from "../../components/common";
import {
  APP_COLOR,
  NAME_CHANGE_ACTION,
  DATE_CHANGE_ACTION,
  SIGNATURE_CHANGE_ACTION,
  GO_TO_AMERICA
} from "../../constants";
import { getCurrentDate } from "../../helpers/GetCurrentDate";
import { TNC_Text } from "./TNC_Text";
import textAmerica from "./TNC_Material.json";
import textCanada from "./TNC_canada_Material.json";

const { width } = Dimensions.get("window");

class AcceptanceOfCampComp extends Component {
  state = {
    userSigned: false,
    editable: true,
    confirm: false,
    certify: false
  };

  signatureUser;

  componentDidMount() {
    const {
      fetchedUserProfile: {
        program_agreement: { camp_initial, depart_initial },
        personal_info: { first_name, last_name }
      },
      name,
      date,
      signature,
      inputChanged
    } = this.props;
    if (!name) inputChanged(`${first_name} ${last_name}`, NAME_CHANGE_ACTION);
    if (!date) inputChanged(getCurrentDate("/"), DATE_CHANGE_ACTION);
    if (signature) this.setState({ editable: false });
    if (camp_initial) this.setState({ confirm: true });
    if (depart_initial) this.setState({ certify: true });
  }

  render() {
    const { inputStyle } = styles;
    const { userSigned, editable, confirm, certify } = this.state;
    const {
      navigation,
      inputChanged,
      name,
      signature,
      date,
      fetchedUserProfile,
      loading,
      programAgreementReducer,
      infoSubmited,
      where_you_want_to_go
    } = this.props;
    const text =
      where_you_want_to_go === GO_TO_AMERICA ? textAmerica : textCanada;
    console.log(fetchedUserProfile);

    return (
      <Screen>
        <View key="content">
          <Heading>
            <Text style={{ color: APP_COLOR }}>Acceptance</Text> and Placement
            at a Camp
          </Heading>
          <TNC_Text text={text} />
          <View style={inputStyle}>
            <Input placeholder="NAME" editable={false} value={name} />
          </View>
          <View style={inputStyle}>
            <Input
              placeholder="EMAIL"
              editable={false}
              value={fetchedUserProfile.email}
            />
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={{ marginTop: 10, fontSize: 17, color: "grey" }}>
              SIGNATURE
            </Text>
            <View
              style={{
                marginTop: 10,
                width: width * 0.7,
                aspectRatio: 1,
                flex: 1,
                borderWidth: 1,
                borderColor: "grey",
                borderStyle: "dotted"
              }}
            >
              {signature ? (
                <Image
                  style={{ flex: 1, borderWidth: 0.4 }}
                  source={{
                    uri: `data:image/png;base64,${signature}`
                  }}
                />
              ) : (
                <SignatureCapture
                  style={{ flex: 1, borderWidth: 0.4 }}
                  ref={ref => (this.signatureUser = ref)}
                  onSaveEvent={({ encoded }) => {
                    inputChanged(encoded, SIGNATURE_CHANGE_ACTION);
                  }}
                  // onDragEvent={}
                  showNativeButtons={false}
                  viewMode="portrait"
                  showTitleLabel={false}
                />
              )}
            </View>
            {signature || userSigned ? null : (
              <View
                style={{
                  flexDirection: "row",
                  width: width * 0.7,
                  justifyContent: "flex-end"
                }}
              >
                <Icon
                  type="font-awesome"
                  name="eraser"
                  iconStyle={{ color: "grey", marginLeft: 10 }}
                  onPress={() => {
                    this.setState({ userSigned: false });
                    return this.signatureUser.resetImage();
                  }}
                />
                <Icon
                  type="font-awesome"
                  name="save"
                  iconStyle={{ color: "grey", marginLeft: 10 }}
                  onPress={() => {
                    this.setState({ userSigned: true });
                    this.signatureUser.saveImage();
                  }}
                />
              </View>
            )}
          </View>
          <View style={inputStyle}>
            <Input
              placeholder="DATE (dd/mm/yyyy)"
              editable={false}
              value={date}
            />
          </View>
          {/* check box start */}
          <Text style={{ fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>
            Please Confirm:
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              flex: 1
            }}
          >
            <View style={{ flex: 1 }}>
              <CheckBox
                size={20}
                checked={confirm}
                checkedColor={APP_COLOR}
                onPress={
                  editable || !confirm
                    ? () => {
                        // if (signature && !userSigned)
                        //   this.setState({
                        //     confirm: !confirm,
                        //     userSigned: true
                        //   });
                        // else this.setState({ confirm: !confirm });
                        this.setState({ confirm: !confirm });
                      }
                    : null
                }
              />
            </View>
            <View style={{ flex: 5 }}>
              <Text style={{ marginTop: 10, marginBottom: 10 }}>
                {text.confirm}
              </Text>
            </View>
          </View>
          <Text style={{ fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>
            Please Certify:
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              flex: 1
            }}
          >
            <View style={{ flex: 1 }}>
              <CheckBox
                size={20}
                checked={certify}
                checkedColor={APP_COLOR}
                onPress={
                  editable || !certify
                    ? () => {
                        //     if (signature && !userSigned)
                        //       this.setState({
                        //         certify: !certify,
                        //         userSigned: true
                        //       });
                        //     else this.setState({ certify: !certify });
                        //   }
                        // : null
                        this.setState({ certify: !certify });
                      }
                    : null
                }
              />
            </View>
            <View style={{ flex: 5 }}>
              <Text style={{ marginTop: 10, marginBottom: 10 }}>
                {text.certify}
              </Text>
            </View>
          </View>
        </View>
        <View key="footer">
          {loading ? (
            <View style={{ alignItems: "flex-end" }}>
              <Spinner />
            </View>
          ) : fetchedUserProfile.program_agreement.accept_term ? (
            <View style={{ paddingTop: 10 }} key="bottomLeft">
              <BottomButtonLeft onPress={() => navigation.goBack(null)}>
                Close
              </BottomButtonLeft>
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigation.goBack(null)}
              rightBtnNavigation={
                // eslint-disable-next-line no-nested-ternary
                confirm && certify
                  ? signature || userSigned
                    ? () => {
                        const data = { ...fetchedUserProfile };
                        data.program_agreement = programAgreementReducer;
                        data.program_agreement.accept_term = true;
                        data.program_agreement.camp_initial = "true";
                        data.program_agreement.depart_initial = "true";
                        infoSubmited(data);
                      }
                    : () =>
                        Alert.alert(
                          "Please sign and save the signature to proceed"
                        )
                  : null
              }
              btnTxt={{ leftBtnTxt: "CLOSE", rightBtnTxt: "AGREE" }}
            />
          )}
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    marginTop: 20,
    marginBottom: 20
  }
});

const mapStateToProps = ({
  programAgreementReducer: {
    name,
    signature,
    date,
    parent_name,
    parent_sign,
    parent_date
  },
  uploadDocument: { uploading },
  fetchedUserProfile,
  submitInfoReducer: { loading },
  programAgreementReducer,
  stageZeroReducer: {
    apply_now: { where_you_want_to_go }
  }
}) => ({
  name,
  signature,
  date,
  parent_name,
  parent_sign,
  parent_date,
  uploading,
  fetchedUserProfile,
  loading,
  programAgreementReducer,
  where_you_want_to_go
});

const AcceptanceOfCamp = connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(AcceptanceOfCampComp);

export { AcceptanceOfCamp };
