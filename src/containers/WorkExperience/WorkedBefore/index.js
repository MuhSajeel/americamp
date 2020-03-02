/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  Card,
  Heading,
  BottomButtonLeft,
  BottomButtonRight,
  PickerOptions,
} from '../../../components/common';
import {
  WORK_EXPERIENCE_BOARDING,
  PREVIOUS_WORK_EXPERIENCE,
  CHILDREN_EXPERIENCE,
} from '../../../constants';
import { workedBefore } from '../../../redux/actions';

class WorkedBefore extends Component {
  state = { navigationRoute: CHILDREN_EXPERIENCE };

  componentDidMount() {
    const { ever_worked_in_camp } = this.props;
    if (ever_worked_in_camp) {
      this.setState({ navigationRoute: PREVIOUS_WORK_EXPERIENCE });
    }
  }

  render() {
    const { navigation, workedBefore, ever_worked_in_camp } = this.props;
    const { navigationRoute } = this.state;

    return (
      <Card>
        {/* Header */}
        <View key="content">
          <Heading>HAVE YOU WORKED AT A CAMP IN THE USA BEFORE?</Heading>
          <PickerOptions
            label="NO"
            onPress={() => {
              workedBefore(false);
              this.setState({
                navigationRoute: CHILDREN_EXPERIENCE,
              });
            }}
            highlight={!ever_worked_in_camp}
          />
          <PickerOptions
            label="YES"
            onPress={() => {
              workedBefore(true);
              this.setState({
                navigationRoute: PREVIOUS_WORK_EXPERIENCE,
              });
            }}
            highlight={ever_worked_in_camp === true}
          />
        </View>
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(WORK_EXPERIENCE_BOARDING)}>
            PREVIOUS
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <BottomButtonRight onPress={() => navigation.navigate(navigationRoute)}>
            PROCEED
          </BottomButtonRight>
        </View>
      </Card>
    );
  }
}

const mapStateToProps = ({ workExperienceReducer }) => {
  const { ever_worked_in_camp } = workExperienceReducer;
  return {
    ever_worked_in_camp: ever_worked_in_camp || false,
  };
};

export default connect(
  mapStateToProps,
  { workedBefore }
)(WorkedBefore);
