/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';

import SimpleToast from 'react-native-simple-toast';
import {
  Heading,
  Input,
  Screen,
  FooterWithButtons,
  BottomButtonLeft,
  DropDown
} from '../../../components/common';
import { inputChanged } from '../../../redux/actions';
import {
  VISA_TYPES_ACTION,
  VISA_INFORMATION_VISA_DENIAL
} from '../../../constants';
import styles from './styles';

const visaInfoInit = {
  visa_type: null,
  sponsor_name: '',
  year_of_participation: ''
};
class VisaTypesAndYear extends Component {
  state = {
    previous_visa_details: [{ ...JSON.parse(JSON.stringify(visaInfoInit)) }],
    years: []
  };

  componentWillMount() {
    const { previous_visa_details } = this.props;
    if (previous_visa_details.length < 1) {
      this.setState({
        previous_visa_details: [{ ...JSON.parse(JSON.stringify(visaInfoInit)) }]
      });
    } else {
      this.setState({ previous_visa_details });
    }

    var currentYear = new Date().getFullYear();
    for (var i = 1980; i <= currentYear; i++) {
      this.state.years.push(i);
    }
  }

  changeState(index, obj, value) {
    const { previous_visa_details } = this.state;
    previous_visa_details[index][obj] = value;
    this.setState({ previous_visa_details });
    this.props.inputChanged(previous_visa_details, VISA_TYPES_ACTION);
  }

  renderYears = () => {
    return this.state.years.map(year => {
      return <Picker.Item label={year.toString()} value={year} />;
    });
  };
  addAnother() {
    const { previous_visa_details } = this.state;
    const { number_of_j1_visas, inputChanged } = this.props;
    if (previous_visa_details.length < parseInt(number_of_j1_visas, 0)) {
      previous_visa_details.push({ ...visaInfoInit });
      this.setState({ previous_visa_details });
      inputChanged(previous_visa_details, VISA_TYPES_ACTION);
      return null;
    }
    return SimpleToast.show(
      `Can not add more than ${number_of_j1_visas} details`
    );
  }

  render() {
    const { previous_visa_details } = this.state;
    const { textStyle } = styles;
    const {
      navigation: { navigate, goBack },
      number_of_j1_visas
    } = this.props;
    // eslint-disable-next-line no-console
    console.log(previous_visa_details);

    return (
      <Screen>
        <View key='content'>
          <Heading>
            list all previous visa typeS, sponsor name & year of participation
          </Heading>
          <View>
            {previous_visa_details.map(
              ({ visa_type, sponsor_name, year_of_participation }, index) => {
                return (
                  <View
                    style={{ paddingBottom: 30 }}
                    key={`visa_information:${index + 1}`}
                  >
                    <Text style={textStyle}>VISA TYPE:</Text>
                    <Input
                      maxLength={1}
                      onChangeText={value =>
                        this.changeState(index, 'visa_type', value)
                      }
                      value={visa_type}
                    />
                    <Text style={textStyle}>SPONSOR NAME:</Text>
                    <Input
                      onChangeText={value =>
                        this.changeState(index, 'sponsor_name', value)
                      }
                      value={sponsor_name}
                    />
                    <Text style={textStyle}>YEAR OF PARTICIPATION</Text>
                    <View style={{ borderWidth: 0.5 }}>
                      <Picker
                        itemStyle={{ justifyContent: 'center' }}
                        mode='dropdown'
                        selectedValue={year_of_participation}
                        style={{
                          height: 40,
                          width: '100%',
                          justifyContent: 'center'
                        }}
                        onValueChange={value =>
                          this.changeState(
                            index,
                            'year_of_participation',
                            value
                          )
                        }
                      >
                        <Picker.Item label='Please select year' value={null} />
                        {this.renderYears()}
                      </Picker>
                    </View>
                  </View>
                );
              }
            )}

            <View style={{ marginBottom: 20 }}>
              <BottomButtonLeft onPress={() => this.addAnother()}>
                ADD ANOTHER
              </BottomButtonLeft>
            </View>
          </View>
        </View>

        <View key='footer'>
          <FooterWithButtons
            leftBtnNavigation={() => goBack(null)}
            rightBtnNavigation={() => {
              if (!isAllDetailFilled(previous_visa_details)) {
                return SimpleToast.show(`Please fill all fields`);
              }
              if (
                previous_visa_details.length < parseInt(number_of_j1_visas, 0)
              ) {
                return SimpleToast.show(
                  `Please Add ${number_of_j1_visas} visa details`
                );
              }
              return navigate(VISA_INFORMATION_VISA_DENIAL);
            }}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}
const isAllDetailFilled = data => {
  let ans = true;
  console.log(data);
  data.forEach(({ visa_type, sponsor_name, year_of_participation }) => {
    if (
      visa_type === null ||
      sponsor_name === '' ||
      year_of_participation === ''
    )
      ans = false;
  });
  return ans;
};

const mapStateToProps = ({
  visaInformationReducer: { previous_visa_details, number_of_j1_visas },
  fetchedUserProfile
}) => {
  console.log(fetchedUserProfile);
  return {
    previous_visa_details,
    number_of_j1_visas
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(VisaTypesAndYear);
