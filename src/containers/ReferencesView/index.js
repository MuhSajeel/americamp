import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Screen, Heading, FooterWithButtons } from '../../components/common';
import { REFERENCE_NAME } from '../../constants';
import { ReferenceItem } from './ReferenceItem';
import { ReferenceContent } from '../Refrennces/ReferenceText/ReferenceContent';

const ReferencesViewComponent = ({
  referenceReducer: { references },
  navigation: { navigate, goBack },
}) => {
  console.log(references);
  return (
    <Screen>
      <View key="header">
        <Heading>{references[0].id ? 'YOUR REFERENCES' : 'NO REFERENCES'}</Heading>
      </View>
      <View key="content">
        {references[0].id ? (
          references.map(({ name, email, status }, i) => {
            return (
              <ReferenceItem name={name} email={email} status={status} key={`${name} ${i * 2}`} />
            );
          })
        ) : (
            <ReferenceContent />
          )}
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => goBack(null)}
          rightBtnNavigation={() => navigate(REFERENCE_NAME)}
          btnTxt={{ leftBtnTxt: 'CLOSE', rightBtnTxt: 'EDIT' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ referenceReducer }) => ({ referenceReducer });

const ReferencesView = connect(mapStateToProps)(ReferencesViewComponent);

export { ReferencesView };
