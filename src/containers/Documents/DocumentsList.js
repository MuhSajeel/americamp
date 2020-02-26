/* eslint-disable camelcase,no-shadow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Screen, Heading, FooterWithButtons } from '../../components/common';
import { DASHBOARD, INTERVIEW_STATUS, RETURN_TO_CAMP } from '../../constants';
import DocumentSection from './DocumentSection';
import { selectDocumentFlow } from '../../helpers/DocumentFlow';
import { isApplyNowNull } from '../../helpers/isApplyNowNull';

class DocumentsListClass extends Component {
  render() {
    const {
      navigation: { navigate },
      apply_now,
      stageProgress: { stage0, stage1, stage2, stage3 },
      status,
    } = this.props;
    const { role, application_type } = apply_now;
    const data = selectDocumentFlow(role, application_type);
    const len = data.length;
    const isApplied = isApplyNowNull(apply_now);
    return (
      <Screen>
        <View key="header">
          <Heading>YOUR DOCUMENTS</Heading>
        </View>
        <View key="content">
          {data.map(({ stage, contents }, i) => {
            return (
              <DocumentSection
                contents={contents}
                stage={stage}
                enable={() => {
                  switch (stage) {
                    case 'Stage 1':
                      return stage0 === 100;
                    case 'Stage 2':
                      return application_type === RETURN_TO_CAMP
                        ? stage1 === 100
                        : status === INTERVIEW_STATUS.confirmed;
                    case 'Stage 3':
                      return stage2 === 100;
                    case 'Stage 4':
                      return stage3 === 100;
                    default:
                      return false;
                  }
                }}
                key={`${stage} ${i * 2}`}
                shouldRenderUnderLine={!(len - 1 === i)}
                navigate={navigate}
                isApplied={isApplied}
              />
            );
          })}
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={() => navigate(DASHBOARD)}
            rightBtnNavigation={() => navigate(null)}
            btnTxt={{ leftBtnTxt: 'HOME', rightBtnTxt: '' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({
  stageZeroReducer: { apply_now },
  stageProgress,
  userCurrentStageReducer: { position },
  interview: { status },
}) => ({
  apply_now,
  position,
  stageProgress,
  status,
});

const DocumentsList = connect(mapStateToProps)(DocumentsListClass);

export { DocumentsList };
