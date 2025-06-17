import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {Color} from '../../GlobalStyles';
import {CogIcon} from 'react-native-heroicons/outline';

const MyReportScreen = ({navigation}: any) => {
  const [currentTab, setCurrentTab] = useState('New Collabs');

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Amazon Earn Per Conversion</Text>
      </View>

      {/* Campaign Banner */}
      <View style={styles.banner}>
        <Image
          source={require('../../../assets/report.png')} // Placeholder for the Amazon logo
          style={styles.bannerImage}
        />
        {/* <View>
          <Text style={styles.tagline}>#AmazonIndia</Text>
          <Text style={styles.earning}>Earn Upto ₹2L</Text>
        </View> */}
      </View>

      {/* Campaign Type */}
      <View style={styles.campaignTypeContainer}>
        <View style={styles.campaignMeta}>
          <View>
            <Text
              style={[
                styles.metaItem,
                {
                  color: Color.secondaryColors800,
                  fontWeight: '800',
                },
              ]}>
              Earn Per Conversion:
            </Text>
            <Text
              style={[
                styles.metaItem,
                {
                  color: Color.primaryGreen100,
                },
              ]}>
              ₹60/Conversion
            </Text>
          </View>
          <Pressable
            // onPress={() => navigation.navigate('CampaignDetails')}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#FFB8001A',
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#FF9900',
                fontWeight: '800',
              }}>
              Campaign In Progress
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Tabs */}
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Text
          onPress={() => setCurrentTab('New Collabs')}
          style={[
            styles.tabText,
            currentTab == 'New Collabs' ? styles.activeTab : {},
          ]}>
          Report
        </Text>
        <Text
          onPress={() => setCurrentTab('My Application')}
          style={[
            styles.tabText,
            currentTab == 'My Application' ? styles.activeTab : {},
          ]}>
          Campaign details
        </Text>
      </View>

      <View
        style={{
          padding: 16,
        }}>
        {/* Campaign Details Section */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Campaign Type</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <CogIcon size={40} color={Color.primaryGreen100} />
            <View>
              <Text style={styles.detailText}>Product Review</Text>
              <Text style={styles.subDetailText}>
                You are required to review a product
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <CogIcon size={40} color={Color.primaryGreen100} />
            <View>
              <Text style={styles.detailText}>Product Review</Text>
              <Text style={styles.subDetailText}>
                You are required to review a product
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <CogIcon size={40} color={Color.primaryGreen100} />
            <View>
              <Text style={styles.detailText}>Product Review</Text>
              <Text style={styles.subDetailText}>
                You are required to review a product
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.detailSection}>
          <Text
            style={{
              color: Color.secondaryColors700,
              fontWeight: '700',
              paddingVertical: 14,
              borderBottomWidth: 0.4,
              borderBottomColor: Color.secondaryColors300,
            }}>
            What are the deliverables
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 8,
              marginTop: 8,
            }}>
            <CogIcon size={40} color={Color.primaryGreen100} />
            <View>
              <Text style={styles.detailText}>Product Review</Text>
              <Text style={styles.subDetailText}>
                You are required to review a product
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <CogIcon size={40} color={Color.primaryGreen100} />
            <View>
              <Text style={styles.detailText}>Product Review</Text>
              <Text style={styles.subDetailText}>
                You are required to review a product
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <CogIcon size={40} color={Color.primaryGreen100} />
            <View>
              <Text style={styles.detailText}>Product Review</Text>
              <Text style={styles.subDetailText}>
                You are required to review a product
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.detailSection}>
          <Text
            style={{
              color: Color.secondaryColors700,
              fontWeight: '700',
              paddingVertical: 14,
              borderBottomWidth: 0.4,
              borderBottomColor: Color.secondaryColors300,
            }}>
            Product to Review
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 8,
              marginTop: 8,
            }}>
            <CogIcon size={40} color={Color.primaryGreen100} />
            <View>
              <Text style={styles.detailText}>Swiggy</Text>
              <Text
                style={[
                  styles.subDetailText,
                  {
                    color: 'blue',
                  },
                ]}>
                https://www.swiggy.com
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <CogIcon size={40} color={Color.primaryGreen100} />
            <View>
              <Text style={styles.detailText}>Product Review</Text>
              <Text style={styles.subDetailText}>
                You are required to review a product
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <CogIcon size={40} color={Color.primaryGreen100} />
            <View>
              <Text style={styles.detailText}>Product Review</Text>
              <Text style={styles.subDetailText}>
                You are required to review a product
              </Text>
            </View>
          </View>
        </View>
        {/* Deliverables */}
        {/* <View style={styles.collapsibleSection}>
          <Text style={styles.sectionTitle}>What are the deliverables</Text>
          <Text style={styles.detailText}>Story post</Text>
          <Text style={styles.subDetailText}>BGC • Duration: 15 sec</Text>
          <Text style={styles.subDetailText}>
            You are required to purchase all the product(s) from the
            above-mentioned links.
          </Text>
        </View> */}
        {/* Product to Review */}
        {/* <View style={styles.collapsibleSection}>
          <Text style={styles.sectionTitle}>Product to Review</Text>
          <Text style={styles.detailText}>Swiggy</Text>
          <Text style={styles.link}>https://www.swiggy.com</Text>
          <Text style={styles.subDetailText}>
            You will receive a reimbursement of ₹70 at the end of the campaign.
          </Text>
        </View> */}
        {/* Campaign Steps */}
        {/* <View style={styles.collapsibleSection}>
          <Text style={styles.sectionTitle}>Campaign Steps to Follow</Text>
          <View style={styles.steps}>
            <Text style={styles.stepItem}>1. Likes and comments</Text>
            <Text style={styles.stepItem}>
              2. Reshares by Micro and Macro creators
            </Text>
            <Text style={styles.stepItem}>3. LinkedIn Amplification</Text>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  backButton: {
    fontSize: 24,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  banner: {
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    position: 'relative',
    height: 200,
    justifyContent: 'flex-end',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  earning: {
    fontSize: 14,
    color: '#FFA500',
    fontWeight: '600',
  },
  campaignTypeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  campaignTypeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  campaignMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    fontSize: 14,
    color: '#333',
  },

  detailSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
    color: Color.secondaryColors300,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: Color.secondaryColors700,
  },
  subDetailText: {
    fontSize: 12,
    color: Color.secondaryColors400,
    marginBottom: 8,
  },
  collapsibleSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  link: {
    color: '#1D4ED8',
    fontSize: 14,
    marginVertical: 4,
  },
  steps: {
    paddingLeft: 8,
  },
  stepItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  tabText: {
    fontSize: 16,
    flex: 1,
    color: Color.secondaryColors400,
    paddingBottom: 6,
    textAlign: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 20,
  },
  activeTab: {
    color: Color.primaryBlue100,
    fontWeight: 'bold',
    borderBottomWidth: 4,
    borderBottomColor: Color.secondaryColors400,
    paddingBottom: 20,
  },
  sectionContainer: {
    padding: 16,
  },
});

export default MyReportScreen;
