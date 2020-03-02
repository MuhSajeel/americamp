/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { referenceThreeNumber, infoSubmited } from '../../../redux/actions';
import {
  Heading,
  Input,
  SubHeading,
  Spinner,
  Card,
  BottomButtonLeft,
  BottomButtonRight,
} from '../../../components/common';
import { REFERENCE_THREE_EMAIL, APP_COLOR } from '../../../constants';

const ReferenceName = ({
  navigation,
  referenceThreeNumber,
  contact_number,
  references,
  infoSubmited,
  loading,
  fetchedUserProfile,
}) => {
  const { navigate } = navigation;
  return (
    <Card>
      <View key="content">
        <Heading>
          REFERENCE <Text style={{ color: APP_COLOR }}>THREE</Text>
        </Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>CONTACT NUMBER</SubHeading>
        <View style={{ paddingTop: 30 }}>
          <Input
            autoFocus
            numeric
            maxLength={13}
            placeholder="CONTACT NUMBER"
            onChangeText={number => referenceThreeNumber(number)}
            value={contact_number}
          />
        </View>
      </View>
      <View key="bottomLeft">
        <BottomButtonLeft onPress={!loading ? () => navigate(REFERENCE_THREE_EMAIL) : null}>
          PREVIOUS
        </BottomButtonLeft>
      </View>
      <View key="bottomRight">
        {loading ? (
          <Spinner />
        ) : (
          <BottomButtonRight
            onPress={
              contact_number
                ? () => {
                    const data = fetchedUserProfile;
                    data.references = references;
                    infoSubmited(data);
                  }
                : null
            }
          >
            FINISH
          </BottomButtonRight>
        )}
      </View>
    </Card>
  );
};

const mapStateToProps = ({ referenceReducer, submitInfoReducer, fetchedUserProfile }) => {
  const { references } = referenceReducer;
  const { loading } = submitInfoReducer;
  const { contact_number } = references[2];
  return {
    contact_number,
    references,
    loading: loading || false,
    fetchedUserProfile,
  };
};

export default connect(
  mapStateToProps,
  { referenceThreeNumber, infoSubmited }
)(ReferenceName);
