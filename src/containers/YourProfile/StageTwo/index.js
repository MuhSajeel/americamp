/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import {
  Screen,
  Heading,
  FooterWithButtons,
  ViewButton,
  ProgressSection
} from '../../../components/common';
import {
  DASHBOARD,
  VIEW_DOCUMENTS_SCREEN,
  REFERENCES_VIEW_ROUTE
} from '../../../constants';
import { selectAppFlow } from '../../../helpers/AppFlow';
import { selectPaymentNav } from '../../../helpers/PaymentNavDesicion';
import { inputChanged } from '../../../redux/actions';

class StageTwo extends Component {
  // eslint-disable-next-line react/no-unused-state
  state = { default: null };

  render() {
    const {
      navigation: { navigate },
      apply_now: { role, application_type },
      inputChanged,
      stage2Progress,
      Transactions,
      formsStatus,
      Document
    } = this.props;
    const data = selectAppFlow(role, application_type);
    return (
      <Screen>
        <View key='header'>
          <Heading>YOUR PROFILE</Heading>
          <ProgressSection
            style={styles.progressSection}
            progress={stage2Progress}
            progressTitle='STAGE TWO PROGRESS'
          />
        </View>
        <View key='content'>
          {data[0].stage2.map(({ name, route, id }) => {
            return (
              <ViewButton
                key={`${name} ${id}`}
                onPress={
                  // eslint-disable-next-line no-nested-ternary
                  name === 'Payment Stage 2'
                    ? () =>
                        selectPaymentNav(
                          Transactions[1] || null,
                          Transactions[0] || null,
                          navigate,
                          inputChanged,
                          'STAGE_TWO',
                          'Acceptance Fee',
                          (data, route) => inputChanged(data, route)
                        )
                    : (name === 'Upload Video' ||
                        name === 'Proof Of Student Status' ||
                        name === 'Returner Camp Invite' ||
                        name === 'Camp Contract') &&
                      formsStatus[id]
                    ? () =>
                        navigate(VIEW_DOCUMENTS_SCREEN, {
                          urlList: Document[id],
                          viewOption: id,
                          route
                        })
                    : name === 'References' && formsStatus[id]
                    ? () => navigate(REFERENCES_VIEW_ROUTE)
                    : () => navigate(route)
                }
                done={formsStatus[id]}
              >
                {name}
              </ViewButton>
            );
          })}
        </View>
        <View key='footer'>
          <FooterWithButtons
            leftBtnNavigation={() => {
              navigate(DASHBOARD);
            }}
            btnTxt={{ leftBtnTxt: 'HOME' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  stageProgress,
  formsStatus,
  Document,
  stageZeroReducer: { apply_now },
  transactionsReducer: { Transactions }
}) => {
  return {
    stage2Progress: stageProgress.stage2,
    formsStatus,
    Document,
    apply_now,
    Transactions
  };
};

export default connect(
  mapStateToProps,
  { inputChanged }
)(StageTwo);
