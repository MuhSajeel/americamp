import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
  Card2,
  BottomButtonLeft,
  BottomButtonRight,
  SubHeading,
  TextAreaInput,
} from '../../../components/common';
import { inputChanged } from '../../../redux/actions';

import { BACKGROUND_INFORMATION, DO_YOU_SMOKE, CRIME_DETAIL_CHANGED } from '../../../constants';

class MoreAboutBackground extends Component {
  state = { navigationRoute: DO_YOU_SMOKE };

  onInputChanged(text) {
    this.props.inputChanged(text, CRIME_DETAIL_CHANGED);
  }

  render() {
    const { navigation, CrimeDetails } = this.props;
    const { navigationRoute } = this.state;
    return (
      <Card2>
        {/* Screen Content */}
        <View key="content">
          <SubHeading extraStyling={{ fontSize: 25 }}>
            IF YES, PLEASE TELL US MORE ABOUT THIS
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <TextAreaInput
              additionalTxtStyle={{
                flex: 1,
              }}
              onChangeText={textData => this.onInputChanged(textData)}
              value={CrimeDetails}
              maxLength={1000}
              minLength={250}
              numberOfLines={16}
              placeholder="Crime information"
            />
          </View>
        </View>
        {/* Content end */}

        {/* Bottom buttons or logo */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(BACKGROUND_INFORMATION)}>
            Previous
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <BottomButtonRight
            onPress={CrimeDetails ? () => navigation.navigate(navigationRoute) : null}
          >
            Next
          </BottomButtonRight>
        </View>
        {/* bottom end */}
      </Card2>
    );
  }
}

const mapStateToProps = ({ MedicalHistory }) => {
  return {
    CrimeDetails: MedicalHistory.conviction_details,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(MoreAboutBackground);
