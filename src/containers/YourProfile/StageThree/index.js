/* eslint-disable no-shadow */
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
import { APPLICATION_STATUS, RETURN_TO_CAMP, VIEW_DOCUMENTS_SCREEN } from '../../../constants';
import { selectAppFlow } from '../../../helpers/AppFlow';
import { selectPaymentNav } from '../../../helpers/PaymentNavDesicion';
import { inputChanged } from '../../../redux/actions';

import getStageTransactions from '../../../helpers/GetStageTransaction';

const StageThree = props => {
  const {
    navigation: { navigate },
    apply_now: { role, application_type },
    stage3Progress,
    Transactions,
    inputChanged,
    formsStatus,
    Document,
  } = props;
  const data = selectAppFlow(role, application_type);
  const idMapping = { crb: 'police_background_check' };
  return (
    <Screen>
      <View key="header">
        <Heading>STAGE THREE</Heading>
        <ProgressSection
          style={Styles.progressSection}
          progress={stage3Progress}
          progressTitle="STAGE THREE PROGRESS"
        />
      </View>
      <View key="content">
        {data[0].stage3.map(({ name, route, id }) => {
          console.log(getStageTransactions(Transactions, 3));
          return (
            <ViewButton
              key={`${name} ${id}`}
              onPress={
                // eslint-disable-next-line no-nested-ternary
                name === 'Payment Stage 3'
                  ? () =>
                      selectPaymentNav(
                        application_type === RETURN_TO_CAMP
                          ? Transactions[1] || null
                          : Transactions[2] || null,
                        application_type === RETURN_TO_CAMP
                          ? Transactions[0] || null
                          : Transactions[1] || null,
                        navigate,
                        inputChanged,
                        application_type === RETURN_TO_CAMP ? 'STAGE_TWO' : 'STAGE_THREE',
                        'Placement Fee',
                        (data, route) => inputChanged(data, route)
                      )
                  : formsStatus[id]
                  ? () =>
                      navigate(VIEW_DOCUMENTS_SCREEN, {
                        urlList: Document[idMapping[id] || id],
                        viewOption: idMapping[id] || id,
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
  stageProgress,
  formsStatus,
  Document,
  stageZeroReducer: { apply_now },
  transactionsReducer: { Transactions },
}) => {
  return {
    stage3Progress: stageProgress.stage3,
    formsStatus,
    Document,
    apply_now,
    Transactions,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(StageThree);
