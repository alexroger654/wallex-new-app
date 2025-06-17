import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Border, Color, FontFamily, FontSize, Padding } from '../GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ArrowDownOnSquareIcon,
  ArrowsRightLeftIcon,
  ArrowUpOnSquareIcon,
  CreditCardIcon,
} from 'react-native-heroicons/outline';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import { ClipboardDocumentCheckIcon } from 'react-native-heroicons/solid';

export default function HomeScreen2({ navigation }: any) {
  const { user } = useAuth();

  console.log(JSON.stringify(user), "  PENDING=    6666   ======================  |||||||||||||||||||||||||||||||");

  // ================ render

  return (
    <>
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      /> */}
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: 'transparent',
            paddingVertical: 14,
            paddingHorizontal: 14,
            marginBottom: 20,
            marginTop: 20,
          }}>
          <View>
            <Text
              style={{
                color: Color.white,
                fontWeight: '900',
                fontSize: 24,
              }}>
              Hi {user?.full_name},
            </Text>
            <Text
              style={{
                color: Color.white,
                fontSize: 16,
              }}>
              What’s your plan today?
            </Text>
          </View>
          <Pressable onPress={() => navigation?.navigate('MyAccountScreen')}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
              source={{
                uri:
                  user?.profile_picture ||
                  'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg',
              }}
            />
          </Pressable>
        </View>
        {user?.ac_status === 'activated' || user?.status === 'ACTIVATED' ? (
          <View style={[styles.topCard, { padding: 10 }]}>
            <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
              <Text style={styles.title}>Banking Services</Text>
            </View>

            <View style={styles?.featuresContainer}>
              <Pressable
                onPress={() => navigation?.navigate('TopUpScreens')}
                style={styles?.featureItem}>
                <CreditCardIcon size={22} color={Color.primaryBlue100} />
                <Text style={styles?.cardTitle}>Top Up</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation?.navigate('SelectContactScreen')}
                style={styles?.featureItem}>
                <ArrowUpOnSquareIcon size={22} color={Color.primaryBlue100} />
                <Text style={styles?.cardTitle}>Send</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation?.navigate('TransactionScreen')}
                style={styles?.featureItem}>
                <ArrowsRightLeftIcon size={22} color={Color.primaryBlue100} />
                <Text style={styles?.cardTitle}>Transaction</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation?.navigate('CardDetailsScreen')}
                style={styles?.featureItem}>
                <CreditCardIcon size={22} color={Color.primaryBlue100} />
                <Text style={styles?.cardTitle}>Card</Text>
              </Pressable>
            </View>
          </View>
        ) : user?.ac_status == 'verifying' || user?.status === 'PENDING' ? (
          <View style={[styles.topCard, { marginBottom: 12 }]}>
            <Image
              style={styles.logo}
              resizeMode="cover"
              source={require('../../assets/images/logo.png')}
            />
            <Text style={styles.title}>Membership Application Pending</Text>
            <View style={styles.flexBetween}>
              <View style={{ width: '70%' }}>
                <Text style={styles.subTitle}>
                  Your application is under review. We’ll notify you once it’s approved.
                  Thank you for your patience!
                </Text>
              </View>
              <Text
                // onPress={() => navigation?.navigate('UpdateNameAndAgeScreen')}
                style={styles.button}>
                In Review
              </Text>
            </View>
          </View>
        ) :
          user?.ac_status == 'inactive' ?
            (
              <View style={[styles.topCard, { marginBottom: 12 }]}>
                <Image
                  style={styles.logo}
                  resizeMode="cover"
                  source={require('../../assets/images/logo.png')}
                />
                <Text style={styles.title}>Apply For Membership</Text>
                <View style={styles.flexBetween}>
                  <View style={{ width: '70%' }}>
                    <Text style={styles.subTitle}>
                      You’re missing membership benefits. Join today to enjoy maximum savings!
                    </Text>
                  </View>
                  <Text
                    onPress={() => navigation?.navigate('UpdateNameAndAgeScreen')}
                    style={styles.button}>
                    Apply
                  </Text>
                </View>
              </View>
            ) :
            <></>

        }

        <Pressable
          onPress={() => navigation.navigate('GiftCardHomeScreen')}
          style={[styles.flexBetween, { gap: 10, marginTop: 14 }]}>
          <View style={[styles?.smallCard]}>
            <Text style={styles.title}>OFFERS</Text>
            <Text style={styles.subTitle}>FESTIVE DELIGHTS</Text>
            {/* <Text style={styles.heighLightTitle}>FLAT ₹150 OFF</Text> */}
            <Image
              style={[styles.cardImage, {}]}
              source={require('../../assets/home/offer.png')}
            />
          </View>
          <Pressable
            onPress={() => navigation.navigate('DigiGoldHomeScreen')}
            style={styles?.smallCard}>
            <Text style={styles.title}>DIGI GOLD</Text>
            <Text style={styles.subTitle}>FESTIVE DELIGHTS</Text>
            {/* <Text style={styles.heighLightTitle}>FLAT ₹150 OFF</Text> */}
            <Image
              style={styles.cardImage}
              source={require('../../assets/home/digigold.png')}
            />
          </Pressable>
        </Pressable>

        <View style={[styles.flexBetween, { gap: 6, marginTop: 14 }]}>
          <Pressable
            onPress={() => navigation.navigate('HotelHomeScreen')}
            style={[
              styles?.smallCard,
              {
                // backgroundColor: 'red',
              },
            ]}>
            <Text style={styles.title}>HOTEL BOOKING</Text>
            <Text style={styles.subTitle}>FESTIVE DELIGHTS</Text>
            {/* <Text style={styles.heighLightTitle}>FLAT ₹150 OFF</Text> */}
            <Image
              style={styles.cardImage}
              source={require('../../assets/home/hotel.png')}
            />
          </Pressable>
          <View
            style={[
              {
                width: '49%',
                overflow: 'hidden',
                height: '100%',
                gap: 10,
              },
            ]}>
            <Pressable
              onPress={() => navigation.navigate('FlightBookingHome')}
              style={{
                backgroundColor: Color.white,
                width: '100%',
                paddingHorizontal: 20,
                paddingTop: 20,
                borderRadius: 20,
                overflow: 'hidden',
                height: 80,
              }}>
              <Text style={styles.title}>FLIGHT BOOKING</Text>
              {/* <Text style={styles.subTitle}>FESTIVE DELIGHTS</Text> */}
              <Image
                style={{
                  position: 'absolute',
                  right: -4,
                  bottom: -5,
                  height: 50,
                  width: 50,
                }}
                source={require('../../assets/home/fight.png')}
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('BillPaymentHomeScreen')}
              style={{
                backgroundColor: Color.white,
                width: '100%',
                paddingHorizontal: 20,
                paddingTop: 20,
                borderRadius: 20,
                overflow: 'hidden',
                height: 80,
              }}>
              <Text style={styles.title}>BILL</Text>
              <Text style={styles.title}>PAYMENT</Text>
              {/* <Text style={styles.subTitle}>FESTIVE DELIGHTS</Text> */}
              <Image
                style={{
                  position: 'absolute',
                  right: -4,
                  bottom: -5,
                  height: 50,
                  width: 50,
                }}
                source={require('../../assets/home/billPayment.png')}
              />
            </Pressable>
          </View>
        </View>
        <View style={[styles.flexBetween, { gap: 10, marginTop: 14 }]}></View>
        <Pressable onPress={() => navigation.navigate('CardScreen')}>
          <Image
            style={{
              width: '100%',
              borderRadius: 14,
              marginTop: 20,
            }}
            source={require('../../assets/home/card.png')}
          />
        </Pressable>

        <Footer />
        <View
          style={{
            paddingBottom: 100,
          }}></View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.darkBackground100,
    padding: 20,
  },
  topCard: {
    backgroundColor: Color.white,
    width: '100%',
    padding: 20,
    borderRadius: 20,
    position: 'relative',
  },
  logo: {
    width: 86,
  },
  title: {
    fontSize: FontSize.size_base,
    fontWeight: '700',
    color: Color.primaryBlue100,
  },
  subTitle: {
    fontSize: FontSize.size_xs,
    fontWeight: '500',
    color: Color.primaryBlue20,
    textAlign: 'justify',
    marginRight: 8,
  },
  heighLightTitle: {
    fontSize: FontSize.size_xs,
    fontWeight: '500',
    color: Color.colorOrange,
  },
  flexBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: Color.white,
    backgroundColor: Color.primaryBlue100,
    borderRadius: 12,
  },
  smallCard: {
    backgroundColor: Color.white,
    width: '49%',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    height: '100%',
  },
  cardImage: {
    borderRadius: 20,
    marginTop: 20,
    height: 80,
    alignSelf: 'flex-end',
  },
  featuresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    elevation: 5,
    paddingHorizontal: 20,
    width: '100%',
  },
  featureItem: {
    backgroundColor: Color.secondaryColors100,
    height: 60,
    width: 60,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  cardTitle: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    color: Color?.primaryBlue100,
    fontSize: 8,
  },
  qrCodeScannerIcon: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  scanAndPay: {
    fontSize: FontSize.size_base,
    textAlign: 'center',
    color: Color.white,
  },
  qrCodeScannerParent: {
    marginLeft: -102,
    top: 699,
    left: '50%',
    shadowColor: 'rgba(29, 171, 135, 0.2)',
    shadowRadius: 25,
    elevation: 25,
    paddingHorizontal: 30,
    paddingVertical: Padding.p_mini,
    borderRadius: Border.br_181xl,
    backgroundColor: Color.primaryGreen100,
    shadowOpacity: 1,
    gap: 10,
    flexDirection: 'row',
    position: 'absolute',
  },
});
