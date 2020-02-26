import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { studiedAtCollegeAction } from '../../../../redux/actions';

import { Screen, Heading, FooterWithLogo, MainButtons } from '../../../../components/common';
import { styles } from './styles';
import { STAGE_ONE, EDUCATION_STATUS, STATIC_TEXT, YES_BACKGROUND } from '../../../../constants';

class StudyBackground extends Component {
  rightBtnClick = () => {
    const {
      navigation: { navigate },
      role,
    } = this.props;
    if (role === 'camp_counselor') {
      this.props.studiedAtCollegeAction(false);
      navigate(YES_BACKGROUND);
    } else {
      navigate(STATIC_TEXT);
    }
  };

  leftBtnClick = () => {
    const {
      navigation: { navigate },
    } = this.props;
    this.props.studiedAtCollegeAction(true);
    navigate(EDUCATION_STATUS);
  };

  render() {
    const {
      navigation: { navigate },
      role,
    } = this.props;
    const { textContainer, bodyText } = styles;
    return (
      <Screen>
        <View key="header">
          <Heading>ARE YOU CURRENTLY A FULL-TIME STUDENT?</Heading>
        </View>
        <View key="content">
          <View>
            <MainButtons
              leftBtnClick={() => this.rightBtnClick()}
              rightBtnClick={() => this.leftBtnClick()}
              btnTxt={{
                leftBtnTxt: 'NO',
                rightBtnTxt: 'YES',
              }}
            />

            <View style={textContainer}>
              {role === 'camp_counselor' ? (
                <View>
                  <Text>
                    To be a camp counselor you don&apos;t have to be a current or previous student.
                    95% of all applicants choose to be a camp counselor.
                  </Text>
                  <Text style={bodyText}>
                    If you&apos;re a current student you can also apply as support staff.
                  </Text>
                </View>
              ) : (
                <Text>
                  In order to apply as Support Staff you need to be in full time education from
                  September onwards.
                </Text>
              )}

              {/* Will implement later */}
              {/* <Text>
                In order to apply as Support Staff you need to be in full time education from
                September onwards.
              </Text> */}
            </View>
          </View>
        </View>
        <View key="footer">
          <FooterWithLogo
            noLogo
            navigate={() => navigate(STAGE_ONE)}
            btnTxt={{ leftBtnTxt: 'BACK' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  stageZeroReducer: {
    apply_now: { role },
  },
}) => {
  return { role };
};

export default connect(
  mapStateToProps,

  { studiedAtCollegeAction }
)(StudyBackground);
