const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  brand: {
    primary: '#FDCB41',
    secondary: '#F39F29',
    dark: '#0F0E0E',
    dark2: '#141212',
    dark3: '#1E1E1E',
    textMuted: '#978D8D',
  },
};

export type ColorScheme = keyof typeof Colors;