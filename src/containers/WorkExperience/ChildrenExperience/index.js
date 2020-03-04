/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import { workWithChildren } from '../../../redux/actions';

import { TextAreaInput, Heading, FooterWithButtons, Screen2 } from '../../../components/common';
import {
  EMPLOYMENT_AND_VOLUNTEER_HISTORY,
  WORKED_BEFORE,
  PREVIOUS_WORK_EXPERIENCE,
} from '../../../constants';

import text from './text.json';

import styles from './styles';

class ChildrenExperience extends Component {
  state = {
    backNavigationRoute: WORKED_BEFORE,
  };

  componentDidMount() {
    const { ever_worked_in_camp } = this.props;
    if (ever_worked_in_camp) {
      this.setState({ backNavigationRoute: PREVIOUS_WORK_EXPERIENCE });
    }
  }

  render() {
    const { navigation, workWithChildren, exp_with_childern } = this.props;

    const { backNavigationRoute } = this.state;
    const { para } = text[0];

    const { navigate } = navigation;
    const { textPara } = styles;
    return (
      <Screen2>
        <View key="header" />
        <View key="content">
          <Heading>EXPERIENCE WITH CHILDREN</Heading>
          <Text style={textPara}>{para}</Text>
          <TextAreaInput
            additionalTxtStyle={{
              flex: 1,
            }}
            placeholder="Minimum 250 Characters"
            onChangeText={textData => workWithChildren(textData)}
            value={exp_with_childern}
            minLength={250}
            maxLength={1000}
            numberOfLines={11}
          />
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(backNavigationRoute)}
            rightBtnNavigation={
              exp_with_childern
                ? () => {
                    if (exp_with_childern.length < 250) {
                      return Simple//Toast.show('Must enter at least 250 characters');
                    }
                    return navigate(EMPLOYMENT_AND_VOLUNTEER_HISTORY);
                  }
                : null
            }
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'PROCEED' }}
          />
        </View>
      </Screen2>
    );
  }
}
const mapStateToProps = ({ workExperienceReducer }) => {
  const { exp_with_childern } = workExperienceReducer;
  return { exp_with_childern };
};

export default connect(
  mapStateToProps,
  { workWithChildren }
)(ChildrenExperience);
