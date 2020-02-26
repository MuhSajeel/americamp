/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
  Screen,
  Heading,
  ProgressSection,
  FooterWithButtons,
  ViewButton,
} from '../../../components/common';
import Styles from './styles';
import { APPLICATION_STATUS, VIEW_DOCUMENTS_SCREEN } from '../../../constants';
import { selectAppFlow } from '../../../helpers/AppFlow';

const StageFour = props => {
  const {
    navigation: { navigate },
    formsStatus,
    apply_now: { role, application_type },
    stage4Progress,
    Document,
  } = props;
  const data = selectAppFlow(role, application_type);
  return (
    <Screen>
      <View key="header">
        <Heading>STAGE FOUR</Heading>
        <ProgressSection
          style={Styles.progressSection}
          progress={stage4Progress}
          progressTitle="STAGE FOUR PROGRESS"
        />
      </View>
      <View key="content">
        {data[0].stage4.map(({ name, route, id }) => {
          return (
            <ViewButton
              key={`${name} ${id}`}
              onPress={
                name === 'Camp Contract' && formsStatus[id]
                  ? () =>
                      navigate(VIEW_DOCUMENTS_SCREEN, {
                        urlList: Document[id],
                        viewOption: id,
                        route,
                      })
                  : () => navigate(route)
              }
              done={formsStatus[id]}
            >
              {name}
            </ViewButton>
          );
        })}
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => {
            props.navigation.navigate(APPLICATION_STATUS);
          }}
          btnTxt={{ leftBtnTxt: 'Home' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({
  formsStatus,
  stageProgress,
  Document,
  stageZeroReducer: { apply_now },
}) => {
  return {
    stage4Progress: stageProgress.stage4,
    formsStatus,
    Document,
    apply_now,
  };
};

export default connect(
  mapStateToProps,
  {}
)(StageFour);
