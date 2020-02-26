/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import { APP_COLOR } from '../../constants';

const TNC_Text = ({ text }) => {
  return (
    <View>
      <Text>{text.afterHeading}</Text>
      <Text h4 style={{ color: APP_COLOR }}>
        {text.instruction1.heading}
      </Text>
      <View style={{ marginTop: 10, marginLeft: 10, paddingBottom: 5 }}>
        {text.instruction1.contents.map((val, i) => {
          return (
            <Text key={val} style={{ marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{`${i + 1}. `}</Text>
              {`${val}`}
            </Text>
          );
        })}
      </View>
      {text.instruction2 !== null ? (
        <View>
          <Text h4 style={{ color: APP_COLOR }}>
            {text.instruction2.heading}
          </Text>
          <View style={{ marginTop: 10, marginLeft: 10, paddingBottom: 5 }}>
            {text.instruction2.contents.map((val, i) => {
              return (
                <Text key={val} style={{ marginBottom: 5 }}>
                  <Text style={{ fontWeight: 'bold' }}>{`${i + 1}. `}</Text>
                  {`${val}`}
                </Text>
              );
            })}
          </View>
        </View>
      ) : null}
      <Text h4 style={{ color: APP_COLOR }}>
        {text.instruction3.heading}
      </Text>
      <View style={{ marginTop: 10, marginLeft: 10, paddingBottom: 5 }}>
        {text.instruction3.paragraphs.map(val => {
          return <Text key={val} style={{ marginBottom: 5 }}>{`${val}`}</Text>;
        })}
      </View>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        {text.topics.map(topic => {
          return (
            <View style={{ marginBottom: 10 }} key={topic.heading}>
              <Text h2 style={{ color: APP_COLOR, marginBottom: 5 }}>
                {topic.heading}
              </Text>
              <View style={{ marginLeft: 10 }}>
                {topic.contents.map((val, i) => {
                  return (
                    <Text key={val} style={{ marginBottom: 5 }}>
                      <Text style={{ fontWeight: 'bold' }}>{`${i + 1}. `}</Text>
                      {`${val}`}
                    </Text>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
      <Text h1 style={{ color: APP_COLOR, marginBottom: 15 }}>
        {text.travel.heading}
      </Text>
      {text.travel.subHeading !== null ? (
        <Text h2 style={{ color: APP_COLOR }}>
          {text.travel.subHeading}
        </Text>
      ) : null}
      <View style={{ marginTop: 10, marginLeft: 10, paddingBottom: 5 }}>
        {text.travel.points.map((val, i) => {
          return (
            <Text key={val} style={{ marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{`${i + 1}. `}</Text>
              {`${val}`}
            </Text>
          );
        })}
      </View>
      <Text h2 style={{ color: APP_COLOR }}>
        {text.travel.afterTravel}
      </Text>
      <View style={{ marginTop: 10, marginLeft: 10, paddingBottom: 5 }}>
        <Text>{text.travel.para}</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text h2 style={{ color: APP_COLOR, marginBottom: 5 }}>
          {text.duringSummer.heading}
        </Text>
        <View style={{ marginLeft: 10 }}>
          {text.duringSummer.points.map((val, i) => {
            return (
              <Text key={val} style={{ marginBottom: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>{`${i + 1}. `}</Text>
                {`${val}`}
              </Text>
            );
          })}
          <Text style={{ marginBottom: 5 }}>{text.duringSummer.line1}</Text>
          <Text style={{ marginBottom: 5 }}>{text.duringSummer.line2}</Text>
          <Text style={{ marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>{text.duringSummer.line3Bold} </Text>
            {text.duringSummer.line3}
          </Text>
        </View>
        {text.duringSummer.additionalPocketMoney !== null ? (
          <View>
            <Text h4 style={{ color: APP_COLOR, marginBottom: 10 }}>
              {text.duringSummer.additionalPocketMoney.heading}
            </Text>
            <Text style={{ marginBottom: 10 }}>
              {text.duringSummer.additionalPocketMoney.lineBullet}
            </Text>
            <View style={{ marginLeft: 10 }}>
              {text.duringSummer.additionalPocketMoney.remPoints.map((val, i) => {
                return (
                  <Text key={val} style={{ marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>{`${i + 10}. `}</Text>
                    {`${val}`}
                  </Text>
                );
              })}
            </View>
          </View>
        ) : null}
      </View>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        {text.remTopics.map(topic => {
          return (
            <View style={{ marginBottom: 10 }} key={topic.heading}>
              <Text h2 style={{ color: APP_COLOR, marginBottom: 5 }}>
                {topic.heading}
              </Text>
              {topic.line !== '' ? <Text style={{ marginBottom: 10 }}>{topic.line}</Text> : null}
              <View style={{ marginLeft: 10 }}>
                {topic.contents.map((val, i) => {
                  return (
                    <Text key={val} style={{ marginBottom: 5 }}>
                      <Text style={{ fontWeight: 'bold' }}>{`${i + 1}. `}</Text>
                      {`${val}`}
                    </Text>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
      <Text style={{ marginTop: 10, marginBottom: 10 }}>{text.signatureConfirm}</Text>
    </View>
  );
};

export { TNC_Text };
