import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeProvider';
import Loading from '../../component/Loading';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [phone, setPhone] = useState<string>('1763943389');
  const [error, setError] = React.useState('');

  // ============== hooks ===================
  const { sendOtp, loading } = useAuth();
  const { color } = useTheme();

  const handleSendOtp = async () => {
    const result = await sendOtp(phone);

    if (result) {
      navigation?.navigate('OtpVerificationScreen', {
        mobile: phone,
      });
    } else {
      setError('Login failed. Please try again.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  //   =============== render
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
          backgroundColor: color.lightGray,
          paddingHorizontal: 20,
          paddingTop: 80,
          alignItems: 'center',
          width: '100%',
        }}>
        {/* Step Text */}
        {/* <Text style={{fontSize: 14, color: '#8A9CAD', marginBottom: 10}}>
        Step 1/2
      </Text> */}

        {/* Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: color.primaryBlue100,
            textAlign: 'center',
            marginBottom: 8,
          }}>
          Hi, Welcome To Wallex
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: 16,
            color: color.primaryBlue80,
            textAlign: 'center',
            marginBottom: 30,
          }}>
          Enter Your Mobile Number To Get Started Now!
        </Text>
        {error ? (
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
        )}

        <View
          style={{
            backgroundColor: color.white,
            width: '100%',
            padding: 14,
            borderRadius: 16,
          }}>
          {/* Input Container */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E4E7ED',
              paddingHorizontal: 15,
              width: '100%',
              height: 50,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: color.primaryBlue100,
                marginRight: 10,
              }}>
              +91
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                height: '58%',
                borderColor: color.gray20,
              }}></View>
            <TextInput
              style={{ flex: 1, fontSize: 16, color: color.primaryBlue100 }}
              placeholderTextColor={color.gray20}
              placeholder="00000 00000"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={{
              backgroundColor: phone.length === 10 ? '#001F54' : '#BCC6D6',
              paddingVertical: 15,
              borderRadius: 12,
              alignItems: 'center',
              width: '100%',
            }}
            onPress={handleSendOtp}
            disabled={phone.length !== 10}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
              Receive OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
