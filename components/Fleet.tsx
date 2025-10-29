import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import FleetCard from './FleetCard';

const { width } = Dimensions.get('window');

const fleetData = [
  {
    image: "https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/4a40/1fca/6bac06224212cd0f6aecc5b0fb7616b9?Expires=1762128000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bTpcjiYgLMzDV0wovhlOuPEmKByph0GRblAvPHxrvnF~mCaGhjyEO1A8jodMFKPnVBl1EvqVChuS5eQsyCM2TQJgFOjpT-KNYHmUDT7CpnANFyioCdl9~vYKbI2zuXhN1Bfy1auGYbmMeS96SbNWOMhknSl1-CDoHUzlFJAW9Pn6XPPjUEiTP6Ak3nGpQs~aJjJ1qUHdEm4AoBYDR~tdYNEew0VVoiLG0rfsf11GWPJ7tIaJ5KZZHYqIuYgev9b9z6CttxLYh0IdOOwGD2qKKkpjTeVNTx-ryZvowsBcZTuoKH-f~4diZ7dsFisDEYmVuLOHD7NOh0TIs8RDRQHxfg__",
    name: "Excavator",
    category: "Penggalian & Perataan",
    features: [
      "Kapasitas bucket 0.5-2.0 m³",
      "Asuransi & maintenance included",
      "Siap operasional 24 jam",
    ],
    price: "Mulai 2.5JT/ hari",
  },
  {
    image: "https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/237a/aa05/3e3a9c53dee4f3fc757e2217f4b3119f?Expires=1762128000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=U1G3ESm0VDa9acIxkuM92iGY4rlgu4kRm33mPqMsni9QPSjHVD8THlZRaL2~SMxI-2Dd9O3qCFrMpLBlpU-DHTEd1IjmVM2AyQq1fGaZX690tOy5u9VssPFFbNhtpDQGAq98Q7PKZ6WPq25ETz1-hOShu~JikIvow-UWWVav0BurVCAtHTDdFljdvVaOFlYuus8fBGTYyrQ2WRFfuy~xxxQd4RMzUZEY2tnCX5lpmR9En7dgWLjKYCyOtpGTWGI6swKk0aNiE-2Q9~ofn1d43p7sbJb9ngXEtPrfUu1VViUrOnL~aE~9clk6o69rCMiS0MW3vaLYl2EVfRqNkUX5Ow__",
    name: "Bulldozer",
    category: "Perataan Tanah",
    features: [
      "Kekuatan dorong superior",
      "Asuransi & maintenance included",
      "Siap operasional 24 jam",
    ],
    price: "Mulai 3JT/ hari",
  },
  {
    image: "https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/9147/1aad/9fc5c67e34f77fb896bf210f0eb1db9e?Expires=1762128000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qsCmo-vUQArjY71Um1E-ly~Gisu7ZhWPcm2w8RGjG9TnqvVVOoIn0MHWiiyc87~QnkKOCqQojqwUEihB10QIiEfihsCQRhAjnxrOi5Akys7WlaAqs9zt-51wUzKsMEinWcCURftO6KY4RSfTpOMQJNj-CPN7Yac-CJ6hPEmrW7tcbrDw9rEaZ2UFUarpVMb3sjJdNpeN5eExntI3goco8i2~9gos7-WMNYvK7Wl8nexyuLoduIVNhjQDlh0uNNc8nICKOsMUH5qaClt-OOeU0sgKg-1Qh7QnQse2c6urWoTOB0OknhkIHa7CpZB8l4wDy0fUKP4379NkWPD~M6NcHQ__",
    name: "Dump Truck",
    category: "Pengangkutan Material",
    features: [
      "Kapasitas angkut besar",
      "Asuransi & maintenance included",
      "Siap operasional 24 jam",
    ],
    price: "Mulai 2JT/ hari",
  },
];

const Fleet: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Armada Kami</Text>
        </View>
        <Text style={styles.title}>Pilihan Alat Berat Untuk Anda</Text>
        <Text style={styles.description}>
          Dari excavator hingga tower crane, kami menyediakan berbagai jenis alat berat dengan kondisi prima untuk mendukung kesuksesan proyek konstruksi Anda.
        </Text>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.fleetScroll}
          contentContainerStyle={styles.fleetContainer}
        >
          {fleetData.map((item, index) => (
            <FleetCard key={index} {...item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 80,
    minHeight: 800,
  },
  content: {
    paddingHorizontal: 24,
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
    fontWeight: 'bold',
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
  fleetScroll: {
    marginHorizontal: -8,
  },
  fleetContainer: {
    gap: 24,
    paddingHorizontal: 8,
  },
});

export default Fleet;