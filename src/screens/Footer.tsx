import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

const Footer = () => {
  const navigation: any = useNavigation();

  // ================ render
  return (
    <View style={styles.container}>
      {/* Top row with icons and labels */}
      <View style={styles.topRow}>
        <Pressable
          onPress={() => navigation.navigate('SplitBillHomeScreen')}
          style={styles.iconContainer}>
          {/* Replace with your actual icon or Image component */}
          <Image
            source={require('../../assets/home/split_call.png')}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Split Payment</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('InfluencerHomeScreen')}
          style={styles.iconContainer}>
          <Image
            source={require('../../assets/home/Influencer.png')}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Influencer Earn Money</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => navigation.navigate('CreateInfluencerScreen')}
          style={styles.iconContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/50'}}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Influencer Earn Money</Text>
        </Pressable> */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/home/services.png')}
            style={styles.icon}
          />
          <Text style={styles.iconLabel}>Conscious Services</Text>
        </View>
      </View>

      {/* Main message section */}
      <View style={styles.messageContainer}>
        <Text style={styles.mainMessage}>Spend Wisely,</Text>
        <Text style={styles.subMessage}>Flourish!</Text>
        <Text style={styles.footerMessage}>
          Poured with Happiness and Peace!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 40,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  iconContainer: {
    alignItems: 'center',
    width: 100,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
    borderRadius: 16,
  },
  iconLabel: {
    color: '#FFF', // White text
    fontSize: 12,
    textAlign: 'center',
  },
  messageContainer: {
    // alignItems: 'center',
  },
  mainMessage: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
    textAlign: 'left',
  },
  subMessage: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
    textAlign: 'left',
    marginVertical: 8,
  },
  footerMessage: {
    color: '#FFF',
    fontSize: 16,
    // textAlign: 'center',
  },
});

export default Footer;
