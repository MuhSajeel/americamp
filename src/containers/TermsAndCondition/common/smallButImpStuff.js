import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {
  Screen,
  Heading,
  SubHeading,
  FooterWithButtons,
  Input,
  Spinner,
} from '../../../components/common';
import { APP_COLOR } from '../../../constants';

const SmallButImportantStuff = ({
  navigation: { navigate },
  text,
  heading,
  subHeading,
  previousPath,
  nextPath,
  isFinal,
  onInitialChange,
  onDateChange,
  initialValue,
  dateValue,
  reducerAction,
  loading,
}) => {
  const { inputStyle } = styles;
  return (
    <Screen>
      <View key="header">
        <Heading>{heading || 'THE SMALL BUT IMPORTANT STUFF'}</Heading>
        <SubHeading extraStyling={{ color: APP_COLOR, fontSize: 25 }}>{subHeading}</SubHeading>
      </View>
      <View key="content">
        {Object.entries(text).map((val, i) => {
          return i < 4 ? (
            <Text style={{ marginTop: 15 }} key={`${i * 2}`}>
              {val[1]}
            </Text>
          ) : (
            <Text style={{ fontWeight: 'bold', marginTop: 20 }} key={`${i * 2}`}>
              {val[1]}
            </Text>
          );
        })}
        <View style={inputStyle}>
          <Input placeholder="INITIALS" onChangeText={onInitialChange} value={initialValue} />
        </View>
        <View style={inputStyle}>
          <Input placeholder="DATE (dd/mm/yyyy)" onChangeText={onDateChange} value={dateValue} />
        </View>
      </View>
      <View key="footer">
        {loading ? (
          <View style={{ alignItems: 'flex-end' }}>
            <Spinner />
          </View>
        ) : (
          <FooterWithButtons
            leftBtnNavigation={() => navigate(previousPath)}
            rightBtnNavigation={
              nextPath
                ? () => {
                    if (isFinal) {
                      return reducerAction();
                    }
                    return navigate(nextPath);
                  }
                : null
            }
            btnTxt={{
              leftBtnTxt: 'CLOSE',
              rightBtnTxt: isFinal ? 'FINISH' : 'CONTINUE',
            }}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export { SmallButImportantStuff };
