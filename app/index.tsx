import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router'; // ✅ Import Stack
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Fleet from '@/components/Fleet';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';

export default function HomeScreen() {
  return (
    <>
      {/* ✅ Tambahkan Stack.Screen untuk mengatur header */}
      <Stack.Screen 
        options={{ 
          headerShown: false // ✅ Sembunyikan header default
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header />
        <Hero />
        <Fleet />
        <WhyChooseUs />
        <Footer />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0E0E',
  },
  scrollContent: {
    flexGrow: 1,
  },
});