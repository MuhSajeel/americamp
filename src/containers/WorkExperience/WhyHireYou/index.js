/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  Card,
  Heading,
  TextAreaInput,
  Spinner,
  BottomButtonRight,
  BottomButtonLeft,
} from '../../../components/common';
import { POSITIVE_IMPACT_AT_CAMP } from '../../../constants';
import { whyHireYou, infoSubmited } from '../../../redux/actions';

const WhyHireYou = ({
  navigation,
  whyHireYou,
  why_hire_you,
  loading,
  workExperienceReducer,
  infoSubmited,
  fetchedUserProfile,
}) => {
  const { navigate } = navigation;
  return (
    <Card>
      <View key="content">
        <Heading>WHY SHOULD WE HIRE YOU?</Heading>
        <TextAreaInput
          additionalTxtStyle={{
            flex: 1,
          }}
          placeholder={`Why should a camp director hire you to work at their camp?\n250 min character count`}
          onChangeText={textData => whyHireYou(textData)}
          value={why_hire_you}
          maxLength={250}
          numberOfLines={11}
        />
      </View>
      <View key="bottomLeft">
        <BottomButtonLeft onPress={!loading ? () => navigate(POSITIVE_IMPACT_AT_CAMP) : null}>
          PREVIOUS
        </BottomButtonLeft>
      </View>
      <View key="bottomRight">
        {loading ? (
          <Spinner />
        ) : (
          <BottomButtonRight
            onPress={
              why_hire_you
                ? () => {
                    const data = fetchedUserProfile;
                    data.work_experience = workExperienceReducer;
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

const mapStateToProps = ({ workExperienceReducer, submitInfoReducer, fetchedUserProfile }) => {
  const { why_hire_you } = workExperienceReducer;
  const { loading } = submitInfoReducer;
  return { why_hire_you, loading, workExperienceReducer, fetchedUserProfile };
};
export default connect(
  mapStateToProps,
  { whyHireYou, infoSubmited }
)(WhyHireYou);
