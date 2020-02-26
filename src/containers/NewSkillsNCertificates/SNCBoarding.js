/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Card, BottomButtonLeft } from '../../components/common';
import { StarterScreen } from '../../components/SkillsTalentsCertificates';
import {
  DASHBOARD,
  RNC_SKILLS_DETAIL_ROUTE,
  CAMP_COUNSELOR_ROLE,
  SUPPORT_STAFF_ROLE_PREFERENCES,
  SUPPORT_STAFF_ROLE,
} from '../../constants';

const SNCBoarding = ({ navigation, role, roles }) => {
  return (
    <View style={{ flex: 1 }}>
      <Card>
        {/*  Screen content */}
        <View key="content">
          <StarterScreen
            navigate={() =>
              navigation.navigate(
                // eslint-disable-next-line no-nested-ternary
                role === CAMP_COUNSELOR_ROLE
                  ? RNC_SKILLS_DETAIL_ROUTE
                  : roles && roles.length
                  ? SUPPORT_STAFF_ROLE_PREFERENCES
                  : SUPPORT_STAFF_ROLE
              )
            }
          />
        </View>
        {/* content end */}

        {/* Bottom buttons or logo */}
        <View key="bottomLeft">
          <BottomButtonLeft onPress={() => navigation.navigate(DASHBOARD)}>HOME</BottomButtonLeft>
        </View>
        {/* <View key="bottomRight">
          <Logo />
        </View> */}
        {/* bottom end */}
      </Card>
    </View>
  );
};

const mapStateToProps = ({
  stageZeroReducer: {
    apply_now: { role },
  },
  jobPreferences: { camp_roles },
}) => ({ role, roles: camp_roles });

export default connect(
  mapStateToProps,
  {}
)(SNCBoarding);
