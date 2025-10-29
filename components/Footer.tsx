import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.copyright}>
          &copy; {new Date().getFullYear()} STrux. All rights reserved.
        </Text>
        <Text style={styles.tagline}>
          Premium Heavy Equipment Rental Solutions
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F0E0E',
    borderTopWidth: 1,
    borderTopColor: 'rgba(243, 159, 41, 0.2)',
    paddingVertical: 32,
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  copyright: {
    color: '#978D8D',
    fontSize: 16,
    marginBottom: 8,
  },
  tagline: {
    color: '#978D8D',
    fontSize: 14,
  },
});

export default Footer;