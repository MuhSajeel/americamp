import React from 'react';
import { connect } from 'react-redux';

import { inputChanged, infoSubmited } from '../../../redux/actions';
import { TakeDocumentPhoto } from '../../../components/DocumentsScreen/TakeDocumentPhoto';

const UploadHealthHistoryForm = props => {
  return (
    <TakeDocumentPhoto
      {...props}
      heading="health history form"
      subHeading="Please take a clear legible photograph of your completed health history form"
      lowerText1="Have you completed the form?"
      lowerText2="Then let’s get it uploaded below:"
      docField="health_history_form"
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
)(UploadHealthHistoryForm);
