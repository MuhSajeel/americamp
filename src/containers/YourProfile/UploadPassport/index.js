/* eslint-disable no-shadow */
import React from 'react';

import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../../redux/actions';

import { TakeDocumentPhoto } from '../../../components/DocumentsScreen/TakeDocumentPhoto';

const UploadPassport = props => {
  return (
    <TakeDocumentPhoto
      {...props}
      heading="YOUR PASSPORT"
      subHeading="Please take a clear legible photograph of your passport"
      docField="passport"
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
)(UploadPassport);
