import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Card, BottomButtonLeft, Logo, Heading, SubHeading } from '../../../components/common';
import { APP_COLOR, UPLOAD_OTHER_DOCUMENTS, STAGE_FOUR } from '../../../constants';
import styles from './styles';

const StageFourBoarding = ({ navigation }) => {
  return (
    <Card>
      {/* Screen Content */}
      <View key="content">
        <Heading>
          YOU&apos;VE OFFICIALLY BEEN #PL<Text style={{ color: APP_COLOR }}>AC</Text>ED! WELCOME TO
          THE AMERICAMP FAMILY
        </Heading>
        <SubHeading extraStyling={{ fontSize: 25 }}>
          HERE&apos;S WHAT YOU NEED TO DO NEXT...
        </SubHeading>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => navigation.navigate(UPLOAD_OTHER_DOCUMENTS)}
            style={styles.middleBox}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Text style={styles.middleBoxText}>UPLOAD REMAINING DOCUMENTS</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* Content end */}

      {/* Bottom buttons or logo */}
      <View key="bottomLeft">
        <BottomButtonLeft onPress={() => navigation.navigate(STAGE_FOUR)}>HOME</BottomButtonLeft>
      </View>
      <View key="bottomRight">
        <Logo />
      </View>
      {/* bottom end */}
    </Card>
  );
};

export default StageFourBoarding;
