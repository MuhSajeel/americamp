/* eslint-disable no-shadow */
import React from 'react';

import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../../redux/actions';

import { TakeDocumentPhoto } from '../../../components/DocumentsScreen/TakeDocumentPhoto';

const UploadOtherDocuments = props => {
  return (
    <TakeDocumentPhoto
      {...props}
      heading="Additional documents"
      subHeading="Please take a clear legible photograph of any additional documents"
      lowerText1="Do you have additional documents?"
      lowerText2="Then please add these below:"
      docField="additional_documents"
      docName="additional_document"
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
)(UploadOtherDocuments);
