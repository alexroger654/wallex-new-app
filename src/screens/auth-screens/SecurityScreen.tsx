import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import OTP from 'react-native-otp-form';
import { Color } from '../../GlobalStyles';
import { useAuth } from '../../context/AuthContext';

const SecurityScreen = ({ navigation }: any) => {
  const [pin, setPin] = useState('');
  const correctPin = '1234';
  const { user } = useAuth();

  const handlePinAuth = () => {
    console.log('PIN entered:', pin);
    if (user?._id) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.navigate('SplashScreen');
    }
    setPin('');
    // if (pin === correctPin) {

    // } else {
    //   // Alert.alert('Incorrect PIN.', 'Please try again.');
    // }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.pinContainer}>
        <Text style={styles.text}>Enter your PIN To Continue</Text>
        <View style={{ marginBottom: 20, width: '100%' }}>
          <OTP
            codeCount={4}
            secureTextEntry={true}
            containerStyle={{ marginTop: 20 }}
            otpStyles={{
              backgroundColor: Color.white,
              borderRadius: 12,
              color: Color.primaryBlue100,
            }}
            handleTextChange={(code: string) => {
              setPin(code);
              console.log('Entered PIN:', code);
            }}
          />
        </View>
        <Pressable
          onPress={handlePinAuth}
          style={{
            backgroundColor: Color.primaryBlue100,
            paddingVertical: 16,
            width: '100%',
            paddingHorizontal: 60,
            borderRadius: 16,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: Color.white,
            }}
          >
            Submit
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.secondaryColors100,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: Color.primaryBlue100,
    fontWeight: '600',
  },
  biometricContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 200,
    padding: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SecurityScreen;
