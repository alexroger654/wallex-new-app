import * as React from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { useNavigation, ParamListBase } from '@react-navigation/native';
import {
  Border,
  FontFamily,
  Padding,
  Color,
  FontSize,
  Gap,
} from '../../GlobalStyles';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline';

const PayConfirmScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (
    <View style={styles.scanPayConfirm}>
      <Pressable
        style={[styles.arrowBackIos, styles.closeIconLayout]}
        onPress={() => navigation.goBack()}>
        <ChevronLeftIcon size={22} color={Color.primaryBlue100} />
      </Pressable>

      <View style={[styles.vectorParent, styles.groupChildLayout]}>
        <View style={[styles.continueParent, styles.continueLayout]}>
          <Text style={[styles.continue, styles.textTypo]}>Continue</Text>
          <ChevronRightIcon
            size={18}
            color={Color.white}
            style={{
              marginTop: 2,
            }}
          />
        </View>
        <Text style={[styles.choosePaymentMethod, styles.chooseTypo]}>
          Choose Payment Method
        </Text>
        <View style={styles.frameGroup}>
          <View style={[styles.frameContainer, styles.frameParentFlexBox]}>
            <View style={styles.radioBtnParent}>
              <Image
                style={styles.radioBtnIcon}
                resizeMode="cover"
                source={require('../../../assets/images/paytm.png')}
              />
              <Text style={[styles.payUsingUpi, styles.textTypo]}>
                Pay using UPI
              </Text>
            </View>
            <View style={styles.download2Parent}>
              <Image
                style={styles.download2Icon}
                resizeMode="cover"
                source={require('../../../assets/images/paytm.png')}
              />
              <Image
                style={styles.googlePayIcon1}
                resizeMode="cover"
                source={require('../../../assets/images/paytm.png')}
              />
              <Image
                style={styles.image1Icon}
                resizeMode="cover"
                source={require('../../../assets/images/paytm.png')}
              />
            </View>
          </View>
          <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
            <View style={styles.radioBtnParent}>
              <Image
                style={styles.radioBtnIcon}
                resizeMode="cover"
                source={require('../../../assets/images/paytm.png')}
              />
              <Text style={[styles.payUsingUpi, styles.textTypo]}>
                Pay using nEFT/IMPS
              </Text>
            </View>
            <View style={styles.download2Parent}>
              <Image
                style={styles.image12Icon}
                resizeMode="cover"
                source={require('../../../assets/images/paytm.png')}
              />
              <Image
                style={styles.download2Icon}
                resizeMode="cover"
                source={require('../../../assets/images/paytm.png')}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.scanPayConfirmInner, styles.frameParent7Position]}>
        <View style={styles.paymentToParent}>
          <Text style={[styles.paymentTo, styles.textTypo]}>Payment To</Text>
          <View>
            <Text style={[styles.salmaanAhmed, styles.salmaanAhmedTypo]}>
              Salmaan Ahmed
            </Text>
            <Text style={styles.salmaanAhmedTypo}>username-upi@upi-id</Text>
            <Text style={styles.salmaanAhmedTypo}>
              Banking Name : SALMAAN AHMED
            </Text>
          </View>
        </View>
      </View>
      <Text style={[styles.payUsingBankly, styles.text10Typo]}>
        Pay using Wallex account
      </Text>
      <View style={[styles.bankAcc, styles.numpadPosition]}>
        <View style={[styles.vectorGroup, styles.groupPosition]}>
          <View style={styles.frameParent2}>
            <ScrollView style={styles.chooseBankToPayWithParent}>
              <Text style={[styles.chooseBankTo, styles.chooseTypo]}>
                Choose bank to pay with
              </Text>
              <View style={[styles.frameParent3, styles.frameParentLayout]}>
                <View style={styles.frameWrapper}>
                  <View style={[styles.frameParent4, styles.frameParentLayout]}>
                    <View style={styles.radioBtnParent}>
                      <CreditCardIcon size={18} color={'red'} />
                      <Text style={[styles.payUsingUpi, styles.textTypo]}>
                        ICIC Bank - 32******
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <Pressable
              style={styles.continueLayout}
              onPress={() => {
                navigation?.navigate('PayOtpScreen');
              }}>
              <Text style={[styles.continue, styles.textTypo]}>Continue</Text>

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
      <View style={[styles.frameParent7, styles.frameParent7Position]}>
        <View style={styles.confirmAmountParent}>
          <Text style={styles.confirmAmount}>Confirm Amount</Text>
          <Text style={[styles.chooseThePayment, styles.addNewAccountText]}>
            Choose the payment method
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={[styles.text10, styles.text10Typo]}>₹ 1000</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  closeIconLayout: {
    height: 24,
    width: 24,
  },
  numpadPosition: {
    width: 360,
    left: 0,
    position: 'absolute',
  },
  numberFlexBox: {
    borderRadius: Border.br_xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  groupChildLayout: {
    height: 239,
    width: 360,
    left: 0,
    position: 'absolute',
  },
  continueLayout: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_13xl,
    height: 57,
    width: 286,
    backgroundColor: Color.primaryBlue100,
    borderRadius: Border.br_3xs,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  chooseTypo: {
    fontSize: FontSize.size_sm,
    color: Color.primaryBlue100,
    textAlign: 'left',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  frameParentFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xs,
    justifyContent: 'space-between',
    width: 312,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameParent7Position: {
    width: 312,
    left: 24,
    position: 'absolute',
    overflow: 'hidden',
  },
  salmaanAhmedTypo: {
    color: Color.primaryGreen100,
    fontSize: FontSize.size_3xs,
    textAlign: 'left',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  text10Typo: {
    textAlign: 'center',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  groupPosition: {
    left: '0%',
    bottom: '0%',
    right: '0%',
    position: 'absolute',
    width: '100%',
  },
  frameParentLayout: {
    height: 80,
    overflow: 'hidden',
  },
  addNewAccountText: {
    color: Color.primaryBlue80,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  arrowBackIos: {
    top: 40,
    position: 'absolute',
    left: 24,
  },
  numpadChild: {
    width: 58,
    height: 0,
  },
  text: {
    fontSize: FontSize.size_xl,
    color: Color.secondaryColors700,
  },
  number: {
    width: 68,
    height: 68,
    padding: Padding.p_3xs,
  },
  numberParent: {
    gap: Gap.gap_lg,
    flexDirection: 'row',
  },
  closeIcon: {
    overflow: 'hidden',
  },
  frameParent: {
    gap: Gap.gap_md,
    alignItems: 'center',
  },
  numpad: {
    top: 798,
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    paddingHorizontal: 50,
    paddingVertical: 20,
    gap: Gap.gap_md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.secondaryColors200,
    overflow: 'hidden',
  },
  eclipseStrokeIcon: {
    top: 475,
    left: -115,
    width: 590,
    height: 590,
    opacity: 0.1,
    position: 'absolute',
  },
  groupChild: {
    top: 0,
  },
  continue: {
    color: Color.white,
    fontSize: FontSize.size_base,
  },
  navigateNextIcon: {
    width: 25,
    height: 25,
  },
  continueParent: {
    top: 162,
    left: 37,
    position: 'absolute',
  },
  choosePaymentMethod: {
    top: 17,
    color: Color.primaryBlue100,
    left: 24,
    position: 'absolute',
  },
  radioBtnIcon: {
    width: 16,
    height: 16,
  },
  payUsingUpi: {
    color: Color.primaryBlue100,
    fontSize: FontSize.size_base,
  },
  radioBtnParent: {
    flexDirection: 'row',
    gap: Gap.gap_md,
    alignItems: 'center',
  },
  download2Icon: {
    width: 20,
    height: 20,
  },
  googlePayIcon1: {
    width: 18,
    height: 15,
  },
  image1Icon: {
    width: 19,
    height: 19,
  },
  download2Parent: {
    justifyContent: 'flex-end',
    gap: Gap.gap_sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: Color.secondaryColors200,
    overflow: 'hidden',
  },
  image12Icon: {
    width: 44,
    height: 16,
  },
  frameParent1: {
    overflow: 'hidden',
  },
  frameGroup: {
    top: 46,
    borderRadius: Border.br_3xs,
    left: 24,
    position: 'absolute',
    backgroundColor: Color.secondaryColors100,
  },
  vectorParent: {
    top: 801,
  },
  paymentTo: {
    color: Color.secondaryColors500,
    fontSize: FontSize.size_3xs,
  },
  salmaanAhmed: {
    textTransform: 'capitalize',
    color: Color.primaryGreen100,
  },
  paymentToParent: {
    gap: 5,
  },
  scanPayConfirmInner: {
    top: 87,
    borderRadius: Border.br_8xs,
    padding: Padding.p_3xs,
    backgroundColor: Color.secondaryColors200,
  },
  payUsingBankly: {
    left: 75,
    color: Color.primaryBlue100,
    fontSize: FontSize.size_base,
    top: 40,
    position: 'absolute',
  },
  groupItem: {
    top: '0%',
    maxWidth: '100%',
    maxHeight: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  chooseBankTo: {
    color: Color.primaryBlue100,
  },
  image14Icon: {
    width: 36,
    height: 36,
    borderRadius: Border.br_8xs,
  },
  arrowDropDownIcon: {
    width: 26,
    height: 26,
    overflow: 'hidden',
  },
  frameParent4: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xs,
    justifyContent: 'space-between',
    width: 312,
    flexDirection: 'row',
    alignItems: 'center',
  },
  frameWrapper: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.secondaryColors100,
  },
  accountBalanceIcon: {
    width: 42,
    height: 42,
    overflow: 'hidden',
  },
  addNewAccount: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    color: Color.primaryBlue80,
  },
  addIcon: {
    width: 29,
    height: 29,
  },
  frameWrapper2: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Color.secondaryColors200,
    borderRadius: Border.br_3xs,
  },
  frameParent3: {
    gap: 6,
  },
  chooseBankToPayWithParent: {
    gap: 8,
    flex: 1,
  },
  frameParent2: {
    height: '76.95%',
    width: '86.67%',
    top: '9.88%',
    right: '6.67%',
    bottom: '13.17%',
    left: '6.67%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
  },
  vectorGroup: {
    height: '59.85%',
    top: '40.15%',
  },
  bankAcc: {
    top: 395,
    height: 406,
  },
  confirmAmount: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    color: Color.primaryBlue100,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  chooseThePayment: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_3xs,
  },
  confirmAmountParent: {
    alignSelf: 'stretch',
  },
  text10: {
    fontSize: 48,
    color: Color.secondaryColors700,
  },
  wrapper: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    alignSelf: 'stretch',
    borderRadius: Border.br_3xs,
    justifyContent: 'center',
  },
  frameParent7: {
    top: 195,
    shadowColor: 'rgba(30, 41, 59, 0.01)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 30,
    elevation: 30,
    shadowOpacity: 1,
    backgroundColor: Color.white,
    padding: 15,
    borderRadius: Border.br_xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Gap.gap_md,
  },
  scanPayConfirm: {
    height: 800,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    backgroundColor: Color.secondaryColors100,
  },
});

export default PayConfirmScreen;
