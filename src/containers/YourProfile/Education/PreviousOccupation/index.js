/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { previousOccupationAction, infoSubmited } from '../../../../redux/actions';

import {
  Card,
  Input,
  Heading,
  BottomButtonLeft,
  BottomButtonRight,
  Spinner,
} from '../../../../components/common';

import { styles } from './styles';
import { CURRENT_OCCUPATION_NAV } from '../../../../constants';

class PreviousOccupation extends Component {
  state = { previousOccupation: '' };

  componentWillMount() {
    const { previous_occupation } = this.props;
    this.setState({ previousOccupation: previous_occupation });
  }

  navigateRight() {
    const { previousOccupation } = this.state;
    this.props.previousOccupation(previousOccupation);
    const { education: educational_background } = this.props;
    educational_background.previous_occupation = previousOccupation;
    this.infoSubmit(educational_background);
  }

  infoSubmit(educational_background) {
    const data = this.props.fetchedUserProfile;
    data.educational_background = educational_background;
    this.props.infoSubmited(data);
  }

  render() {
    const {
      navigation: { navigate },
      loading,
    } = this.props;
    const { previousOccupation } = this.state;
    const { inputContainer } = styles;
    return (
      <Card>
        <View key="content">
          <Heading>WHAT IS YOUR PREVIOUS OCCUPATION?</Heading>
          <View>
            <View style={inputContainer}>
              <Input
                autoFocus={Platform.OS === 'android'}
                onChangeText={occupation => this.setState({ previousOccupation: occupation })}
                value={previousOccupation}
              />
            </View>
          </View>
        </View>
        <View key="bottomLeft">
          <BottomButtonLeft onPress={!loading ? () => navigate(CURRENT_OCCUPATION_NAV) : null}>
            PREVIOUS
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          {loading ? (
            <Spinner />
          ) : (
              <BottomButtonRight onPress={() => this.navigateRight()}>FINISH</BottomButtonRight>
            )}
        </View>
      </Card>
    );
  }
}

const mapStateToProps = ({ educationReducer, submitInfoReducer, fetchedUserProfile }) => {
  const { previous_occupation } = educationReducer;
  const { loading } = submitInfoReducer;
  return {
    education: educationReducer,
    previous_occupation,
    loading: loading || false,
    fetchedUserProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    previousOccupation: payload => {
      dispatch(previousOccupationAction(payload));
    },
    infoSubmited: payload => dispatch(infoSubmited(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviousOccupation);
