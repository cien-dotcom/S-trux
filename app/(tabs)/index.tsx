import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  useColorScheme,
  Animated,
} from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [menuOpen, setMenuOpen] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [activeSection, setActiveSection] = useState('Beranda');

  // Refs untuk scroll ke section
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = {
    Beranda: useRef<View>(null),
    'Alat Berat': useRef<View>(null),
    Keunggulan: useRef<View>(null),
    Kontak: useRef<View>(null),
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const { width } = dimensions;
  const isTablet = width >= 768;
  const isMobile = width < 768;

  const menuItems = ['Beranda', 'Alat Berat', 'Keunggulan', 'Kontak'];

  const handleMenuClick = (item: string) => {
    setActiveSection(item);
    setMenuOpen(false);

    // Scroll ke section yang dipilih
    const sectionRef = sectionRefs[item as keyof typeof sectionRefs];
    if (sectionRef && sectionRef.current) {
      sectionRef.current.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 70, animated: true });
        },
        () => console.log('Failed to measure')
      );
    }
  };

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        {/* HEADER */}
        <View style={[styles.header, {
          backgroundColor: isDark ? '#000' : '#fff',
          borderBottomColor: isDark ? '#333' : '#E5E7EB'
        }]}>
          <View style={[styles.headerContent, { maxWidth: isTablet ? 1200 : '100%' }]}>
            <View style={styles.logo}>
              <View style={styles.logoBox}>
                <Text style={styles.logoText}>ST</Text>
              </View>
              <Text style={[styles.brandName, { color: isDark ? '#fff' : '#000' }]}>S'Trux</Text>
            </View>

            {/* Desktop Navigation */}
            {isTablet && (
              <View style={styles.desktopNav}>
                {menuItems.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.navItem}
                    onPress={() => handleMenuClick(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.navText,
                      { color: isDark ? '#fff' : '#000' },
                      activeSection === item && styles.navTextActive
                    ]}>
                      {item}
                    </Text>
                    {activeSection === item && (
                      <View style={[styles.navIndicator, { backgroundColor: '#FCD34D' }]} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Header Right */}
            <View style={styles.headerRight}>
              <TouchableOpacity style={[styles.loginButton, {
                backgroundColor: isDark ? '#333' : '#FCD34D'
              }]}>
                <Text style={[styles.loginText, { color: isDark ? '#fff' : '#000' }]}>Login</Text>
              </TouchableOpacity>

              {isMobile && (
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => setMenuOpen(!menuOpen)}>
                  <Ionicons
                    name={menuOpen ? 'close' : 'menu'}
                    size={24}
                    color={isDark ? '#fff' : '#000'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Mobile Menu */}
          {menuOpen && isMobile && (
            <View style={[styles.mobileMenu, {
              backgroundColor: isDark ? '#1F1F1F' : '#F3F4F6',
              borderTopColor: isDark ? '#333' : '#E5E7EB'
            }]}>
              {menuItems.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.mobileMenuItem, {
                    borderBottomColor: isDark ? '#333' : '#E5E7EB',
                    backgroundColor: activeSection === item ? (isDark ? '#333' : '#E5E7EB') : 'transparent'
                  }]}
                  onPress={() => handleMenuClick(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.mobileMenuText,
                    { color: isDark ? '#fff' : '#000' },
                    activeSection === item && { fontWeight: '700', color: '#FCD34D' }
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* MAIN CONTENT */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
        >
          {/* HERO SECTION - Beranda */}
          <View
            ref={sectionRefs.Beranda}
            style={[styles.hero, { height: isTablet ? 700 : 500 }]}
          >
            <Image
              source={require('../../assets/images/HOME.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay} />

            <View style={[styles.heroContent, {
              maxWidth: isTablet ? 1200 : '100%',
              paddingHorizontal: isTablet ? 60 : 20,
            }]}>
              <View style={styles.heroTextContainer}>
                <Text style={[styles.heroTitle, {
                  fontSize: isTablet ? 56 : 28,
                  lineHeight: isTablet ? 68 : 36,
                }]}>
                  SOLUSI PENYEWAAN{'\n'}
                  <Text style={styles.heroTitleYellow}>ALAT BERAT PREMIUM</Text>
                  {'\n'}UNTUK PROYEK ANDA
                </Text>

                <Text style={[styles.heroSubtitle, {
                  fontSize: isTablet ? 18 : 14,
                  maxWidth: isTablet ? 600 : '100%',
                }]}>
                  Tingkatkan produktivitas proyek konstruksi Anda dengan armada alat berat modern kami.
                  Kualitas terjamin, harga kompetitif, dan layanan 24/7.
                </Text>

                <View style={[styles.heroButtons, {
                  flexDirection: isTablet ? 'row' : 'column',
                  width: isTablet ? 'auto' : '100%',
                }]}>
                  <TouchableOpacity style={[styles.primaryButton, {
                    width: isTablet ? 'auto' : '100%',
                  }]}>
                    <Text style={styles.primaryButtonText}>Mulai Sewa</Text>
                    <Ionicons name="search" size={18} color="#000" />
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.secondaryButton, {
                    width: isTablet ? 'auto' : '100%',
                  }]}>
                    <Text style={styles.secondaryButtonText}>Jelajahi</Text>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.stats, {
                flexDirection: isTablet ? 'row' : 'row',
                justifyContent: isTablet ? 'flex-start' : 'space-around',
                gap: isTablet ? 60 : 20,
              }]}>
                {[
                  { num: '30+', label: 'UNIT TERSEDIA' },
                  { num: '24/7', label: 'SUPPORT' },
                  { num: '100+', label: 'PROYEK SELESAI' },
                ].map((stat, i) => (
                  <View key={i} style={styles.statItem}>
                    <Text style={[styles.statNumber, {
                      fontSize: isTablet ? 32 : 20
                    }]}>{stat.num}</Text>
                    <Text style={[styles.statLabel, {
                      fontSize: isTablet ? 14 : 10
                    }]}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* ARMADA SECTION - Alat Berat */}
          <View
            ref={sectionRefs['Alat Berat']}
            style={[styles.section, {
              backgroundColor: isDark ? '#0F0F0F' : '#F9FAFB',
              paddingHorizontal: isTablet ? 60 : 20,
            }]}
          >
            <View style={[styles.sectionInner, { maxWidth: isTablet ? 1200 : '100%' }]}>
              <View style={styles.sectionHeader}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Armada Kami</Text>
                </View>

                <Text style={[styles.sectionTitle, {
                  fontSize: isTablet ? 42 : 28,
                  color: isDark ? '#fff' : '#000',
                }]}>
                  Pilihan <Text style={styles.yellowText}>Alat Berat</Text> Untuk Anda
                </Text>

                <Text style={[styles.sectionSubtitle, {
                  fontSize: isTablet ? 18 : 14,
                  color: isDark ? '#9CA3AF' : '#6B7280',
                }]}>
                  Dari excavator hingga dump truck, kami menyediakan berbagai jenis alat berat
                </Text>
              </View>

              {/* Fleet Cards - Responsive Grid */}
              {isTablet ? (
                <View style={styles.fleetGrid}>
                  {[
                    {
                      name: 'Excavator',
                      category: 'Penggalian & Perataan',
                      img: require('../../assets/images/EXCAVATOR.png'),
                    },
                    {
                      name: 'Bulldozer',
                      category: 'Pekerjaan Tanah',
                      img: require('../../assets/images/BULLDOZER.png'),
                    },
                    {
                      name: 'Dump Truck',
                      category: 'Transportasi Material',
                      img: require('../../assets/images/DUMP-TRUCK.png'),
                    },
                  ].map((item, i) => (
                    <View key={i} style={[styles.fleetCard, {
                      backgroundColor: isDark ? '#1F1F1F' : '#fff'
                    }]}>
                      <View style={styles.fleetImageContainer}>
                        <Image source={item.img} style={styles.fleetImage} resizeMode="cover" />
                        <View style={styles.fleetBadge}>
                          <Text style={styles.fleetBadgeText}>Tersedia</Text>
                        </View>
                      </View>

                      <View style={styles.fleetInfo}>
                        <Text style={[styles.fleetName, { color: isDark ? '#fff' : '#000' }]}>
                          {item.name}
                        </Text>
                        <Text style={[styles.fleetCategory, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                          {item.category}
                        </Text>

                        <View style={styles.fleetFeatures}>
                          <View style={styles.featureRow}>
                            <Ionicons name="resize" size={14} color="#9CA3AF" />
                            <Text style={[styles.featureText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                              Kapasitas bucket 0.5–6.2 m³
                            </Text>
                          </View>
                          <View style={styles.featureRow}>
                            <Ionicons name="shield-checkmark" size={14} color="#9CA3AF" />
                            <Text style={[styles.featureText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                              Asuransi & maintenance included
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.fleetScrollContent}
                >
                  {[
                    {
                      name: 'Excavator',
                      category: 'Penggalian & Perataan',
                      img: require('../../assets/images/EXCAVATOR.png'),
                    },
                    {
                      name: 'Bulldozer',
                      category: 'Pekerjaan Tanah',
                      img: require('../../assets/images/BULLDOZER.png'),
                    },
                    {
                      name: 'Dump Truck',
                      category: 'Transportasi Material',
                      img: require('../../assets/images/DUMP-TRUCK.png'),
                    },
                  ].map((item, i) => (
                    <View key={i} style={[styles.fleetCard, {
                      backgroundColor: isDark ? '#1F1F1F' : '#fff',
                      width: 280,
                      marginRight: 16,
                    }]}>
                      <View style={styles.fleetImageContainer}>
                        <Image source={item.img} style={styles.fleetImage} resizeMode="cover" />
                        <View style={styles.fleetBadge}>
                          <Text style={styles.fleetBadgeText}>Tersedia</Text>
                        </View>
                      </View>

                      <View style={styles.fleetInfo}>
                        <Text style={[styles.fleetName, { color: isDark ? '#fff' : '#000' }]}>
                          {item.name}
                        </Text>
                        <Text style={[styles.fleetCategory, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                          {item.category}
                        </Text>

                        <View style={styles.fleetFeatures}>
                          <View style={styles.featureRow}>
                            <Ionicons name="resize" size={12} color="#9CA3AF" />
                            <Text style={[styles.featureText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                              Kapasitas bucket 0.5–6.2 m³
                            </Text>
                          </View>
                          <View style={styles.featureRow}>
                            <Ionicons name="shield-checkmark" size={12} color="#9CA3AF" />
                            <Text style={[styles.featureText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                              Asuransi & maintenance
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>

          {/* CTA SECTION - Keunggulan */}
          <View
            ref={sectionRefs.Keunggulan}
            style={[styles.ctaSection, {
              backgroundColor: isDark ? '#000' : '#fff',
              paddingHorizontal: isTablet ? 60 : 20,
            }]}
          >
            <View style={[styles.ctaInner, { maxWidth: isTablet ? 800 : '100%' }]}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Keunggulan Kami</Text>
              </View>

              <Text style={[styles.ctaTitle, {
                fontSize: isTablet ? 48 : 28,
                color: isDark ? '#fff' : '#000',
              }]}>
                Siap Memulai <Text style={styles.yellowText}>Proyek Anda?</Text>
              </Text>

              <Text style={[styles.ctaSubtitle, {
                fontSize: isTablet ? 18 : 14,
                color: isDark ? '#9CA3AF' : '#6B7280',
              }]}>
                Dapatkan konsultasi gratis dan penawaran terbaik untuk kebutuhan alat berat proyek Anda.
                Tim kami siap membantu 24/7.
              </Text>

              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Hubungi Kami</Text>
                <Ionicons name="call-outline" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* FOOTER - Kontak */}
          <View
            ref={sectionRefs.Kontak}
            style={[styles.footer, {
              backgroundColor: isDark ? '#0F0F0F' : '#F9FAFB',
              paddingHorizontal: isTablet ? 60 : 20,
            }]}
          >
            <View style={[styles.footerContent, {
              maxWidth: isTablet ? 1200 : '100%',
              flexDirection: isTablet ? 'row' : 'column',
            }]}>
              <View style={[styles.footerBrand, { flex: isTablet ? 1 : undefined }]}>
                <View style={styles.logo}>
                  <View style={styles.logoBox}>
                    <Text style={styles.logoText}>ST</Text>
                  </View>
                  <Text style={[styles.brandName, { color: isDark ? '#fff' : '#000' }]}>S'Trux</Text>
                </View>

                <Text style={[styles.footerDescription, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                  Solusi penyewaan alat berat terpercaya untuk mendukung kesuksesan proyek Anda.
                </Text>

                <View style={styles.socialIcons}>
                  {[
                    { name: 'logo-facebook', key: 'fb' },
                    { name: 'logo-instagram', key: 'ig' }
                  ].map((icon) => (
                    <TouchableOpacity
                      key={icon.key}
                      style={[styles.socialIcon, {
                        backgroundColor: isDark ? '#333' : 'rgba(0,0,0,0.05)'
                      }]}>
                      <Ionicons name={icon.name as any} size={20} color={isDark ? '#fff' : '#000'} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={[styles.footerContact, { flex: isTablet ? 1 : undefined }]}>
                <Text style={[styles.footerTitle, { color: isDark ? '#fff' : '#000' }]}>Kontak</Text>

                <View style={styles.contactItem}>
                  <Ionicons name="location" size={18} color="#FCD34D" />
                  <View>
                    <Text style={[styles.contactTextContent, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                      Jl. Industri Raya No.123
                    </Text>
                    <Text style={[styles.contactTextContent, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                      Jakarta Timur, DKI Jakarta
                    </Text>
                  </View>
                </View>

                <View style={styles.contactItem}>
                  <Ionicons name="mail" size={18} color="#FCD34D" />
                  <Text style={[styles.contactTextContent, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                    info@struxpro.co.id
                  </Text>
                </View>

                <View style={styles.contactItem}>
                  <Ionicons name="call" size={18} color="#FCD34D" />
                  <Text style={[styles.contactTextContent, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                    +62 81 1234 5678
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.footerBottom, {
              borderTopColor: isDark ? '#333' : '#E5E7EB',
              maxWidth: isTablet ? 1200 : '100%',
            }]}>
              <Text style={[styles.copyright, { color: isDark ? '#6B7280' : '#9CA3AF' }]}>
                © 2024 S'Trux. All rights reserved.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1000,
    position: 'relative',
  },
  headerContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBox: {
    width: 32,
    height: 32,
    backgroundColor: '#FCD34D',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  desktopNav: {
    flexDirection: 'row',
    gap: 32,
  },
  navItem: {
    paddingVertical: 8,
    position: 'relative',
  },
  navText: {
    fontSize: 16,
    fontWeight: '500',
  },
  navTextActive: {
    fontWeight: '700',
    color: '#FCD34D',
  },
  navIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuButton: {
    padding: 8,
  },
  mobileMenu: {
    marginTop: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  mobileMenuItem: {
    paddingVertical: 14,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
  },
  mobileMenuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  hero: {
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroContent: {
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 40,
    gap: 32,
  },
  heroTextContainer: {
    gap: 20,
  },
  heroTitle: {
    fontWeight: 'bold',
    color: '#fff',
  },
  heroTitleYellow: {
    color: '#FCD34D',
  },
  heroSubtitle: {
    color: '#fff',
    lineHeight: 24,
    opacity: 0.9,
  },
  heroButtons: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#FCD34D',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#333',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  stats: {
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    textTransform: 'uppercase',
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    paddingVertical: 80,
    alignItems: 'center',
  },
  sectionInner: {
    width: '100%',
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 48,
    gap: 16,
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#FCD34D',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  sectionTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 48,
  },
  yellowText: {
    color: '#FCD34D',
  },
  sectionSubtitle: {
    textAlign: 'center',
    maxWidth: 700,
    lineHeight: 24,
  },
  fleetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  fleetScrollContent: {
    paddingHorizontal: 0,
  },
  fleetCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    maxWidth: 360,
    flex: 1,
    minWidth: 280,
  },
  fleetImageContainer: {
    position: 'relative',
    height: 200,
  },
  fleetImage: {
    width: '100%',
    height: '100%',
  },
  fleetBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#10B981',
  },
  fleetBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  fleetInfo: {
    padding: 20,
    gap: 12,
  },
  fleetName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  fleetCategory: {
    fontSize: 14,
    opacity: 0.7,
  },
  fleetFeatures: {
    gap: 10,
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  ctaSection: {
    paddingVertical: 80,
    alignItems: 'center',
  },
  ctaInner: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  ctaTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 52,
  },
  ctaSubtitle: {
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  featuresGrid: {
    width: '100%',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  featureCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: 360,
    padding: 24,
    borderRadius: 16,
    gap: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsSection: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
    justifyContent: 'center',
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  statNum: {
    fontWeight: 'bold',
  },
  statLabelText: {
    textAlign: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#FCD34D',
  },
  ctaButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  footerContent: {
    width: '100%',
    gap: 40,
    marginBottom: 32,
  },
  footerBrand: {
    gap: 16,
  },
  footerDescription: {
    fontSize: 14,
    lineHeight: 22,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialIcon: {
    padding: 10,
    borderRadius: 10,
  },
  footerContact: {
    gap: 16,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  contactTextContent: {
    fontSize: 14,
    lineHeight: 22,
  },
  footerBottom: {
    borderTopWidth: 1,
    paddingTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
  },
});