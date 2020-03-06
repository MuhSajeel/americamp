/* eslint-disable camelcase,no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
//import Toast from 'react-native-simple-toast';
import { SubHeading, ViewButton } from '../../components/common';
import { VIEW_DOCUMENTS_SCREEN } from '../../constants';

const circle = { grey: 'greyCircle', red: 'redCircle' };

const DocumentSection = ({
  formsStatus,
  contents,
  stage,
  navigate,
  shouldRenderUnderLine,
  isApplied,
  additional_documents,
  enable,
}) => {
  const FormsStatus = { ...formsStatus, additional_documents: additional_documents.length > 0 };
  const idMapping = { crb: 'police_background_check', profile_image: 'photograph_upload' };
  return (
    <View>
      <SubHeading extraStyling={{ fontSize: 30, color: 'grey' }}>{stage}</SubHeading>
      {contents.map(
        (
          {
            name,
            condition: { need, done },
            action: { required, done: completed },
            route = '',
            eg,
            id,
          },
          i
        ) => {
          return (
            <ViewButton
              circleColor={
                FormsStatus[id] && id !== 'additional_documents' ? circle.red : circle.grey
              }
              priority={FormsStatus[id] && id !== 'additional_documents' ? done : need}
              priorityStatus={FormsStatus[id] && id !== 'additional_documents'}
              action={FormsStatus[id] && id !== 'additional_documents' ? completed : required}
              key={`${name} ${i * 2}`}
              onPress={
                enable()
                  ? FormsStatus[id] && id !== 'reference' && id !== 'program_agreement'
                    ? () =>
                        navigate(VIEW_DOCUMENTS_SCREEN, {
                          viewOption: idMapping[id] || id,
                          route,
                        })
                    : () => navigate(isApplied ? route : '')
                  : () => //Toast.show('Please Complete its pevious stage first')
              }
              eg={eg}
            >
              {name}
            </ViewButton>
          );
        }
      )}
      {shouldRenderUnderLine ? (
        <View
          style={{ borderBottomWidth: 1, marginTop: 25, marginBottom: 25, borderColor: 'grey' }}
        />
      ) : (
        <View style={{ marginBottom: 20 }} />
      )}
    </View>
  );
};

const mapStateToProps = ({ formsStatus, Document: { additional_documents } }) => ({
  formsStatus,
  additional_documents,
});

export default connect(
  mapStateToProps,
  {}
)(DocumentSection);
