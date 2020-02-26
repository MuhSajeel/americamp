import React, { Component } from 'react';
import {
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Text,
  Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import { Thumbnail } from 'react-native-thumbnail-video';
import { connect } from 'react-redux';
import { Heading, BottomButtonLeft } from '../../../components/common';
import { FormDetail } from '../../../components/YourProfileScreens/Form/index';
import styles from './styles';
import {
  APPLICATION_STATUS,
  REFERENCES_VIEW_ROUTE,
  DIRECT_PLACEMENT,
  NEW_APPLICANT,
  RETURN_TO_CAMP,
  AM_SUPPORT_STAFF_ROLE,
  BLACK_COLOR,
  APP_COLOR,
  PLACEHOLDER_COLOR
} from '../../../constants';

const { width } = Dimensions.get('window');
class StageTwoForm extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate(APPLICATION_STATUS);

    return true;
  };

  renderReferences = () => {
    return this.props.references.map((item, index) => {
      const { name, email, status } = item;
      return (
        <View key={index}>
          <Heading extraStyling={{ fontSize: 24, lineHeight: 35 }}>
            Reference {index + 1}
          </Heading>
          <FormDetail title='Name of Referee' value={name} />
          <FormDetail title='Email' value={email} />
          <FormDetail title='Status' value={status} />
          {status === 'awaiting' ? (
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(REFERENCES_VIEW_ROUTE)
                }
              >
                <Text style={{ color: '#ff0000', paddingTop: 0, marginTop: 0 }}>
                  Edit Reference
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      );
    });
  };
  renderData = data => {
    return data.map(item => {
      return (
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: width * 0.8,
              aspectRatio: 1,
              borderColor: BLACK_COLOR,
              borderWidth: 1
            }}
            source={{
              uri: item
            }}
            resizeMode='stretch'
            indicator={Progress.Pie}
            indicatorProps={{
              borderWidth: 0,
              color: APP_COLOR,
              unfilledColor: PLACEHOLDER_COLOR
            }}
            resizeMethod='resize'
            key={item}
          />
        </View>
      );
    });
  };

  render() {
    const {
      navigation,
      fetchedUserProfile: { emergency_contact, apply_now },
      documents
    } = this.props;
    const { navigate } = navigation;
    const { screenContainer, buttonContainer, bottomLine } = styles;
    const { contact, next_of_kin } = emergency_contact;
    const { application_type, role } = apply_now;
    const {
      video,
      proof_of_student_status,
      return_to_camp_invite,
      camp_contract
    } = documents;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={screenContainer}>
            <View style={{ alignItems: 'center' }}>
              <Heading>Stage 2</Heading>
            </View>
            {application_type === NEW_APPLICANT ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ fontSize: 40 }}>Video</Heading>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => Linking.openURL(video[0])}
                >
                  <Thumbnail
                    imageWidth={width * 0.8}
                    url={video[0]}
                    onError={() => <Text>Unable To Load</Text>}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            {application_type === RETURN_TO_CAMP ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ fontSize: 40 }}>
                  Return To Camp Invite
                </Heading>
                {this.renderData(return_to_camp_invite)}
              </View>
            ) : null}
            {application_type == DIRECT_PLACEMENT ? (
              camp_contract != false ? (
                <View style={{ paddingBottom: 16 }}>
                  <Heading extraStyling={{ paddingVertical: 10, fontSize: 40 }}>
                    Camp Contract
                  </Heading>
                  {this.renderData(camp_contract)}
                </View>
              ) : null
            ) : null}
            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ fontSize: 40 }}>References</Heading>
              <View>{this.renderReferences()}</View>
            </View>

            <View style={{ paddingBottom: 16 }}>
              <Heading extraStyling={{ paddingVertical: 10, fontSize: 40 }}>
                Emergency Contact Details
              </Heading>
              {/* <Heading extraStyling={{ fontSize: 30, lineHeight: 30 }}>
                Emergency Contact INFORMATION
              </Heading>
              <Heading extraStyling={{ fontSize: 30, lineHeight: 30 }}>
                Contact Detail
              </Heading> */}
              <FormDetail
                title='Contact Name'
                value={contact.info.contact_name}
              />
              <FormDetail
                title='Relationship To Participant'
                value={contact.info.relationship}
              />
              {contact.info.home_phone ? (
                <View>
                  <FormDetail
                    title='Home Phone'
                    value={`${contact.info.home_dial_code}-${
                      contact.info.home_phone
                    }`}
                  />
                </View>
              ) : null}
              <FormDetail
                title='Mobile Number'
                value={`${contact.info.mobile_dial_code}-${
                  contact.info.mobile_number
                }`}
              />
              <FormDetail
                title='Email Address'
                value={contact.info.contact_email}
              />
              <Heading extraStyling={{ fontSize: 30, lineHeight: 30 }}>
                Contact Address
              </Heading>
              <FormDetail
                title='Address Line 1'
                value={contact.address.address_line1}
              />
              {contact.address.address_line2 ? (
                <FormDetail
                  title='Address Line 2'
                  value={contact.address.address_line2}
                />
              ) : null}
              <FormDetail title='City' value={contact.address.city} />
              {contact.address.state ? (
                <FormDetail
                  title='County/State'
                  value={contact.address.state}
                />
              ) : null}
              <FormDetail
                title='Postal Code'
                value={contact.address.postcode}
              />
              <FormDetail title='Country' value={contact.address.country} />

              <Heading extraStyling={{ fontSize: 30, lineHeight: 30 }}>
                Next Of Kin Details
              </Heading>
              <FormDetail
                title='Contact Name'
                value={next_of_kin.info.contact_name}
              />
              <FormDetail
                title='Relationship To Participant'
                value={next_of_kin.info.relationship}
              />
              {next_of_kin.info.home_phone ? (
                <View>
                  <FormDetail
                    title='Home Phone'
                    value={`${next_of_kin.info.home_dial_code}-${
                      next_of_kin.info.home_phone
                    }`}
                  />
                </View>
              ) : null}
              {next_of_kin.info.mobile_number ? (
                <View>
                  <FormDetail
                    title='Mobile Number'
                    value={`${next_of_kin.info.mobile_dial_code}-${
                      next_of_kin.info.mobile_number
                    }`}
                  />
                </View>
              ) : null}
              <FormDetail
                title='Email Address'
                value={next_of_kin.info.contact_email}
              />
              <Heading extraStyling={{ fontSize: 30, lineHeight: 30 }}>
                Next Of Kin Address
              </Heading>
              <FormDetail
                title='Address Line 1'
                value={next_of_kin.address.address_line1}
              />
              {next_of_kin.address.address_line2 ? (
                <FormDetail
                  title='Address Line 2'
                  value={next_of_kin.address.address_line2}
                />
              ) : null}
              <FormDetail title='City' value={next_of_kin.address.city} />
              {next_of_kin.address.state ? (
                <FormDetail
                  title='County/State'
                  value={next_of_kin.address.state}
                />
              ) : null}
              <FormDetail
                title='Postal Code'
                value={next_of_kin.address.postcode}
              />
              <FormDetail title='Country' value={next_of_kin.address.country} />
            </View>
            {role === AM_SUPPORT_STAFF_ROLE ? (
              <View style={{ paddingBottom: 16 }}>
                <Heading extraStyling={{ fontSize: 40 }}>
                  Proof of student status
                </Heading>
                {this.renderData(proof_of_student_status)}
              </View>
            ) : null}

            <View style={bottomLine} />
          </View>
        </ScrollView>
        <View style={buttonContainer} key='bottomLeft'>
          <BottomButtonLeft onPress={() => navigate(APPLICATION_STATUS)}>
            Back
          </BottomButtonLeft>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    fetchedUserProfile: state.fetchedUserProfile,
    references: state.referenceReducer.references,
    documents: state.Document
  };
};

export default connect(mapStateToProps)(StageTwoForm);
