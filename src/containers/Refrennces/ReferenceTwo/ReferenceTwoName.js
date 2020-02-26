/* eslint-disable camelcase */
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { referenceTwoName } from '../../../redux/actions';
import { Screen, FooterWithButtons, Heading, Input, SubHeading } from '../../../components/common';
import { APP_COLOR, REFERENCE_TWO_EMAIL, LABEL_COLOR } from '../../../constants';

// eslint-disable-next-line no-shadow
const ReferenceName = ({ navigation, referenceTwoName, name, status }) => {
  const { navigate, goBack } = navigation;
  return (
    <Screen>
      <View key="header">
        <Heading>
          REFERENCE <Text style={{ color: APP_COLOR }}>TWO</Text>
        </Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>NAME</SubHeading>
      </View>
      <View key="content" style={{ paddingTop: 30, flexDirection: 'row' }}>
        <Input
          editable={status === 'awaiting' || status === null}
          autoFocus={Platform.OS === 'android'}
          placeholder="NAME OF REFEREE"
          onChangeText={text => referenceTwoName(text)}
          value={name}
        />
        {status && status !== 'awaiting' ? (
          <View style={{ borderBottomColor: LABEL_COLOR, borderBottomWidth: 0.5 }}>
            <Icon
              type="font-awesome"
              name="check"
              size={30}
              iconStyle={{ color: 'green', paddingTop: 20 }}
            />
          </View>
        ) : null}
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => goBack(null)}
          rightBtnNavigation={name ? () => navigate(REFERENCE_TWO_EMAIL) : null}
          btnTxt={{ leftBtnTxt: 'PREVIOUS', rightBtnTxt: 'NEXT' }}
        />
      </View>
    </Screen>
  );
};

const mapStateToProps = ({ referenceReducer }) => {
  const { references } = referenceReducer;
  const { name, status } = references[1];
  return { name, status };
};

export default connect(
  mapStateToProps,
  { referenceTwoName }
)(ReferenceName);
