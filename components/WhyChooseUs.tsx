import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Zap, ShieldCheck, Tag, Clock } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withDelay,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

const { width } = Dimensions.get('window');

const features = [
  {
    icon: Zap,
    title: "Proses Booking Cepat",
    description: "Sistem booking online yang mudah dan cepat. Dapatkan konfirmasi dalam hitungan menit."
  },
  {
    icon: ShieldCheck,
    title: "Armada Terjamin",
    description: "Semua unit kami terasuransi dan melewati maintenance rutin untuk performa terbaik."
  },
  {
    icon: Tag,
    title: "Harga Kompetitif",
    description: "Kami menawarkan paket sewa yang fleksibel dengan harga terbaik di kelasnya."
  },
  {
    icon: Clock,
    title: "Dukungan 24/7",
    description: "Tim support kami siap membantu Anda kapan saja, memastikan proyek berjalan lancar."
  },
];

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withDelay(index * 200, withTiming(1, { duration: 600 }));
    translateY.value = withDelay(index * 200, withSpring(0, { damping: 12 }));
    scale.value = withDelay(index * 200, withSpring(1, { damping: 12 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });

  const Icon = feature.icon;

  return (
    <AnimatedView style={[styles.featureCard, animatedStyle]}>
      <View style={styles.iconContainer}>
        <Icon color="black" size={28} />
      </View>
      <Text style={styles.featureTitle}>{feature.title}</Text>
      <Text style={styles.featureDescription}>{feature.description}</Text>
    </AnimatedView>
  );
};

const WhyChooseUs: React.FC = () => {
  const containerOpacity = useSharedValue(0);

  useEffect(() => {
    containerOpacity.value = withTiming(1, { duration: 800 });
  }, []);

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  return (
    <AnimatedView style={[styles.container, containerStyle]}>
      <View style={styles.glowEffect} />
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Keunggulan Kami</Text>
        </View>
        <Text style={styles.title}>Kenapa Memilih STrux</Text>
        <Text style={styles.description}>
          Kami berkomitmen memberikan layanan terbaik dengan standar keamanan tinggi dan dukungan penuh untuk kesuksesan proyek Anda.
        </Text>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </View>
      </View>
    </AnimatedView>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141212',
    paddingVertical: 80,
    minHeight: 800,
    position: 'relative',
    overflow: 'hidden',
  },
  glowEffect: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 384,
    height: 384,
    backgroundColor: '#F39F29',
    opacity: 0.1,
    borderRadius: 192,
    transform: [{ translateX: -192 }, { translateY: -192 }],
  },
  content: {
    paddingHorizontal: 24,
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(243, 159, 41, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(243, 159, 41, 0.5)',
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 16,
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#978D8D',
    textAlign: 'center',
    maxWidth: 500,
    alignSelf: 'center',
    lineHeight: 24,
    marginBottom: 64,
  },
  featuresGrid: {
    flexDirection: width > 768 ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: '#1E1E1E',
    borderWidth: 0.3,
    borderColor: '#F39F29',
    borderRadius: 16,
    padding: 24,
    flex: width > 768 ? 1 : undefined,
    minWidth: width > 768 ? 250 : '100%',
    maxWidth: 300,
  },
  iconContainer: {
    backgroundColor: '#FDCB41',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  featureTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#F39F29',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
});

export default WhyChooseUs;