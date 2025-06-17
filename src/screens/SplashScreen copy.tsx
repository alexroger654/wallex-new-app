import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Color} from '../GlobalStyles';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

export default function SplashScreen() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#1E1E1E',
        }}>
        <View
          style={{
            flex: 1,
            marginTop: 180,
          }}>
          <Image
            style={{
              width: '100%',
              height: 375,
              borderRadius: 25,
            }}
            source={require('../../assets/splash/splash1.png')}
          />

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
              paddingBottom: 14,
              paddingRight: 16,
            }}>
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 24,
              }}>
              <Text
                style={{
                  color: Color.white,
                  fontSize: 24,
                  fontWeight: 600,
                  lineHeight: 30,
                }}>
                Take Charge of Your Finances With{' '}
                <Text
                  style={{
                    color: Color.colorGold,
                  }}>
                  Our Student Debit Solutions
                </Text>
              </Text>
              <Text
                style={{
                  color: Color.white,
                  fontSize: 16,
                }}>
                From food to fashion, travel to tech, our student card brings
                you unbeatable discounts on all your favorites.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: Color.colorGold,
                height: 62,
                width: 70,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
              }}>
              <ChevronRightIcon color="black" size={36} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
