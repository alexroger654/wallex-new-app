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
import { Color, FontFamily, FontSize, Gap } from '../../GlobalStyles';

const TopUpOtpScreen = ({ navigation }: any) => {
  const [otp, setOtp] = React.useState<string[]>(['', '', '', '']);
  const inputRefs = React.useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input if the current one is filled
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    // Go to previous input on Backspace if the current input is empty
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
        <View
          style={[
            styles?.heightLightContainer,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            },
          ]}>
          <Text style={styles.heightLightText}>Abhishek Kuman</Text>
          <Text style={styles.heightLightText}>Rs. 25,000</Text>
        </View>
        <View style={styles.verifyYourAccountParent}>
          <Text style={[styles.enterTheOtpContainer, styles.text4FlexBox1]}>
            <Text style={styles.enterTheOtpContainer1}>
              <Text style={styles.enterTheOtp}>{`Enter 4-DIGIT UPI PIN `}</Text>
              <Text style={styles.edit}>edit</Text>
            </Text>
          </Text>
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
          <View style={[styles?.heightLightContainer, {}]}>
            <Text style={styles.heightLightText}>
              You are transferring money from your account to your Wallex wallet
            </Text>
          </View>
          <Pressable
            style={[styles.enterOtpParent, styles.text4FlexBox]}
            onPress={() => {
              navigation?.navigate('TopUpReceiptScreen');
            }}>
            <Text style={[styles.enterOtp, styles.step21Typo]}>Confirm</Text>
            <ChevronRightIcon
              size={18}
              color={Color.white}
              style={{
                marginTop: 2,
              }}
            />
          </Pressable>
        </View>
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
    width: 50,
    height: 50,
    fontSize: 24,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Color.primaryBlue20,
    color: Color.primaryBlue100,
  },
  heightLightContainer: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    backgroundColor: Color.primaryBlue20,
    borderRadius: 12,
  },
  heightLightText: {
    color: Color.primaryBlue80,
    fontWeight: '500',
    borderRadius: 12,
  },
  step25Position: {
    paddingVertical: 16,
    marginBottom: 20,
  },
  step25Text: {
    textAlign: 'center',
    textTransform: 'capitalize',
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
    fontSize: 24,
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
    fontSize: FontSize.size_xs,
    alignItems: 'center',
  },
  verifyYourAccountParent: {
    gap: 5,
    alignItems: 'center',
    marginTop: 90,
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
    width: 286,
    height: 57,
    paddingHorizontal: 32,
    paddingVertical: 8,
    flexDirection: 'row',
    overflow: 'hidden',
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
    top: 420,
    left: 108,
    fontSize: 14,
    position: 'absolute',
  },
  otpVerification: {
    backgroundColor: Color.white,
    flex: 1,
    height: 800,
    overflow: 'hidden',
    width: '100%',
  },
});

export default TopUpOtpScreen;
