/* eslint-disable no-shadow */
import React from 'react';

import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../../redux/actions';

import { TakeDocumentPhoto } from '../../../components/DocumentsScreen/TakeDocumentPhoto';

const UploadCriminalRecord = props => {
  return (
    <TakeDocumentPhoto
      {...props}
      heading="YOUR POLICE CHECK REPORT"
      subHeading="Please take a clear legible photograph of police check report"
      lowerText1="Do you have the report?"
      lowerText2="Then let’s get it uploaded below:"
      docField="police_background_check"
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
)(UploadCriminalRecord);
