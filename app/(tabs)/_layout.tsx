import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#FCD34D',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarStyle: {
                    backgroundColor: '#000000',
                    borderTopColor: '#333333',
                    height: Platform.OS === 'ios' ? 88 : 60,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Beranda',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Alat Berat',
                    tabBarIcon: ({ color }) => <Ionicons name="construct" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="advantages"
                options={{
                    title: 'Keunggulan',
                    tabBarIcon: ({ color }) => <Ionicons name="star" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="contact"
                options={{
                    title: 'Kontak',
                    tabBarIcon: ({ color }) => <Ionicons name="call" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
