import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  CountryPicker,
  RadioButton,
  Spinner
} from '../../../components/common';
import { inputChanged, infoSubmited } from '../../../redux/actions';
import { Input } from '../../../components/common/Input';
import * as CONSTANTS from '../../../constants';
import styles from './styles';

class MailingAddress extends Component {
  state = { same: false };

  componentDidMount() {
    const {
      // eslint-disable-next-line camelcase
      addresses: { mailing_address, current_address }
    } = this.props;
    this.isSameAddress(current_address, mailing_address);
  }

  onInputChange(text, type, field = '', field2) {
    // this.isAddressSame(field, field2, text);
    this.props.inputChanged(text, type);
  }

  onRadioClick(same) {
    // eslint-disable-next-line no-shadow
    const { inputChanged } = this.props;
    if (same) {
      this.setState({ same });
      inputChanged(same, CONSTANTS.MA_CHANGED);
    } else {
      this.setState({ same });
      inputChanged(same, CONSTANTS.MA_REMOVED);
    }
  }

  onSubmit() {
    const { fetchedUserProfile, personalInfo, addresses } = this.props;
    const data = fetchedUserProfile;
    data.personal_info = personalInfo;
    data.addresses = addresses;
    // setItem('@userProfile', JSON.stringify(data));
    return this.props.infoSubmited(data);
  }

  // isAddressSame(field, field2, value) {
  //   const { addresses } = this.props;
  //   if (value !== addresses[field2].address[field] && field !== '') {
  //     this.setState({ same: false });
  //   } else if (value === addresses[field2].address[field] && field !== '') {
  //     this.setState({ same: true });
  //   }
  // }

  isSameAddress(addr1, addr2) {
    const res = { ans: true };
    const fields = ['address_line1', 'city', 'country', 'postcode', 'state'];
    console.log('add1', addr1);
    console.log('add2', addr2);
    fields.forEach(val => {
      if (
        addr1.address[val] !== addr2.address[val] ||
        addr1.address[val] === null ||
        addr1.address[val] === ''
      )
        res.ans = false;
    });
    console.log('RES2', res.ans);
    if (res.ans) {
      this.setState({ same: true });
    }
  }

  render() {
    const RadioOptions = [{ label: 'Same as current address', value: 0 }];
    const { navigation, addresses, loading } = this.props;
    return (
      <Screen>
        {/* Screen Content */}
        <View key='content'>
          <Heading>ADDRESS</Heading>
          <SubHeading extraStyling={{ fontSize: 20 }}>
            CURRENT ADDRESS
          </SubHeading>

          <View style={styles.input}>
            <Input
              placeholder='Address line 1'
              onChangeText={text =>
                this.onInputChange(
                  text,
                  CONSTANTS.CA_AL1_CHANGED,
                  'address_line1',
                  'mailing_address'
                )
              }
              value={addresses.current_address.address.address_line1}
              importantForAutofill='off'
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder='Address line 2 (Optional)'
              onChangeText={text =>
                this.onInputChange(
                  text,
                  CONSTANTS.CA_AL2_CHANGED,
                  'address_line2',
                  'mailing_address'
                )
              }
              value={addresses.current_address.address.address_line2}
              importantForAutofill='off'
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder='Town'
              onChangeText={text =>
                this.onInputChange(
                  text,
                  CONSTANTS.CA_CITY_CHANGED,
                  'city',
                  'mailing_address'
                )
              }
              value={addresses.current_address.address.city}
              importantForAutofill='off'
            />
          </View>
          {/* <View style={styles.input}>
            <Input
              placeholder="City here"
              onChangeText={text => this.onInputChange(text, CONSTANTS.CA_CITY_CHANGED)}
              value={addresses.current_address.address.city}
            />
          </View> */}
          <View style={styles.input}>
            <Input
              placeholder='State/Province'
              onChangeText={text =>
                this.onInputChange(
                  text,
                  CONSTANTS.CA_STATE_CHANGED,
                  'state',
                  'mailing_address'
                )
              }
              value={addresses.current_address.address.state}
              importantForAutofill='off'
            />
          </View>
          <View style={styles.input}>
            <Input
              placeholder='Postal code'
              onChangeText={text =>
                this.onInputChange(
                  text,
                  CONSTANTS.CA_POSTCODE_CHANGED,
                  'postcode',
                  'mailing_address'
                )
              }
              value={addresses.current_address.address.postcode}
              importantForAutofill='off'
            />
          </View>
          <View style={{ paddingTop: 30, paddingBottom: 20 }}>
            <CountryPicker
              countryCode={addresses.current_address.address.country}
              placeholder={addresses.current_address.address.country || null}
              onValueChange={({ key }) =>
                this.onInputChange(
                  key,
                  CONSTANTS.CA_COUNTRY_CHANGED,
                  'country',
                  'mailing_address'
                )
              }
              unHighlight={!addresses.current_address.address.country}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <SubHeading
              extraStyling={{
                fontSize: 20
              }}
            >
              MAILING ADDRESS
            </SubHeading>
            <View style={{ paddingLeft: 10 }}>
              <RadioButton
                Default
                options={RadioOptions}
                checked={this.state.same}
                formHorizontal
                onPress={() => this.onRadioClick(!this.state.same)}
              />
            </View>
          </View>

          {!this.state.same ? (
            <View>
              <View style={styles.input}>
                <Input
                  placeholder='Address line 1'
                  onChangeText={text =>
                    this.onInputChange(
                      text,
                      CONSTANTS.MA_AL1_CHANGED,
                      'address_line1',
                      'current_address'
                    )
                  }
                  value={addresses.mailing_address.address.address_line1}
                  importantForAutofill='off'
                />
              </View>
              <View style={styles.input}>
                <Input
                  placeholder='Address line 2 (Optional)'
                  onChangeText={text =>
                    this.onInputChange(
                      text,
                      CONSTANTS.MA_AL2_CHANGED,
                      'address_line2',
                      'current_address'
                    )
                  }
                  value={addresses.mailing_address.address.address_line2}
                  importantForAutofill='off'
                />
              </View>
              <View style={styles.input}>
                <Input
                  importantForAutofill='off'
                  placeholder='Town'
                  onChangeText={text =>
                    this.onInputChange(
                      text,
                      CONSTANTS.MA_CITY_CHANGED,
                      'city',
                      'current_address'
                    )
                  }
                  value={addresses.mailing_address.address.city}
                />
              </View>
              <View style={styles.input}>
                <Input
                  placeholder='State/Province '
                  onChangeText={text =>
                    this.onInputChange(
                      text,
                      CONSTANTS.MA_STATE_CHANGED,
                      'state',
                      'current_address'
                    )
                  }
                  value={addresses.mailing_address.address.state}
                  importantForAutofill='off'
                />
              </View>
              <View style={styles.input}>
                <Input
                  placeholder='Postal code'
                  onChangeText={text =>
                    this.onInputChange(
                      text,
                      CONSTANTS.MA_POSTCODE_CHANGED,
                      'postcode',
                      'current_address'
                    )
                  }
                  value={addresses.mailing_address.address.postcode}
                  importantForAutofill='off'
                />
              </View>
              <View style={{ paddingTop: 30, paddingBottom: 20 }}>
                <CountryPicker
                  countryCode={addresses.mailing_address.address.country}
                  placeholder={
                    addresses.mailing_address.address.country || null
                  }
                  onValueChange={({ key }) =>
                    this.onInputChange(
                      key,
                      CONSTANTS.MA_COUNTRY_CHANGED,
                      'country',
                      'current_address'
                    )
                  }
                  unHighlight={!addresses.mailing_address.address.country}
                />
              </View>
            </View>
          ) : null}
        </View>
        <View key='footer'>
          {loading ? (
            <View style={styles.spinnerContainer}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() =>
                navigation.navigate(CONSTANTS.DRIVER_LICENSE)
              }
              rightBtnNavigation={
                addresses.current_address.address.address_line1 &&
                // addresses.current_address.address.town &&
                addresses.current_address.address.city &&
                addresses.current_address.address.postcode &&
                addresses.current_address.address.state &&
                addresses.current_address.address.country &&
                addresses.mailing_address.address.address_line1 &&
                // addresses.mailing_address.address.town &&
                addresses.mailing_address.address.state &&
                addresses.mailing_address.address.city &&
                addresses.mailing_address.address.postcode &&
                addresses.mailing_address.address.country
                  ? () => this.onSubmit()
                  : () => Alert.alert('Please enter details')
              }
              btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
            />
          )}
        </View>
        {/* Content end */}
      </Screen>
    );
  }
}

const mapStateToProps = ({
  addresses,
  personalInfo,
  submitInfoReducer,
  fetchedUserProfile
}) => {
  return {
    loading: submitInfoReducer.loading,
    addresses,
    personalInfo,
    fetchedUserProfile
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(MailingAddress);
