import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {Color} from '../../GlobalStyles';

const TopUpReceiptScreen = ({navigation}: any) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F6F9FC',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: '700',
          color: Color.primaryBlue100,
          marginBottom: 16,
        }}>
        Receipt
      </Text>
      <View
        style={{
          width: '90%',
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          paddingVertical: 20,
          paddingHorizontal: 16,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}>
        {/* Top-Up Success Header */}

        {/* Icon */}
        <Image
          source={require('../../../assets/images/wallet.png')}
          style={{
            width: 63,
            height: 63,
            marginBottom: 16,
          }}
        />

        {/* Success Message */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            color: Color.primaryBlue100,
            marginBottom: 4,
          }}>
          Top Up Success
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Color.secondaryColors500,
            textAlign: 'center',
            marginBottom: 20,
          }}>
          Your Top Up Has Been Successfully Done
        </Text>

        {/* Total Topup Amount */}
        <View
          style={{
            width: '100%',
            backgroundColor: '#F2F7FF',
            borderRadius: 12,
            alignItems: 'center',
            paddingVertical: 16,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.secondaryColors400,
              marginBottom: 8,
            }}>
            Total Topup
          </Text>
          <Text
            style={{
              fontSize: 48,
              fontWeight: '900',
              color: Color.primaryBlue80,
            }}>
            ₹ 1000
          </Text>
        </View>

        {/* Payment Method */}
        <View
          style={{
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: Color.secondaryColors400,
              marginBottom: 8,
              textAlign: 'left',
            }}>
            Payment Method
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: '#F2F7FF',
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#1E1E1E',
            }}>
            UPI
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* Replace with your icons */}
            <Image
              source={require('../../../assets/images/paytm.png')}
              style={{
                width: 20,
                height: 20,
                marginLeft: 8,
              }}
            />
            <Image
              source={require('../../../assets/images/paytm.png')}
              style={{
                width: 20,
                height: 20,
                marginLeft: 8,
              }}
            />
          </View>
        </View>

        {/* Done Button */}
        <Pressable
          onPress={() => navigation?.navigate('HomeScreen')}
          style={{
            width: '100%',
            backgroundColor: Color.primaryBlue100,
            borderRadius: 12,
            alignItems: 'center',
            paddingVertical: 16,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#FFFFFF',
            }}>
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TopUpReceiptScreen;
