import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import {useAuth} from '../../context/AuthContext';
import {useTheme} from '../../context/ThemeProvider';
import Loading from '../../component/Loading';
import {Color} from '../../GlobalStyles';
import PaymentModal2 from '../../component/PaymentModal2';
import {useNavigation} from '@react-navigation/native';

export default function ConfirmTopupPaymentScreen() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const {color} = useTheme();
  const navigation: any = useNavigation();

  //   =============== render
  return (
    <>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 16,
          backgroundColor: color.lightGray,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={22} color={Color.primaryBlue100} />
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: color.lightGray,
          paddingHorizontal: 20,
          paddingTop: 50,
          alignItems: 'center',
          width: '100%',
        }}>
        {/* Title */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: color.primaryBlue100,
            textAlign: 'center',
            marginBottom: 8,
          }}>
          Add money to your wallet
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: 14,
            color: color.primaryBlue80,
            textAlign: 'center',
            marginBottom: 30,
          }}>
          Top up your wallet in a snap
        </Text>
        {/* {error ? (
          <>
            <Text
              style={{
                fontSize: 14,
                color: 'red',
                textAlign: 'center',
                marginBottom: 30,
              }}>
              {error}
            </Text>
          </>
        ) : (
          <></>
        )} */}

        <View
          style={{
            backgroundColor: color.white,
            width: '100%',
            padding: 14,
            borderRadius: 16,
            marginTop: 40,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: color.primaryBlue100,
              fontWeight: '600',
            }}>
            Confirm Payment
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: Color.secondaryColors500,
              marginBottom: 14,
              fontWeight: '500',
            }}>
            Choose the payment method
          </Text>
          {/* Input Container */}
          <Text
            style={{
              fontSize: 40,
              color: Color.secondaryColors500,
              fontWeight: '800',
            }}>
            ₹ 1000
          </Text>
        </View>
      </View>

      {/* Submit Button */}
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingBottom: 20,
          // backgroundColor: 'red',
        }}>
        <Text style={styles.title}>Choose Payment Method</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            setIsModalVisible(true);
            console.log('ooooooooooooo');
          }}>
          <Text style={styles.optionText}>Topup Using IMPS/NEFT</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Image
              style={{
                width: 25,
                borderRadius: 14,
                height: 25,
                backgroundColor: 'white',
              }}
              source={{
                uri: 'https://w7.pngwing.com/pngs/173/994/png-transparent-paytm-social-icons-color-icon.png',
              }}
            />
            <Image
              style={{
                width: 25,
                borderRadius: 14,
                height: 25,
                backgroundColor: 'white',
              }}
              source={{
                uri: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202105/Google-Pay-hero_1.jpg',
              }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('TopUpOtpScreen')}
          style={styles.optionButton}>
          <Text style={styles.optionText}>Topup using UPI</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Image
              style={{
                width: 25,
                borderRadius: 14,
                height: 25,
                backgroundColor: 'white',
              }}
              source={{
                uri: 'https://w7.pngwing.com/pngs/173/994/png-transparent-paytm-social-icons-color-icon.png',
              }}
            />
            <Image
              style={{
                width: 25,
                borderRadius: 14,
                height: 25,
                backgroundColor: 'white',
              }}
              source={{
                uri: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202105/Google-Pay-hero_1.jpg',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <PaymentModal2
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'transparent',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    color: Color.primaryBlue100,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    backgroundColor: Color.secondaryColors200,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: Color.primaryBlue100,
    fontWeight: 'bold',
  },
});
