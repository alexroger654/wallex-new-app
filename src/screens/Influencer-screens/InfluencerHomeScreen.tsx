import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Color} from '../../GlobalStyles';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import useGetData from '../../shared/fetch/useGetData';

const InfluencerHomeScreen = ({navigation}: any) => {
  const [brands, setBrands] = useState([]);
  const [currentTab, setCurrentTab] = useState('New Collabs');

  const getBrands = async () => {
    const result = await useGetData('split-bills', 'service');

    setBrands(result?.data);
  };

  useEffect(() => {
    getBrands();
  }, []);

  // =========================== render ==========================
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MagnifyingGlassIcon color={Color.secondaryColors300} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Campaigns"
            placeholderTextColor="#C4C4C4"
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate('AboutMeScreen')}
          style={{
            backgroundColor: Color.secondaryColors200,
            borderRadius: 20,
            height: 40,
            width: 40,
          }}></Pressable>
      </View>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Text
          onPress={() => setCurrentTab('New Collabs')}
          style={[
            styles.tabText,
            currentTab == 'New Collabs' ? styles.activeTab : {},
          ]}>
          New Collabs
        </Text>
        <Text
          onPress={() => setCurrentTab('My Application')}
          style={[
            styles.tabText,
            currentTab == 'My Application' ? styles.activeTab : {},
          ]}>
          My Application
        </Text>
      </View>
      {/* Accepted Applications */}
      {currentTab == 'My Application' ? (
        <>
          <Pressable style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Accepted Applications</Text>
              <Text style={styles.sectionSubtitle}>All Applications</Text>
            </View>
            {[...Array(5)].map((_, index) => (
              <Pressable
                onPress={() => navigation.navigate('MyReportScreen')}
                style={styles.applicationCard}
                key={index}>
                <Image
                  source={{uri: 'https://via.placeholder.com/40'}}
                  style={styles.brandLogo}
                />
                <View style={styles.applicationDetails}>
                  <Text style={styles.applicationTitle}>Amazon</Text>
                  <Text style={styles.applicationDate}>
                    Ends on April 30, 2024
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyReportScreen')}
                  style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </Pressable>
            ))}
          </Pressable>
        </>
      ) : (
        <></>
      )}
      {/* Brands For You */}
      <View style={styles.brandsContainer}>
        <Text style={styles.sectionTitle}>Brands For You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(5)].map((_, index) => (
            <Pressable
              onPress={() => navigation.navigate('BrandsScreen')}
              style={styles.brandCircle}
              key={index}>
              <Image
                source={{
                  uri: 'https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/17/full/1689574606-2001.png',
                }}
                style={styles.brandLogo}
              />
              <Text style={styles.brandName}>Brand {index + 1}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {/* Exclusive Invites */}
      <View style={styles.inviteCard}>
        <Image
          source={require('../../../assets/promotion1.png')}
          style={styles.inviteImage}
        />
        {/* <View style={styles.inviteDetails}>
          <Text style={styles.inviteTitle}>#AmazonIndia</Text>
          <Text style={styles.inviteSubtitle}>
            Performance Marketing Campaign
          </Text>
          <Text style={styles.inviteCTA}>
            Earn Per Conversion ₹60/Conversion
          </Text>
        </View> */}
      </View>
      {/* Eligible Collabs */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Eligible Collabs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(5)].map((_, index) => (
            <View style={styles.collabCard} key={index}>
              <Image
                source={{uri: 'https://via.placeholder.com/300x150'}}
                style={styles.collabImage}
              />
              <Text style={styles.collabTitle}>
                #NewLunchSpecial{index + 1}
              </Text>
              <Text style={styles.collabCTA}>Check Eligibility</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: Color.secondaryColors200,
    borderRadius: 1000,
    height: 52,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  searchInput: {
    padding: 12,
    fontSize: 16,
    color: '#000',

    // elevation: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#C4C4C4',
  },
  applicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  brandLogo: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  applicationDetails: {
    flex: 1,
    marginLeft: 12,
  },
  applicationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  applicationDate: {
    fontSize: 14,
    color: '#C4C4C4',
  },
  viewDetailsButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFB8001A',
    borderRadius: 20,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#FF9900',
  },
  brandsContainer: {
    padding: 16,
  },
  brandCircle: {
    alignItems: 'center',
    marginRight: 16,
  },
  brandName: {
    marginTop: 8,
    fontSize: 14,
    color: '#000',
  },
  inviteCard: {
    margin: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inviteImage: {
    width: '100%',
    height: 350,
    borderRadius: 16,
    // resizeMode: 'contain',
  },
  inviteDetails: {
    padding: 16,
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inviteSubtitle: {
    fontSize: 14,
    color: '#C4C4C4',
  },
  inviteCTA: {
    fontSize: 16,
    color: '#FF4500',
    marginTop: 8,
  },
  collabCard: {
    width: 250,
    marginRight: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  collabImage: {
    width: '100%',
    height: 150,
  },
  collabTitle: {
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  collabCTA: {
    padding: 8,
    fontSize: 14,
    color: '#FF4500',
  },
});

export default InfluencerHomeScreen;
