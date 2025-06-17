import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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

const LoginScreen: React.FC = ({navigation, route}: any) => {
  const [amount, setAmount] = useState<string>('0');
  const [error, setError] = React.useState('');

  const data = route?.params?.data;

  console.log(data, '[[[[[[[[[[[[[[[[[[[[[[ ========== 00000000000000 *******');

  // ============== hooks ===================
  const {sendOtp, loading} = useAuth();
  const {color} = useTheme();

  if (loading) {
    return <Loading />;
  }

  //   =============== render
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity>
            <ChevronLeftIcon size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.headerText,
            {
              color: Color.primaryBlue100,
            },
          ]}>
          Choose Service
        </Text>
        <View></View>
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
          Add Money
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
              placeholder="Amount"
              keyboardType="number-pad"
              maxLength={10}
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('AdjustSplitScreen', {
                data: data,
                amount: amount,
              });
            }}
            style={{
              backgroundColor: amount.length > 0 ? '#001F54' : '#BCC6D6',
              paddingVertical: 15,
              borderRadius: 12,
              alignItems: 'center',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 3,
            }}>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default LoginScreen;
