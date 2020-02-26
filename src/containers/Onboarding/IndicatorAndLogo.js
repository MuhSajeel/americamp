/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Logo } from '../../components/common';
import { APP_COLOR } from '../../constants';

const IndicatorAndLogo = ({
  OnboardingData,
  scrollX = new Animated.View(0),
  width,
  position,
  update,
  scrollTo,
  scrollXChange,
}) => {
  const { lowerContainer } = styles;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={lowerContainer}>
        {OnboardingData.map((_, i) => {
          const color = position.interpolate({
            inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001],
            outputRange: ['#D3D3D3', APP_COLOR, APP_COLOR, APP_COLOR, '#D3D3D3'],
            extrapolate: 'clamp',
          });
          return (
            <View key={_.image}>
              {scrollX._value === 2 * width ? null : (
                <TouchableOpacity
                  onPress={() => {
                    scrollXChange(width * i);
                    update();
                    scrollTo({ x: width * i, animated: true });
                  }}
                >
                  <Animated.View style={[styles.redCircle, { backgroundColor: color }]} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      <View style={{ paddingRight: 30 }}>
        <Logo />
      </View>
    </View>
  );
};

export default IndicatorAndLogo;
