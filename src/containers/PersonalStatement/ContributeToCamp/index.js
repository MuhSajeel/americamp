/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../../redux/actions';

import {
  Screen,
  Heading,
  FooterWithButtons,
  TextAreaInput,
  Spinner,
} from '../../../components/common';
import { PERSONAL_BACKGROUND, CONTRIBUTE_TO_CAMP_CHANGED } from '../../../constants';
import styles from './styles';

class ContributeToCamp extends Component {
  infoSubmit() {
    const data = this.props.fetchedUserProfile;
    data.personal_statement = this.props.PersonalStatement;
    this.props.infoSubmited(data);
  }

  render() {
    const { navigation, contribute_to_camp, loading } = this.props;

    return (
      <Screen>
        {/* Screen Content */}
        <View key="header">
          <Heading extraStyling={{ fontSize: 40 }}>
            WHAT DO YOU THINK YOU CAN CONTRIBUTE TO CAMP?
          </Heading>
        </View>
        <View key="content">
          <TextAreaInput
            multiline
            onChangeText={textData => this.props.inputChanged(textData, CONTRIBUTE_TO_CAMP_CHANGED)}
            value={contribute_to_camp}
            numberOfLines={16}
            maxLength={1000}
            minLength={250}
          />
        </View>

        <View key="footer">
          {loading ? (
            <View style={{ alignItems: 'flex-end' }}>
              <Spinner />
            </View>
          ) : (
            <FooterWithButtons
              leftBtnNavigation={() => navigation.navigate(PERSONAL_BACKGROUND)}
              rightBtnNavigation={contribute_to_camp ? () => this.infoSubmit() : null}
              btnTxt={{ rightBtnTxt: 'FINISH', leftBtnTxt: 'PREVIOUS' }}
            />
          )}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  PersonalStatement,
  PersonalStatement: { contribute_to_camp },
  submitInfoReducer,
  fetchedUserProfile,
}) => {
  return {
    PersonalStatement,
    contribute_to_camp,
    submitInfoReducer,
    loading: submitInfoReducer.loading,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(ContributeToCamp);
