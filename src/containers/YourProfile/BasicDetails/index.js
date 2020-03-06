import { View, Text, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  DateAndTimePicker,
  CountryPicker,
  DropDown,
  FooterWithButtons,
  Spinner,
} from '../../../components/common';
import styles from './styles';
import * as CONSTANTS from '../../../constants';
import { inputChanged, infoSubmited } from '../../../redux/actions';
import { validateEmail } from '../../../helpers/Validators';
import { InputSection, OptionsPickerSection } from '../../../components/YourProfileScreens';

class BasicDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedButtonId: null };
  }

  componentDidUpdate() {
    const { emailReducer, fetchedUserProfile, personalInfo } = this.props;
    const data = fetchedUserProfile;
    data.email = emailReducer.email;
    data.personal_info = personalInfo;
  }

  onInputChange(text, type) {
    this.props.inputChanged(text, type);
  }

  onSubmit() {
    const { emailReducer, fetchedUserProfile, personalInfo } = this.props;
    if (!validateEmail(fetchedUserProfile.email) && fetchedUserProfile.email) {
      return Alert.alert('An error happened', 'Please enter a valid email', [
        {
          text: 'Ok',
        },
      ]);
    }
    const data = fetchedUserProfile;
    data.email = emailReducer.email;
    data.personal_info = personalInfo;
    return this.props.infoSubmited(data);
  }

  render() {
    const { navigation, emailReducer, personalInfo, loading } = this.props;
    const options = [
      {
        key: 1,
        label: 'Male',
      },
      {
        key: 2,
        label: 'Female',
      },
      {
        key: 3,
        label: 'Other',
      },
    ];
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>BASIC DETAILS</Text>
        <Text style={styles.text}>EDIT THE INFO BY SELECTING FIELD</Text>
        <View style={styles.fieldsContainer}>
          <Text style={styles.label}>PERSONAL DETAILS</Text>
          <InputSection
            textSize={16}
            padding={15}
            onChangeText={text => this.onInputChange(text, CONSTANTS.FNAME_CHANGED)}
            value={personalInfo.first_name}
            cancel={() => this.onInputChange('', CONSTANTS.FNAME_CHANGED)}
          />
          <InputSection
            textSize={16}
            padding={15}
            placeholder="Middle Name here (Optional)."
            onChangeText={text => this.onInputChange(text, CONSTANTS.MNAME_CHANGED)}
            value={personalInfo.middle_name}
            cancel={() => this.onInputChange('', CONSTANTS.MNAME_CHANGED)}
          />
          <InputSection
            textSize={16}
            padding={15}
            onChangeText={text => this.onInputChange(text, CONSTANTS.LNAME_CHANGED)}
            value={personalInfo.last_name}
            cancel={() => this.onInputChange('', CONSTANTS.LNAME_CHANGED)}
          />
          <OptionsPickerSection>
            <DropDown
              selectedValue={personalInfo.gender}
              onValueChange={({ key }) => this.onInputChange(key, CONSTANTS.GENDER_CHANGED)}
              options={options}
            />
          </OptionsPickerSection>
          <OptionsPickerSection>
            <CountryPicker
              countryCode={personalInfo.citizenship}
              onValueChange={({ key }) => this.onInputChange(key, CONSTANTS.COC_CHANGED)}
              unHighlight={personalInfo.citizenship}
            />
          </OptionsPickerSection>
          <OptionsPickerSection>
            <DateAndTimePicker
              date={personalInfo.dob}
              mode="date"
              androidMode="default"
              placeholder="Select date"
              format="DD-MM-YYYY"
              maxDate="2001-12-31"
              unHighlight
              onDateChange={selectedDate => this.onInputChange(selectedDate, CONSTANTS.DOB_CHANGED)}
            />
          </OptionsPickerSection>
          {loading && this.state.selectedButtonId === 0 ? (
            <Spinner />
          ) : (
            <FooterWithButtons
              rightBtnNavigation={() => {
                this.setState({ selectedButtonId: 0 });
                this.onSubmit();
              }}
              btnTxt={{ rightBtnTxt: 'SAVE' }}
            />
          )}
        </View>
        <View style={styles.fieldsContainer}>
          <Text style={styles.label}>ADDRESS DETAILS</Text>
          <InputSection
            textSize={16}
            padding={15}
            onChangeText={text => this.onInputChange(text, CONSTANTS.AL1_CHANGED)}
            value={personalInfo.address_line1}
            cancel={() => this.onInputChange('', CONSTANTS.AL1_CHANGED)}
          />
          <InputSection
            textSize={16}
            padding={15}
            placeholder="Address further here (Optional)."
            onChangeText={text => this.onInputChange(text, CONSTANTS.AL2_CHANGED)}
            value={personalInfo.address_line2}
            cancel={() => this.onInputChange('', CONSTANTS.AL2_CHANGED)}
          />
          <InputSection
            textSize={16}
            padding={15}
            onChangeText={text => this.onInputChange(text, CONSTANTS.CITY_CHANGED)}
            value={personalInfo.town_city}
            cancel={() => this.onInputChange('', CONSTANTS.CITY_CHANGED)}
          />
          <InputSection
            textSize={16}
            padding={15}
            placeholder="County/State here (Optional)."
            onChangeText={text => this.onInputChange(text, CONSTANTS.STATE_CHANGED)}
            value={personalInfo.county_state}
            cancel={() => this.onInputChange('', CONSTANTS.STATE_CHANGED)}
          />
          <InputSection
            textSize={16}
            padding={15}
            onChangeText={text => this.onInputChange(text, CONSTANTS.POSTCODE_CHANGED)}
            value={personalInfo.postcode}
            cancel={() => this.onInputChange('', CONSTANTS.POSTCODE_CHANGED)}
          />
          <OptionsPickerSection>
            <CountryPicker
              countryCode={personalInfo.country}
              onValueChange={({ key }) => this.onInputChange(key, CONSTANTS.COUNTRY_CHANGED)}
              unHighlight={personalInfo.country}
            />
          </OptionsPickerSection>
          {loading && this.state.selectedButtonId === 1 ? (
            <Spinner />
          ) : (
            <FooterWithButtons
              rightBtnNavigation={() => {
                this.setState({ selectedButtonId: 1 });
                this.onSubmit();
              }}
              btnTxt={{ rightBtnTxt: 'SAVE' }}
            />
          )}
        </View>
        <View style={styles.fieldsContainer}>
          <Text style={styles.label}>CONTACT DETAILS</Text>
          <InputSection
            textSize={16}
            padding={15}
            numeric
            maxLength={13}
            onChangeText={text => this.onInputChange(text, CONSTANTS.CNUMBER_CHANGED)}
            value={personalInfo.contact_number}
            cancel={() => this.onInputChange('', CONSTANTS.CNUMBER_CHANGED)}
          />
          <InputSection
            textSize={16}
            padding={15}
            placeholder="Mobile number here (Optional)."
            numeric
            maxLength={13}
            onChangeText={text => this.onInputChange(text, CONSTANTS.CNUMBER_CHANGED)}
            value={personalInfo.contact_number}
            cancel={() => this.onInputChange('', CONSTANTS.CNUMBER_CHANGED)}
          />
          <InputSection
            textSize={16}
            padding={15}
            onChangeText={text => this.onInputChange(text, CONSTANTS.EMAIL_CHANGED)}
            value={emailReducer.email}
            cancel={() => this.onInputChange('', CONSTANTS.EMAIL_CHANGED)}
          />
        </View>
        <View style={styles.bottomButtonsContainer}>
          {loading && this.state.selectedButtonId === 2 ? (
            <Spinner />
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigation.navigate(CONSTANTS.DASHBOARD)}
              rightBtnNavigation={() => {
                this.setState({ selectedButtonId: 2 });
                this.onSubmit();
              }}
              btnTxt={{ leftBtnTxt: 'HOME', rightBtnTxt: 'SAVE' }}
              switchButtons
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ emailReducer, personalInfo, submitInfoReducer, fetchedUserProfile }) => {
  return {
    emailReducer,
    personalInfo,
    fetchedUserProfile,
    loading: submitInfoReducer.loading,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(BasicDetails);
