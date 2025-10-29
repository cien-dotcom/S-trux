import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Wrench, Shield, Clock } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);

const { width } = Dimensions.get('window');
const CARD_WIDTH = width > 768 ? 320 : 280;

interface FleetCardProps {
  image: string;
  name: string;
  category: string;
  features: string[];
  price: string;
}

const icons = [Wrench, Shield, Clock];

const FleetCard: React.FC<FleetCardProps> = ({ image, name, category, features, price }) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
    translateY.value = withSpring(-8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    translateY.value = withSpring(0);
  };

  return (
    <AnimatedTouchable 
      style={[styles.card, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.imageOverlay} />
        <View style={styles.availabilityBadge}>
          <Text style={styles.availabilityText}>Tersedia</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>

        <View style={styles.features}>
          {features.map((feature, index) => {
            const Icon = icons[index % icons.length];
            return (
              <View key={index} style={styles.feature}>
                <Icon color="#FDCB41" size={16} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Harga Sewa</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailButtonText}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#141212',
    borderRadius: 16,
    borderWidth: 0.3,
    borderColor: '#F39F29',
    overflow: 'hidden',
    marginHorizontal: 8,
    shadowColor: '#F39F29',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 14, 14, 0.3)',
  },
  availabilityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FDCB41',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  availabilityText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 4,
  },
  category: {
    color: '#F39F29',
    fontSize: 14,
    marginBottom: 16,
  },
  features: {
    gap: 8,
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#D1D5DB',
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(243, 159, 41, 0.3)',
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#F39F29',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'white',
    marginTop: 2,
  },
  detailButton: {
    backgroundColor: '#FDCB41',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
  },
  detailButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FleetCard;