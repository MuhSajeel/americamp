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
import { BODY_PIERCING, REMOVE_TATTOOS, TATTOOS_DETAIL_CHANGED } from '../../../constants';

class AboutYourTattoos extends Component {
  state = { navigationRoute: REMOVE_TATTOOS };

  onInputChanged(text) {
    this.props.inputChanged(text, TATTOOS_DETAIL_CHANGED);
  }

  render() {
    const { navigation, TattoosDetail } = this.props;
    const { navigationRoute } = this.state;
    return (
      <Card2>
        {/* Screen Content */}
        <View key="content">
          <SubHeading extraStyling={{ fontSize: 25 }}>
            IF YES, PLEASE TELL US MORE ABOUT TATTOOS AND/ OR PIERCINGS
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <TextAreaInput
              additionalTxtStyle={{
                flex: 1,
              }}
              maxLength={1000}
              minLength={250}
              onChangeText={textData => this.onInputChanged(textData)}
              value={TattoosDetail}
              numberOfLines={16}
              placeholder="Tattoos or body piercing information"
            />
          </View>
        </View>
        {/* Content end */}

        {/* Bottom buttons or logo */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(BODY_PIERCING)}>
            Previous
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <BottomButtonRight
            onPress={TattoosDetail ? () => navigation.navigate(navigationRoute) : null}
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
    TattoosDetail: MedicalHistory.tattoos_or_piercing_details,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(AboutYourTattoos);
