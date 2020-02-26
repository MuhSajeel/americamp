import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Card, BottomButtonLeft, Logo } from '../../../components/common';
import { StarterScreen } from '../../../components/SkillsTalentsCertificates';
import { DASHBOARD, COUNSELOR_APPLICATION } from '../../../constants';

class Starter extends Component {
  state = { navigationRoute: COUNSELOR_APPLICATION };

  // componentDidMount() {
  //   this.willFocusSubscription = this.props.navigation.addListener('willFocus', async () => {
  //     const { skills, roles } = this.props;
  //     if (skills && skills.length) {
  //       if (skills.length === 3) this.setState({ navigationRoute: CHOOSEN_SKILLS });
  //       else this.setState({ navigationRoute: COUNSELOR_APPLICATION });
  //     } else if (roles && roles.length)
  //       this.setState({ navigationRoute: SUPPORT_STAFF_ROLE_PREFERENCES });
  //     else this.setState({ navigationRoute: SUPPORT_STAFF });
  //   });
  // }

  render() {
    const { navigation } = this.props;
    const { navigationRoute } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Card>
          {/*  Screen content */}
          <View key="content">
            <StarterScreen navigate={() => navigation.navigate(navigationRoute)} />
          </View>
          {/* content end */}

          {/* Bottom buttons or logo */}
          <View key="bottomLeft">
            <BottomButtonLeft onPress={() => navigation.navigate(DASHBOARD)}>HOME</BottomButtonLeft>
          </View>
          <View key="bottomRight">
            <Logo />
          </View>
          {/* bottom end */}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({
  stageZeroReducer: {
    apply_now: { role },
  },
}) => {
  return {
    role,
  };
};

export default connect(
  mapStateToProps,
  {}
)(Starter);
