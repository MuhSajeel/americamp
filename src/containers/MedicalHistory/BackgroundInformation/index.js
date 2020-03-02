import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
  Card,
  BottomButtonLeft,
  BottomButtonRight,
  Heading,
  PickerOptions,
  SubHeading,
} from '../../../components/common';
import { inputChanged } from '../../../redux/actions';

import {
  HEALTH_OVERVIEW,
  MORE_ABOUT_BACKGROUND,
  DO_YOU_SMOKE,
  CONVICTED_OF_CRIME_CHANGED,
} from '../../../constants';

class BackgroundInformation extends Component {
  state = { navigationRoute: DO_YOU_SMOKE };

  componentDidMount() {
    const { ConvictedOfCrime } = this.props;

    if (ConvictedOfCrime) {
      this.setState({ navigationRoute: MORE_ABOUT_BACKGROUND });
    }
  }

  onInputChanged(text) {
    this.props.inputChanged(text, CONVICTED_OF_CRIME_CHANGED);
  }

  render() {
    const { navigation, ConvictedOfCrime } = this.props;
    const { navigationRoute } = this.state;
    return (
      <Card>
        {/* Screen Content */}
        <View key="content">
          <Heading>BACKGROUND INFORMATION?</Heading>
          <SubHeading extraStyling={{ fontSize: 25 }}>
            HAVE YOU EVER BEEN CONVICTED, OR ACCUSED OF ANY CRIME INCLUDING CHILD ABUSE OR SEXUAL
            ABUSE?
          </SubHeading>
          <View style={{ marginTop: 10 }}>
            <PickerOptions
              label="YES"
              onPress={() => {
                this.onInputChanged(true);
                this.setState({
                  navigationRoute: MORE_ABOUT_BACKGROUND,
                });
              }}
              highlight={ConvictedOfCrime === true}
            />
            <PickerOptions
              label="NO"
              onPress={() => {
                this.onInputChanged(false);
                this.setState({ navigationRoute: DO_YOU_SMOKE });
              }}
              highlight={!ConvictedOfCrime}
            />
          </View>
        </View>
        {/* Content end */}

        {/* Bottom buttons  */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(HEALTH_OVERVIEW)}>
            Previous
          </BottomButtonLeft>
        </View>
        <View key="bottomRight">
          <BottomButtonRight
            onPress={() => {
              if (ConvictedOfCrime === null) {
                this.onInputChanged(false);
                return navigation.navigate(DO_YOU_SMOKE);
              }

              return navigation.navigate(navigationRoute);
            }}
          >
            Next
          </BottomButtonRight>
        </View>
        {/* bottom end */}
      </Card>
    );
  }
}

const mapStateToProps = ({ MedicalHistory }) => {
  return {
    ConvictedOfCrime: MedicalHistory.convicted_of_crime,
  };
};
export default connect(
  mapStateToProps,
  { inputChanged }
)(BackgroundInformation);
