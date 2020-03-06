/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../../redux/actions';

import {
  Screen,
  Heading,
  FooterWithButtons,
  DropDown,
  RadioButton,
  Spinner,
  PhoneInput
} from '../../../components/common';
import { validateEmail } from '../../../helpers/Validators';
import { Input } from '../../../components/common/Input';
import styles from './styles';
import {
  CAMP_INFORMATION,
  CAMP_EMPLOYEE_NAME_CHANGE,
  CAMP_DIRECTOR_CHANGE,
  CAMP_EMAIL_CHANGE,
  CAMP_PHONE_CHANGE,
  JOB_TYPE_CHANGE,
  APPLY_STATUS,
  ENTER_VALID_EMAIL
} from '../../../constants';

class CampDetails extends Component {
  state = {
    application_type: '',
    dialCode: '',
    Number: ''
  };

  componentDidMount() {
    this.setState({ application_type: this.props.application_type });
    this.props.camp_phone
      ? this.setState({
          dialCode: this.props.camp_phone.slice(
            0,
            this.props.camp_phone.length - 10
          ),
          Number:
            this.props.camp_phone.slice(
              this.props.camp_phone.length - 10,
              this.props.camp_phone.length
            ) || null
        })
      : this.setState({
          dialCode: '+44'
        });

    this.onInputChanged(this.state.dialCode, CAMP_PHONE_CHANGE);
  }

  onInputChanged(value, type) {
    this.props.inputChanged(value, type);
  }

  infoSubmit() {
    if (this.state.application_type === this.props.application_type) {
      const { camp_email, camp_phone } = this.props;
      if (!validateEmail(camp_email)) {
        return //Toast.show(ENTER_VALID_EMAIL);
      }
      if (camp_phone.length < 11) {
        return //Toast.show('Camp Phone Number must be at least 11 digits long');
      }
      const data = this.props.fetchedUserProfile;
      data.camp_information = this.props.campReducer;

      return this.props.infoSubmited(data);
    }
    return Alert.alert(
      "Can't get you through!",
      "Your current selection doesn't match with your previous selection for more information please contact AmeriCamp."
    );
  }

  render() {
    console.log(this.state.dialCode);

    const {
      navigation,
      camp_employee_name,
      camp_director,
      camp_email,
      camp_phone,
      job_type,
      loading
    } = this.props;
    const RadioOptions = [
      { label: 'Returner    ', value: 'return_to_camp' },
      { label: 'Direct Placement', value: 'direct_placement' }
    ];
    const options = [
      {
        key: '1',
        label: 'JobType 1'
      },
      {
        key: '2',
        label: 'JobType 2'
      },
      {
        key: '3',
        label: 'JobType 3'
      }
    ];
    return (
      <Screen>
        {/* Screen Content */}
        <View key='content'>
          <Heading>Camp information</Heading>
          <View style={styles.input}>
            <Input
              height={85}
              placeholder={'Name of the camp \nemploying you in 2020'}
              onChangeText={CampEmploye =>
                this.onInputChanged(CampEmploye, CAMP_EMPLOYEE_NAME_CHANGE)
              }
              value={camp_employee_name}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder='Camp Director'
              onChangeText={CampDirector =>
                this.onInputChanged(CampDirector, CAMP_DIRECTOR_CHANGE)
              }
              value={camp_director}
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder='Camp Email'
              onChangeText={CampEmail =>
                this.onInputChanged(CampEmail, CAMP_EMAIL_CHANGE)
              }
              value={camp_email}
            />
          </View>
          <View style={styles.input}>
            {/* <Input
              placeholder='Camp Phone Number'
              number
              onChangeText={CampNumber =>
                this.onInputChanged(CampNumber, CAMP_PHONE_CHANGE)
              }
              value={camp_phone}
              maxLength={14}
              editable={false}
            /> */}
            <Text style={{ fontSize: 20 }}>Camp Phone Number</Text>
          </View>
          <View style={{ borderWidth: 0.5, padding: 0 }}>
            <PhoneInput
              dropdown={true}
              customStyle={{
                height: 66,
                paddingLeft: 0,
                borderWidth: 0,
                borderBottomWidth: 0,
                fontSize: 20
              }}
              placeholder={'1234567890'}
              dialCode={this.state.dialCode}
              number={this.state.Number}
              onChangeValue={({ label }) => {
                label ? (label = label.replace(/[^\d.+]/g, '')) : null;
                this.setState({ dialCode: label });
                CampNumber = `${label}-${this.state.Number}`;
                this.onInputChanged(CampNumber, CAMP_PHONE_CHANGE);
                console.log(CampNumber);
              }}
              onChangeNum={CampNumber => {
                this.setState({ Number: CampNumber });
                CampNumber = `${this.state.dialCode}-${CampNumber}`;
                this.onInputChanged(CampNumber, CAMP_PHONE_CHANGE);
                console.log(CampNumber);
              }}
            />
          </View>

          {/* <View style={{ marginTop: 15 }}> */}
          {/*  <Text */}
          {/*    style={{ */}
          {/*      marginTop: 8, */}
          {/*      fontWeight: 'bold', */}
          {/*      fontSize: 15, */}
          {/*    }} */}
          {/*  > */}
          {/*    Please indicate your job type */}
          {/*  </Text> */}
          {/*  <DropDown */}
          {/*    selectedValue={job_type} */}
          {/*    onValueChange={({ key }) => { */}
          {/*      this.onInputChanged(key, JOB_TYPE_CHANGE); */}
          {/*    }} */}
          {/*    options={options} */}
          {/*  /> */}
          {/* </View> */}
          <View style={styles.button}>
            <Text
              style={{
                marginTop: 8,
                fontWeight: 'bold',
                fontSize: 18
              }}
            >
              I am a:
            </Text>
            <View>
              <RadioButton
                options={RadioOptions}
                value={this.state.application_type}
                formHorizontal
                onPress={value => this.setState({ application_type: value })}
              />
            </View>
          </View>
        </View>

        <View key='footer'>
          {loading ? (
            <View style={{ alignItems: 'flex-end' }}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigation.navigate(CAMP_INFORMATION)}
              rightBtnNavigation={
                camp_employee_name && camp_director && camp_email && camp_phone
                  ? () => this.infoSubmit()
                  : null
              }
              btnTxt={{ rightBtnTxt: 'FINISH', leftBtnTxt: 'PREVIOUS' }}
            />
          )}
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

const mapStateToProps = ({
  campReducer,
  campReducer: {
    camp_employee_name,
    camp_director,
    camp_email,
    camp_phone,
    job_type
  },
  stageZeroReducer: {
    apply_now: { application_type }
  },
  submitInfoReducer,
  fetchedUserProfile
}) => {
  return {
    campReducer,
    camp_employee_name,
    camp_director,
    camp_email,
    camp_phone,
    job_type,
    application_type,
    submitInfoReducer,
    loading: submitInfoReducer.loading,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(CampDetails);
