import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';

import { studiedAtCollegeAction } from '../../../../redux/actions';

import { Heading, FooterWithButtons, TextAreaInput, Screen2 } from '../../../../components/common';
import { STAGE_ONE, EDUCATION_NAV, STUDY_BACKGROUND_NAV } from '../../../../constants';

class NoBackground extends Component {
  state = {
    textData: '',
  };

  render() {
    const { navigation } = this.props;

    return (
      <Screen2>
        {/* Screen Content */}
        <View key="header">
          <Heading>BACKGROUND</Heading>
        </View>
        <View key="content">
          <TextAreaInput
            placeholder="Please tell us about your family and
                  educational background, your interests
                   and spare time activities, your future
                  plans and anything else which you
                think will be helpful to your application:"
            multiline
            onChangeText={textData => this.setState({ textData })}
            value={this.state.textData}
            numberOfLines={16}
            maxLength={250}
          />
        </View>

        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigation.navigate(STUDY_BACKGROUND_NAV)}
            rightBtnNavigation={() => navigation.navigate(STAGE_ONE)}
            btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'FINISH' }}
          />
        </View>
        {/* Content end */}
      </Screen2>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    studiedAtCollege: payload => {
      dispatch(studiedAtCollegeAction(payload));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NoBackground);
