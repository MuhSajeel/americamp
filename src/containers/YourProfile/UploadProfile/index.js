/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';

import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
//import Toast from 'react-native-simple-toast';

import { Screen, Heading, FooterWithButtons, SubHeading } from '../../../components/common';
import { uploadImage } from '../../../helpers/S3Upload/ImageUpload';
import {
  uploadImageAction,
  uploadImageActionSuccess,
  infoSubmited,
  uploadImageActionFailure,
} from '../../../redux/actions';
import {
  APP_COLOR,
  DASHBOARD,
  UPLOAD_IMAGE_CANCELLED,
  IMAGE_BG_COLOR,
  PLACEHOLDER_COLOR,
} from '../../../constants';

const { width } = Dimensions.get('window');

class UploadProfile extends Component {
  state = {
    uri: null,
    name: null,
    type: 'img/*',
    progress: 0,
  };

  UploadImage = { abort: () => {} };

  componentDidMount() {
    const { photograph_upload } = this.props.fetchedUserProfile.documents;
    const uri = photograph_upload && photograph_upload.length ? photograph_upload[0] : null;
    this.setState({ uri });
  }

  openLibrary(options) {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        // eslint-disable-next-line no-console
        console.debug('User cancelled image picker');
      } else if (response.error) {
        // eslint-disable-next-line no-console
        console.debug('ImagePicker Error: ', response.error);
      } else {
        const name = response.uri.substring(response.uri.lastIndexOf('/') + 1);
        this.setState({ uri: response.uri, name });
      }
    });
  }

  takePhoto(options) {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        // eslint-disable-next-line no-console
        console.debug('User cancelled image picker');
      } else if (response.error) {
        // eslint-disable-next-line no-console
        console.debug('ImagePicker Error: ', response.error);
      } else {
        const name = response.uri.substring(response.uri.lastIndexOf('/') + 1);
        this.setState({ uri: response.uri, name });
      }
    });
  }

  abortImageUpload() {
    const { uploadImageActionFailure } = this.props;
    this.UploadImage.abort();
    //Toast.show(UPLOAD_IMAGE_CANCELLED);
    uploadImageActionFailure();
  }

  upload() {
    const {
      uploadImageAction: imageUploadAction,
      uploadImageActionSuccess: imageUploadActionSuccess,
      uploadImageActionFailure,
      fetchedUserProfile,
      infoSubmited,
    } = this.props;
    const file = {
      uri: this.state.uri,
      name: this.state.name,
      type: this.state.type,
    };
    imageUploadAction();
    this.UploadImage = uploadImage(file)
      .progress(({ loaded, total }) => this.setState({ progress: loaded / total }))
      .then(res => {
        if (res.status !== 201) {
          uploadImageActionFailure();
          throw new Error('Failed to upload image to S3');
        }
        const {
          body: {
            postResponse: { location },
          },
        } = res;
        imageUploadActionSuccess(location);
        const data = fetchedUserProfile;
        data.documents.photograph_upload = [location];
        infoSubmited(data);
      });
  }

  render() {
    const {
      navigation,
      Document: { photograph_upload },
    } = this.props;
    const existingUrl = photograph_upload && photograph_upload.length ? photograph_upload[0] : null;
    const options = {
      title: 'Select Photo',
      takePhotoButtonTitle: 'Take Photo..',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'img',
    };
    const { uploading, loading } = this.props;
    const { progress, uri } = this.state;

    return (
      <Screen>
        <View key="header">
          <Heading>CHOOSE YOUR PROFILE IMAGE</Heading>
        </View>
        <View key="content">
          <SubHeading>SELECT YOUR PROFILE PHOTO</SubHeading>
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Icon
              onPress={
                uploading
                  ? null
                  : () => {
                      this.takePhoto(options);
                    }
              }
              name="camera"
              type="font-awesome"
              size={70}
              iconStyle={{ color: 'grey' }}
            />
            <Icon
              onPress={
                uploading
                  ? null
                  : () => {
                      this.openLibrary(options);
                    }
              }
              name="image"
              type="font-awesome"
              size={70}
              iconStyle={{ color: 'grey' }}
            />
          </View>
          {uri ? (
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image
                source={{ uri }}
                style={{ width: width * 0.4, aspectRatio: 1, backgroundColor: IMAGE_BG_COLOR }}
                indicator={Progress.Pie}
                indicatorProps={{
                  borderWidth: 0,
                  color: APP_COLOR,
                  unfilledColor: PLACEHOLDER_COLOR,
                }}
                resizeMethod="resize"
              />
            </View>
          ) : null}
        </View>
        <View key="footer">
          {uploading ? (
            <View style={{ marginBottom: 20, alignItems: 'center' }}>
              <Progress.Bar
                progress={progress}
                width={Math.floor(width * 0.75)}
                color={APP_COLOR}
                borderColor={APP_COLOR}
              />
            </View>
          ) : null}
          <FooterWithButtons
            leftBtnNavigation={
              uploading ? () => this.abortImageUpload() : () => navigation.navigate(DASHBOARD)
            }
            rightBtnNavigation={
              uri && uri !== existingUrl && !uploading && !loading ? () => this.upload() : null
            }
            btnTxt={{ leftBtnTxt: 'Cancel', rightBtnTxt: 'Upload' }}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = ({ uploadDocument, submitInfoReducer, fetchedUserProfile, Document }) => {
  const { uploading } = uploadDocument;
  const { loading } = submitInfoReducer;
  return { uploading, loading: loading || false, fetchedUserProfile, Document };
};

export default connect(
  mapStateToProps,
  { uploadImageAction, uploadImageActionSuccess, infoSubmited, uploadImageActionFailure }
)(UploadProfile);
