import * as React from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import {Color, FontFamily, FontSize, Gap} from '../../GlobalStyles';
import {useAuth} from '../../context/AuthContext';
import Loading from '../../component/Loading';
import {useToast} from 'react-native-toast-notifications';

// ================== component ===============================
const OtpVerificationScreen = ({navigation, route}: any) => {
  // ==================== state s-----------------------
  const [otp, setOtp] = React.useState<string[]>(['', '', '', '', '']); // Updated to 5 digits
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [timer, setTimer] = React.useState(30); // Timer state
  const [isResendDisabled, setIsResendDisabled] = React.useState(true); // Disable resend initially
  const inputRefs = React.useRef<Array<TextInput | null>>([]);
  const {verifyOtp, sendOtp} = useAuth();
  const toast = useToast();

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError('');
    if (text && index < 4) {
      // Update the condition to check for the 4th index
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = async () => {
    setTimer(30);
    setIsResendDisabled(true);
    await sendOtp(route.params?.mobile);
    toast.show('OTP Sent');
    setOtp(['', '', '', '', '']);
  };

  React.useEffect(() => {
    // Timer logic
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); // Enable resend button when timer reaches 0
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  async function handleVerifyOtp() {
    setLoading(true);
    if (otp.some(digit => digit === '')) {
      setError('Please enter a 5-digit OTP.');
      setLoading(false);
      return;
    }
    const result = await verifyOtp(route.params?.mobile, otp.join(''));
    setLoading(false);
    if (result) {
      navigation?.navigate('Main');
    } else {
      setError('Verification failed. Please try again.');
    }
  }

  if (loading) {
    return <Loading />;
  }

  // ======================= render ======================
  return (
    <View style={styles.otpVerification}>
      <Pressable
        style={[styles.arrowBackIos, styles.step25Position]}
        onPress={() => {
          navigation?.goBack();
        }}>
        <ChevronLeftIcon size={22} color={Color.primaryBlue100} />
      </Pressable>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={styles.verifyYourAccountParent}>
          <Text style={[styles.verifyYourAccount, styles.step25Text]}>
            Verify Your Account
          </Text>
          <Pressable onPress={() => navigation?.navigate('LoginScreen')}>
            <Text style={[styles.enterTheOtpContainer, styles.text4FlexBox1]}>
              <Text style={styles.enterTheOtpContainer1}>
                <Text
                  style={
                    styles.enterTheOtp
                  }>{`Enter the OTP Sent to your mobile number
+91 ${route.params?.mobile} `}</Text>
                <Text style={styles.edit}>Edit</Text>
              </Text>
            </Text>
          </Pressable>
        </View>
        <View style={styles.frameParent}>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                ref={ref => (inputRefs.current[index] = ref)}
                value={digit}
              />
            ))}
          </View>
          <Pressable
            style={[styles.enterOtpParent, styles.text4FlexBox]}
            onPress={handleVerifyOtp}>
            <Text style={[styles.enterOtp, styles.step21Typo]}>Enter OTP</Text>
            <ChevronRightIcon
              size={18}
              color={Color.white}
              style={{
                marginTop: 2,
              }}
            />
          </Pressable>
        </View>
        <Pressable
          onPress={handleResendCode}
          disabled={isResendDisabled}
          style={{
            opacity: isResendDisabled ? 0.5 : 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: Color.secondaryColors500,
            }}>
            Resend code in
          </Text>
          {isResendDisabled ? (
            <Text style={styles.resendButton}>
              {' '}
              {`0:${timer.toString().padStart(2, '0')}`}
            </Text>
          ) : (
            <Pressable onPress={handleResendCode}>
              <Text style={styles.resendButton}> Resend OTP</Text>
            </Pressable>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  input: {
    width: 40,
    height: 50,
    fontSize: 24,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Color.primaryBlue20,
    color: Color.primaryBlue100,
  },
  step25Position: {
    top: 40,
    position: 'absolute',
  },
  step25Text: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: '700',
  },
  text4FlexBox1: {
    display: 'flex',
    textAlign: 'center',
  },
  step21Typo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  text4FlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  arrowBackIos: {
    width: 24,
    height: 24,
    left: 24,
  },
  verifyYourAccount: {
    fontSize: 28,
    color: Color.primaryBlue100,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  enterTheOtp: {
    color: Color.colorSteelblue,
    textTransform: 'capitalize',
  },
  edit: {
    color: Color.primaryBlue100,
  },
  enterTheOtpContainer1: {
    width: '100%',
  },
  enterTheOtpContainer: {
    width: 303,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 14,
    alignItems: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  verifyYourAccountParent: {
    gap: 5,
    alignItems: 'center',
    marginTop: 120,
  },
  step21: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  text1: {
    fontSize: FontSize.size_xs,
  },
  text: {
    fontFamily: FontFamily.poppinsRegular,
  },
  step2: {
    color: Color.primaryBlue100,
  },
  text3: {
    fontSize: 10,
    color: Color.colorSteelblue,
  },
  step25: {
    left: 149,
    top: 40,
    position: 'absolute',
  },
  text4: {
    fontSize: FontSize.size_17xl,
    width: 21,
    height: 30,
    opacity: 0,
    display: 'flex',
    textAlign: 'center',
    color: Color.primaryBlue100,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  instanceChild: {
    width: 63,
    maxHeight: '100%',
  },
  parent: {
    gap: Gap.gap_md,
    alignItems: 'center',
  },
  instanceParent: {
    width: 277,
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameChild: {
    width: 234,
    maxHeight: '100%',
  },
  enterOtp: {
    color: Color.white,
    textAlign: 'left',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  navigateNextIcon: {
    width: 25,
    height: 25,
  },
  enterOtpParent: {
    borderRadius: 10,
    backgroundColor: Color.primaryBlue100,
    width: '100%',
    height: 57,
    paddingHorizontal: 32,
    paddingVertical: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: 6,
  },
  frameParent: {
    shadowColor: 'rgba(30, 41, 59, 0.01)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 30,
    elevation: 30,
    shadowOpacity: 1,
    borderRadius: 20,
    backgroundColor: Color.white,
    width: 312,
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 15,
    alignItems: 'center',
    overflow: 'hidden',
  },
  textTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
  },
  resendCodeIn: {
    color: '#8f9dc5',
  },
  text10: {
    color: Color.colorSteelblue,
  },
  resendCodeInContainer: {
    fontSize: 14,
  },
  otpVerification: {
    backgroundColor: Color.secondaryColors100,
    flex: 1,
    height: 800,
    overflow: 'hidden',
    width: '100%',
  },
  resendButton: {
    color: Color.primaryBlue100,
  },
});

export default OtpVerificationScreen;
