import React from 'react';
import LottieView from 'lottie-react-native';

export const LoadingAnimation = () => {
  return (
    <LottieView
      source={require('../assets/animations/loading.json')}
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
    />
  );
};