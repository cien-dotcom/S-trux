import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ArrowUp, Check, ClipboardList } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate,
  useAnimatedScrollHandler,
  withSpring,
  Extrapolate
} from 'react-native-reanimated';

const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);

const { width, height } = Dimensions.get('window');

const featureItems = [
  { text: "Armada Terawat", subtext: "Service rutin & teknisi ahli" },
  { text: "Harga Terbaik", subtext: "Paket fleksibel sesuai budget anda" },
  { text: "Proses Cepat", subtext: "Booking dalam hitungan menit" },
];

const statItems = [
  { value: "30+", label: "UNIT TERSEDIA" },
  { value: "24/7", label: "SUPPORT" },
  { value: "100+", label: "PROYEK SELESAI" },
];

const Hero: React.FC = () => {
  const bgImageUrl = "https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/056c/fa0c/f93a0aa8ed8b12baaa00cfb3f30136fe?Expires=1762128000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t17Onb-PqT8Mn4nWShdroLZ1pWnk-iGqul0oz96aAv~lm1ylRnQeC7LlVql3GuwZ8m5-lTOQW3LL3V9h93X5q~6EnzYH-gPfnfOAo0CT9kneQNJl7dqRgAeK6NIBGfZ1x7LeKXnc5Sn7hu6Q8N0JdQ5l3SDrb-E2NLVMKWU0HUKtrepdd1Ov9xv5U0nPflK~LAJ9p-omgQCuIDjGwdC8q64FoVKuDPGBNNBr-ZzCAzBZLsjaz47xVr4kLYxHVKWX8afpFQ0uPKt0GVcCN-9KmfYB~ZU5~9ecDWgnEQGEkw9CAtR9CqK4ualFdBgCO0FJOCOoZyPjcJDVNQDeTEn~Aw__";

  const scrollY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 300],
      [0, -100],
      Extrapolate.CLAMP
    );
    
    const scale = interpolate(
      scrollY.value,
      [0, 300],
      [1, 1.2],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateY },
        { scale }
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 200],
      [1, 0],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, 200],
      [0, 50],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const PrimaryButton = ({ onPress }: { onPress: () => void }) => {
    const scale = useSharedValue(1);
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    return (
      <AnimatedTouchable 
        style={[styles.primaryButton, animatedStyle]}
        onPressIn={() => { scale.value = withSpring(0.95); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <ClipboardList size={18} color="white" />
        <Text style={styles.primaryButtonText}>Mulai Sewa</Text>
      </AnimatedTouchable>
    );
  };

  const SecondaryButton = ({ onPress }: { onPress: () => void }) => {
    const scale = useSharedValue(1);
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    return (
      <AnimatedTouchable 
        style={[styles.secondaryButton, animatedStyle]}
        onPressIn={() => { scale.value = withSpring(0.95); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.secondaryButtonText}>Jelajahi</Text>
        <ArrowUp size={18} color="#F39F29" style={styles.arrowIcon} />
      </AnimatedTouchable>
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground 
        source={{ uri: bgImageUrl }} 
        style={[styles.backgroundImage, backgroundStyle]}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.darkOverlay} />
        
        <Animated.ScrollView 
          style={styles.scrollView}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <AnimatedView style={[styles.content, contentStyle]}>
            <View style={styles.mainSection}>
              <View style={styles.textSection}>
                <Text style={styles.title}>
                  SOLUSI PENYEWAAN{'\n'}ALAT BERAT PREMIUM{'\n'}UNTUK PROYEK ANDA
                </Text>
                <Text style={styles.description}>
                  Tingkatkan produktivitas proyek konstruksi Anda dengan armada alat berat modern kami. Kualitas terjamin, harga kompetitif, dan layanan 24/7.
                </Text>
                
                <View style={styles.buttonContainer}>
                  <PrimaryButton onPress={() => console.log('Mulai Sewa')} />
                  <SecondaryButton onPress={() => console.log('Jelajahi')} />
                </View>
              </View>

              {width > 768 && (
                <View style={styles.featuresSection}>
                  <View style={styles.featuresCard}>
                    {featureItems.map((item, index) => (
                      <View key={index} style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                          <Check color="black" size={24} />
                        </View>
                        <View style={styles.featureText}>
                          <Text style={styles.featureTitle}>{item.text}</Text>
                          <Text style={styles.featureSubtitle}>{item.subtext}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>

            <View style={styles.statsContainer}>
              {statItems.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </AnimatedView>
        </Animated.ScrollView>
      </AnimatedBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 14, 14, 0.7)',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  mainSection: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 64,
    alignItems: 'center',
    marginBottom: 96,
  },
  textSection: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: width > 768 ? 48 : 36,
    color: 'white',
    lineHeight: width > 768 ? 56 : 44,
    marginBottom: 24,
  },
  description: {
    fontSize: 18,
    color: 'white',
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: 500,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#FDCB41',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    shadowColor: '#F39F29',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FDCB41',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    shadowColor: '#F39F29',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  secondaryButtonText: {
    color: '#F39F29',
    fontWeight: 'bold',
    fontSize: 16,
  },
  arrowIcon: {
    transform: [{ rotate: '-45deg' }],
  },
  featuresSection: {
    flex: 1,
  },
  featuresCard: {
    backgroundColor: 'rgba(243, 159, 41, 0.2)',
    borderWidth: 1,
    borderColor: '#FDCB41',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#F39F29',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  featureItem: {
    backgroundColor: 'rgba(15, 14, 14, 0.75)',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  featureIcon: {
    backgroundColor: '#F39F29',
    borderRadius: 8,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    maxWidth: 500,
    alignSelf: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 36,
    color: '#F39F29',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

export default Hero;