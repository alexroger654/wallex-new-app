import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Pressable} from 'react-native';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import {useTheme} from '../../../context/ThemeProvider';
import {Color} from '../../../GlobalStyles';

const EnterAmountScreen: React.FC = ({navigation}: any) => {
  const [phone, setPhone] = useState<string>('1763943389');
  const [error, setError] = React.useState('');

  // ============== hooks ===================

  const {color} = useTheme();

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
          Send Money
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: 14,
            color: color.primaryBlue80,
            textAlign: 'center',
            marginBottom: 30,
          }}>
          Send Money in a snap
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
            marginTop: 40,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: color.primaryBlue100,
              fontWeight: '500',
            }}>
            Set Amount
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: color.primaryBlue100,
              marginBottom: 14,
              fontWeight: '500',
            }}>
            How much would you like to top-up
          </Text>
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
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
                color: color.primaryBlue100,
                textAlign: 'center',
              }}
              placeholderTextColor={color.gray20}
              placeholder="00000 00000"
              keyboardType="phone-pad"
              maxLength={10}
              value={'1000'}
              onChangeText={setPhone}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('TopUpOtpScreen');
            }}
            style={{
              backgroundColor: phone.length === 10 ? '#001F54' : '#BCC6D6',
              paddingVertical: 15,
              borderRadius: 12,
              alignItems: 'center',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 3,
            }}
            disabled={phone.length !== 10}>
            <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'}}>
              Next
            </Text>
            <ChevronRightIcon color={'#fff'} size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default EnterAmountScreen;
