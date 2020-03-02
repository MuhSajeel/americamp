import React from 'react';
import { View, Text } from 'react-native';

import { Screen, FooterWithButtons } from '../../components/common';
import { DASHBOARD, DOCUMENTS_LIST } from '../../constants';

const DocumentsBoarding = ({ navigation: { navigate } }) => {
  const { para1, para2, para3, para4 } = data;
  return (
    <Screen>
      <View key="header" />
      <View key="content">
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{para1}</Text>
        <Text style={{ marginBottom: 10 }}>{para2}</Text>
        <Text style={{ marginBottom: 10 }}>{para3}</Text>
        <Text style={{ fontWeight: 'bold' }}>{para4}</Text>
      </View>
      <View key="footer">
        <FooterWithButtons
          leftBtnNavigation={() => navigate(DASHBOARD)}
          rightBtnNavigation={() => navigate(DOCUMENTS_LIST)}
          btnTxt={{ leftBtnTxt: 'FINISH', rightBtnTxt: 'PROCEED' }}
        />
      </View>
    </Screen>
  );
};

const data = {
  para1: `Here are the various forms that we’ll need you to download and complete to allow us to action your application.`,
  para2: `As you can understand travelling and working in America can be quite a lengthy (and tedious) process but we’ll try to make it as easy as possible for you via this app.`,
  para3: `All of the documents are in electronic PDF so simply download them, complete and upload right back to us.`,
  para4: `It’s that easy.`,
};

export { DocumentsBoarding };
