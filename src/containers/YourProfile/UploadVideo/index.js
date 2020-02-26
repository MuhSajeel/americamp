/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import { Heading, SubHeading, Screen, FooterWithButtons } from '../../../components/common';
import {
  BLACK_COLOR,
  APP_COLOR,
  DASHBOARD,
  UPLOAD_VIDEO_CANCELLED,
  YOUTUBE_URL,
} from '../../../constants';
import Styles from './styles';
import { uploadVideo } from '../../../helpers/S3Upload/VideoUpload';
import {
  uploadVideoAction,
  uploadVideoSuccess,
  uploadVideoFailure,
  infoSubmited,
} from '../../../redux/actions';
import { isValidUri } from '../../../helpers/Validators/validUrl';

const { width } = Dimensions.get('window');

class UploadVideo extends Component {
  state = {
    uri: null,
    name: null,
    type: 'video/*',
    progress: 0,
  };

  UploadVideo = { abort: () => {} };

  openImagePicker = options => {
    ImagePicker.showImagePicker(options, response => {
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
  };

  abortVideoUpload() {
    const { uploadVideoFailure } = this.props;
    this.UploadVideo.abort();
    Toast.show(UPLOAD_VIDEO_CANCELLED);
    uploadVideoFailure();
  }

  upload() {
    const {
      uploadVideoAction,
      uploadVideoSuccess,
      fetchedUserProfile,
      infoSubmited,
      uploadVideoFailure,
    } = this.props;
    const file = {
      uri: this.state.uri,
      name: this.state.name,
      type: this.state.type,
    };
    uploadVideoAction();
    this.UploadVideo = uploadVideo(file)
      .progress(({ loaded, total }) => this.setState({ progress: loaded / total }))
      .then(res => {
        if (res.status !== 201) {
          uploadVideoFailure();
          throw new Error('Failed to upload image to S3');
        }
        const {
          body: {
            postResponse: { location },
          },
        } = res;
        uploadVideoSuccess(location);
        const data = fetchedUserProfile;
        data.documents.video = [location];
        infoSubmited(data);
      });
  }

  saveUrl() {
    const { fetchedUserProfile, infoSubmited } = this.props;
    const { uri } = this.state;
    const data = fetchedUserProfile;
    data.documents.video = [uri];
    infoSubmited(data);
  }

  render() {
    const { navigation } = this.props;
    const { uploading, loading } = this.props;
    const { progress, uri } = this.state;
    return (
      <Screen>
        <View key="header">
          <Heading>LINK your video</Heading>
        </View>
        <View key="content">
          <SubHeading>
            link YOUR video FROM YOUTUBE OR AN ALTERNATIVE video sharing website by providing the
            videos url
          </SubHeading>
          <View style={Styles.uploadButtonStyle}>
            <TouchableOpacity onPress={() => Linking.openURL(YOUTUBE_URL)}>
              <Image
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
                source={require('../../../assets/images/YourProfile/youtube.png')}
              />
            </TouchableOpacity>
          </View>
          {uploading ? (
            <View style={{ margin: 10 }}>
              <Progress.Bar
                progress={progress}
                width={Math.floor(width * 0.75)}
                color={APP_COLOR}
                borderColor={APP_COLOR}
              />
            </View>
          ) : null}
          <TextInput
            style={Styles.inputStyle}
            placeholder="VIDEO URL HERE"
            placeholderTextColor={BLACK_COLOR}
            onChangeText={text => this.setState({ uri: text })}
            value={uri}
          />
        </View>
        <View key="footer">
          <FooterWithButtons
            leftBtnNavigation={
              uploading ? () => this.abortVideoUpload() : () => navigation.navigate(DASHBOARD)
            }
            rightBtnNavigation={
              uri && !uploading && !loading
                ? () => {
                    if (!isValidUri(uri)) {
                      return Toast.show('Please Enter Valid url');
                    }
                    return this.saveUrl();
                  }
                : null
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
  { uploadVideoAction, uploadVideoSuccess, infoSubmited, uploadVideoFailure }
)(UploadVideo);
