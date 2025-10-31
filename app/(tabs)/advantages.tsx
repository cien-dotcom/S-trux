import { StyleSheet, View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';

export default function AdvantagesScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
            <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
                Keunggulan Screen
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});