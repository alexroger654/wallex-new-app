import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import {FaceFrownIcon} from 'react-native-heroicons/solid';

const AboutMeScreen = ({navigation}: any) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity>
            <ChevronLeftIcon size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.headerText,
            {
              color: Color.secondaryColors600,
            },
          ]}>
          About me
        </Text>
        <View></View>
      </View>

      <View
        style={{
          paddingHorizontal: 16,
        }}>
        {/* Campaign Summary Section */}
        <View style={styles.campaignSummary}>
          <View style={styles.campaignItem}>
            <Text style={styles.campaignCount}>T</Text>
            <Text style={styles.campaignLabel}>Total Campaigns</Text>
          </View>
          <View style={styles.campaignItem}>
            <Text style={styles.campaignCount}>5</Text>
            <Text style={styles.campaignLabel}>Active Campaigns</Text>
          </View>
          <View style={styles.campaignItem}>
            <Text style={styles.campaignCount}>19</Text>
            <Text style={styles.campaignLabel}>Completed</Text>
          </View>
        </View>

        {/* View Earnings Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentsScreen')}
          style={styles.earningsButton}>
          <Text style={styles.earningsButtonText}>View Your Earnings</Text>
        </TouchableOpacity>

        {/* WhatsApp Number Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Whatsapp Number*</Text>
          <TextInput
            style={styles.input}
            placeholder="Whatsapp Number"
            placeholderTextColor="#B0B0B0"
          />
          <Text style={styles.helperText}>
            Lorem ipsum dolor sit amet consectetur. Laoreet turpis elit ac.
          </Text>
          <Text
            style={[
              styles.inputLabel,
              {
                marginTop: 20,
              },
            ]}>
            Your Category*
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Whatsapp Number"
            placeholderTextColor="#B0B0B0"
          />
          <Text style={styles.helperText}>
            Lorem ipsum dolor sit amet consectetur. Laoreet turpis elit ac.
          </Text>
        </View>

        {/* Socials Section */}
        <View style={styles.socialsSection}>
          <Text style={styles.inputLabel}>Your Socials</Text>
          <TouchableOpacity style={styles.socialItem}>
            <Image
              source={{
                uri: 'https://z-m-static.xx.fbcdn.net/rsrc.php/v4/yD/r/5D8s-GsHJlJ.png',
              }}
              style={{
                height: 30,
                width: 30,
                marginRight: 8,
              }}
            />
            <Text style={styles.socialText}>
              Connect Instagram Via Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialItem}>
            <Image
              source={{
                uri: 'https://z-m-static.xx.fbcdn.net/rsrc.php/v4/yD/r/5D8s-GsHJlJ.png',
              }}
              style={{
                height: 30,
                width: 30,
                marginRight: 8,
              }}
            />
            <Text style={styles.socialText}>
              Connect Instagram Via Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    // paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 28,
    backgroundColor: Color.white,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  campaignSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  campaignItem: {
    alignItems: 'center',
  },
  campaignCount: {
    fontSize: 24,
    fontWeight: '900',
    color: Color.secondaryColors700,
  },
  campaignLabel: {
    fontSize: 14,
    color: '#666',
  },
  earningsButton: {
    backgroundColor: Color.primaryBlue100,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: -14,
  },
  earningsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.primaryBlue100,
    marginBottom: 12,
  },
  input: {
    backgroundColor: Color.secondaryColors100,
    borderRadius: 8,
    padding: 12,
    color: '#333',
    fontSize: 14,
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
  },
  socialsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  socialItem: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 0.1,
    borderRightColor: Color.secondaryColors100,
    marginVertical: 10,
  },
  socialText: {
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#1D4ED8',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AboutMeScreen;
