import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { Icon, Badge } from 'react-native-elements';
import { Thumbnail } from 'react-native-thumbnail-video';
import {
  BottomButtonRight,
  Card,
  ScreenSpinner,
  Heading,
  SubHeading
} from '../../components/common';
import { inputChanged, infoSubmited } from '../../redux/actions';
import {
  INTERVIEW_STATUS,
  OTHER_DOCUMENTS_CHANGED,
  UPLOAD_OTHER_DOCUMENTS,
  IMAGE_BG_COLOR,
  APP_COLOR,
  PLACEHOLDER_COLOR
} from '../../constants';

const { width } = Dimensions.get('window');
const headings = {
  UploadProfile: 'Profile Picture',
  UploadOtherDocuments: 'Additional Documents',
  UploadVideo: 'Your Video',
  UploadCampInvite: 'Camp Invite',
  UploadStudentStatus: 'Student Status',
  UploadCriminalRecord: 'Police Check',
  UploadPassport: 'Passport',
  UploadHealthHistoryForm: 'Health History Form',
  UploadCampContract: 'Camp Contract'
};
class ViewDocuments extends Component {
  state = { name: '', viewOption: '', route: '', error: null };

  componentDidMount() {
    const { navigation, documents } = this.props;
    const viewOption = navigation.getParam('viewOption');
    const route = navigation.getParam('route');
    const name = headings[route];
    this.setState({ name, viewOption, route });
    this.willFocusSubscription = navigation.addListener(
      'willFocus',
      async () => {
        if (!documents[viewOption].length) navigation.goBack();
      }
    );
  }

  componentDidUpdate() {
    const { navigation, documents } = this.props;
    const { viewOption, route } = this.state;
    if (!documents[viewOption].length) navigation.navigate(route);
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  deleteDocument(i, name) {
    const { viewOption } = this.state;
    const { documents } = this.props;
    const list = documents[viewOption];
    // eslint-disable-next-line no-shadow
    const { fetchedUserProfile, inputChanged, infoSubmited } = this.props;
    const newList = list.slice();
    newList.splice(i, 1);
    inputChanged(newList.slice(), OTHER_DOCUMENTS_CHANGED);
    const data = fetchedUserProfile;
    data.documents[name] = newList.slice();
    infoSubmited(data, true, null, true, true);
  }

  alert(i, length, name, route) {
    if (
      name === 'additional_documents' ||
      (name !== 'additional_documents' && length > 1)
    ) {
      // return Alert.alert('Delete', 'Are You Sure?', [
      //   {
      //     text: 'Yes',
      //     onPress: () => this.deleteDocument(i, name)
      //   },
      //   { text: 'No' }
      // ]);
    }
    // return Alert.alert(
    //   'You must keep atleast one.',
    //   'Although you can replace?',
    //   [
    //     { text: 'Yes', onPress: () => this.props.navigation.navigate(route) },
    //     { text: 'No' }
    //   ]
    // );
  }

  render() {
    const {
      navigation,
      loading,
      documents,
      stageProgress,
      position
    } = this.props;
    console.log('stp', stageProgress);
    console.log('position', position);
    console.log(stageProgress[Object.keys(stageProgress)[position]]);

    const { viewOption, route, name, error } = this.state;
    const list = documents[viewOption] || [];

    return (
      <Card>
        <View key='content' style={{ alignItems: 'center', flex: 1 }}>
          <ScreenSpinner isVisible={loading} />
          <View>
            <Heading>{name}</Heading>
          </View>
          {list.map((url, i) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 50,
                  marginTop: 20
                }}
                key={
                  viewOption === 'additional_documents'
                    ? url.url || `${i * 2}}`
                    : url
                }
              >
                {viewOption !== 'video' ? (
                  <Image
                    source={{
                      uri:
                        viewOption === 'additional_documents' ? url.url : url,
                      cache: 'force-cache'
                    }}
                    style={{
                      width: width * 0.8,
                      aspectRatio: 1,
                      backgroundColor: IMAGE_BG_COLOR
                    }}
                    indicator={Progress.Pie}
                    indicatorProps={{
                      borderWidth: 0,
                      color: APP_COLOR,
                      unfilledColor: PLACEHOLDER_COLOR
                    }}
                    resizeMethod='resize'
                    key={url}
                  />
                ) : (
                  <Thumbnail
                    imageWidth={width * 0.8}
                    url={url}
                    onError={err =>
                      this.setState({ error: err ? true : false })
                    }
                  >
                    {error ? (
                      <SubHeading
                        extraStyling={{ fontSize: 36, color: APP_COLOR }}
                      >
                        Invalid URL
                      </SubHeading>
                    ) : null}
                  </Thumbnail>
                )}
                {this.props.status ===
                (INTERVIEW_STATUS.not_requested ||
                  INTERVIEW_STATUS.rejected) ? (
                  <Badge
                    status='error'
                    containerStyle={{
                      position: 'absolute',
                      top: -4,
                      right: -4
                    }}
                    value={
                      <Icon
                        name='times'
                        color='#fff'
                        size={15}
                        type='font-awesome'
                        underlayColor='#ffffff00'
                      />
                    }
                    onPress={() =>
                      this.alert(i, list.length, viewOption, route)
                    }
                  />
                ) : null}
              </View>
            );
          })}
          {!list.length ? <SubHeading>No Documents to view!</SubHeading> : null}
        </View>
        <View key='bottomLeft'>
          <BottomButtonRight onPress={() => navigation.goBack()}>
            BACK
          </BottomButtonRight>
        </View>
        <View key='bottomRight'>
          {this.props.status ===
          (INTERVIEW_STATUS.not_requested || INTERVIEW_STATUS.rejected) ? (
            <BottomButtonRight onPress={() => navigation.navigate(route)}>
              {route === UPLOAD_OTHER_DOCUMENTS ? 'ADD MORE' : 'CHANGE'}
            </BottomButtonRight>
          ) : null}
        </View>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);

  const {
    submitInfoReducer: { loading },
    fetchedUserProfile,
    interview: { status },
    userCurrentStageReducer: { position },
    stageProgress
  } = state;
  return {
    loading,
    documents: fetchedUserProfile.documents,
    fetchedUserProfile,
    status,
    stageProgress,
    position
  };
};

export default connect(
  mapStateToProps,
  { inputChanged, infoSubmited }
)(ViewDocuments);
