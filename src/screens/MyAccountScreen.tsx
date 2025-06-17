import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useAuth} from '../context/AuthContext';

const MyAccountScreen = ({navigation}: any) => {
  const {logout, user} = useAuth();

  console.log(user?.accessToken);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text
            style={[
              styles.backButtonText,
              {
                marginTop: 20,
              },
            ]}>
            <ChevronLeftIcon color={'white'} size={20} />
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            {
              marginTop: 20,
            },
          ]}>
          My Account
        </Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{uri: 'https://via.placeholder.com/100'}}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user?.full_name}</Text>
      </View>

      {/* Menu Section */}
      <ScrollView style={styles.menuContainer}>
        <Pressable
          onPress={() => navigation?.navigate('ProfileOverviewScreen')}>
          <MenuItem
            title="Account Info"
            icon="https://via.placeholder.com/20"
          />
        </Pressable>
        <Pressable onPress={() => navigation?.navigate('NotificationScreen')}>
          <MenuItem
            title="Notifications"
            icon="https://via.placeholder.com/20"
          />
        </Pressable>
        <Pressable onPress={() => navigation?.navigate('ReferAndEarnScreen')}>
          <MenuItem
            title="Refer And Earn"
            subtitle="Get 200rs Free!"
            icon="https://via.placeholder.com/20"
          />
        </Pressable>
        <Pressable onPress={() => navigation?.navigate('HelpSupportScreen')}>
          <MenuItem
            title="Help Center"
            subtitle="Get 200rs Free!"
            icon="https://via.placeholder.com/20"
          />
        </Pressable>

        <MenuItem title="Contacts" icon="https://via.placeholder.com/20" />
        <MenuItem title="About Us" icon="https://via.placeholder.com/20" />
        <MenuItem title="Help Center" icon="https://via.placeholder.com/20" />
        <MenuItem
          title="Terms And Conditions"
          icon="https://via.placeholder.com/20"
        />
        <MenuItem
          title="Privacy Policy"
          icon="https://via.placeholder.com/20"
        />

        <View style={{paddingBottom: 60}}>
          <Pressable
            onPress={logout}
            style={{
              width: '100%',
              backgroundColor: 'red',
              alignItems: 'center',
              paddingVertical: 20,
              borderRadius: 16,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '700',
              }}>
              Log Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem = ({title, subtitle, icon}: any) => {
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Image source={{uri: icon}} style={styles.menuIcon} />
        <View>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Text style={styles.menuArrow}>{'>'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    backgroundColor: '#1A2E63',
    height: 140,
    padding: 16,
    flexDirection: 'row',
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    // marginBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  menuContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  menuArrow: {
    fontSize: 18,
    color: '#888888',
  },
});

export default MyAccountScreen;
