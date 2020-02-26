/* eslint-disable no-shadow */
import React from 'react';

import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../../redux/actions';

import { TakeDocumentPhoto } from '../../../components/DocumentsScreen/TakeDocumentPhoto';

const UploadCampContract = props => {
  return (
    <TakeDocumentPhoto
      {...props}
      heading="YOUR CAMP CONTRACT"
      subHeading="Please take a clear legible photograph of your camp contract"
      lowerText1="Do you have your contract?"
      lowerText2="Then let’s get it uploaded below:"
      docField="camp_contract"
      shouldPush
    />
  );
};

const mapStateToProps = ({ uploadDocument, submitInfoReducer, fetchedUserProfile }) => {
  const { uploading } = uploadDocument;
  const { loading } = submitInfoReducer;
  return {
    uploading,
    loading: loading || false,
    fetchedUserProfile,
    Document: fetchedUserProfile.documents,
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(UploadCampContract);
