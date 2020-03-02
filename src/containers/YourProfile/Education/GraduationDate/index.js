/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import { graduationDateAction } from '../../../../redux/actions';

import {
  Screen,
  FooterWithButtons,
  Heading,
  DateAndTimePicker,
} from '../../../../components/common';

import { styles } from './styles';
import { DEGREE_TYPE_NAV, ADDITIONAL_INFO_NAV } from '../../../../constants';

class GraduationDate extends Component {
  state = { graduationDate: new Date() };

  componentWillMount() {
    const { expected_graduation_date } = this.props;
    this.setState({ graduationDate: expected_graduation_date || new Date() });
  }

  navigateRight() {
    const {
      navigation: { navigate },
    } = this.props;
    const { graduationDate } = this.state;
    this.props.graduationDate(graduationDate);
    navigate(ADDITIONAL_INFO_NAV);
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const { graduationDate } = this.state;
    const { inputContainer } = styles;
    return (
      <Screen>
        <View key="header">
          <Heading>WHAT&apos;S YOUR (EXPECTED) GRADUATION DATE?</Heading>
        </View>
        <View key="content">
          <View>
            <View style={inputContainer}>
              <DateAndTimePicker
                date={graduationDate}
                mode="date"
                androidMode="default"
                placeholder="Select date"
                format="DD-MM-YYYY"
                onDateChange={selectedDate => {
                  this.setState({ graduationDate: selectedDate });
                }}
              />
            </View>
          </View>
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(DEGREE_TYPE_NAV)}
            rightBtnNavigation={() => this.navigateRight()}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    graduationDate: payload => {
      dispatch(graduationDateAction(payload));
    },
  };
};

const mapStateToProps = ({ educationReducer }) => {
  const { expected_graduation_date } = educationReducer;
  return { expected_graduation_date };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraduationDate);
