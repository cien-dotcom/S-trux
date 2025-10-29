import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Logo = () => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedTouchable 
      style={[styles.logoContainer, animatedStyle]}
      onPressIn={() => { scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      activeOpacity={0.8}
    >
      <View style={styles.logoBlur} />
      <View style={styles.logo}>
        <Text style={styles.logoText}>ST</Text>
      </View>
    </AnimatedTouchable>
  );
};

const Header: React.FC = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Logo />
          <Text style={styles.title}>STrux</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(15, 14, 14, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(243, 159, 41, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoBlur: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    backgroundColor: '#F39F29',
    borderRadius: 5,
    opacity: 0.8,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#F39F29',
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: '#F39F29',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  logoText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#0F0E0E',
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },
});

export default Header;