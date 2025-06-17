import * as React from 'react';
import {ScrollView, Text, StyleSheet, View, Image} from 'react-native';
import {
  Padding,
  FontFamily,
  FontSize,
  Gap,
  Color,
  Border,
} from '../../GlobalStyles';
import {CheckCircleIcon} from 'react-native-heroicons/solid';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const ReceiptScreen = () => {
  return (
    <ScrollView style={styles.receipt}>
      <View style={styles.frameParent}>
        <View style={styles.frameGroup}>
          <View
            style={[
              styles.mobilePrepaidRechargeParent,
              styles.frameContainerSpaceBlock,
            ]}>
            <Text style={[styles.mobilePrepaidRecharge, styles.textTypo1]}>
              MOBILE PREPAID Recharge
            </Text>
            <Text style={styles.nov20230937}>17 Nov 2023, 09:37 PM</Text>
          </View>
          <View
            style={[styles.frameContainer, styles.frameContainerSpaceBlock]}>
            <View style={styles.frameView}>
              <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
                <View style={styles.frameParent2}>
                  <View style={[styles.image37Wrapper, styles.wrapperFlexBox1]}>
                    <Image
                      style={styles.image37Icon}
                      resizeMode="cover"
                      source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVq-OmHL5H_5P8b1k306pFddOe3049-il2A&s',
                      }}
                    />
                  </View>
                  <View>
                    <Text style={[styles.airtel, styles.textTypo]}>AIRTEL</Text>
                    <Text style={[styles.text, styles.textTypo]}>
                      9304224902
                    </Text>
                  </View>
                </View>
                <Text style={styles.text1}>₹ 19.00</Text>
              </View>
              <Text style={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet consectetur. Enim imperdiet nullam
                ullamcorper urna etiam.
              </Text>
            </View>
            <View style={[styles.frameChild, styles.frameChildLayout]} />
            <View style={styles.frameView}>
              <Text style={[styles.orderDetails, styles.textTypo1]}>
                Order Details
              </Text>
              <View style={styles.frameView}>
                <View style={[styles.orderIdParent, styles.frameParentFlexBox]}>
                  <Text style={styles.orderId}>Order ID</Text>
                  <Text style={[styles.bbps585092480232432, styles.textTypo1]}>
                    BBPS585092480232432
                  </Text>
                </View>
                <View style={[styles.orderIdParent, styles.frameParentFlexBox]}>
                  <Text style={styles.orderId}>Biller Reference Number</Text>
                  <View style={styles.parentFlexBox}>
                    <Text
                      style={[styles.bbps585092480232432, styles.textTypo1]}>
                      PU013323I6IB4VTQ1227
                    </Text>
                    <Image
                      style={styles.frameItem}
                      resizeMode="cover"
                      source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVq-OmHL5H_5P8b1k306pFddOe3049-il2A&s',
                      }}
                    />
                  </View>
                </View>
                <View style={[styles.orderIdParent, styles.frameParentFlexBox]}>
                  <Text style={styles.orderId}>
                    Transaction Reference Number
                  </Text>
                  <View style={[styles.wrapper, styles.frameParentFlexBox]}>
                    <Text
                      style={[styles.bbps585092480232432, styles.textTypo1]}>
                      18581863830
                    </Text>
                  </View>
                </View>
                <View style={[styles.orderIdParent, styles.frameParentFlexBox]}>
                  <Text style={styles.orderId}>Payment Status</Text>
                  <Text style={[styles.bbps585092480232432, styles.textTypo1]}>
                    Paid
                  </Text>
                </View>
                <View style={[styles.orderIdParent, styles.frameParentFlexBox]}>
                  <Text style={styles.orderId}>Biller Status</Text>
                  <Text style={[styles.bbps585092480232432, styles.textTypo1]}>
                    Success
                  </Text>
                </View>
                <View style={[styles.orderIdParent, styles.frameParentFlexBox]}>
                  <Text style={styles.orderId}>Mobile Number</Text>
                  <Text style={[styles.bbps585092480232432, styles.textTypo1]}>
                    9600016417
                  </Text>
                </View>
                <View style={[styles.orderIdParent, styles.frameParentFlexBox]}>
                  <Text style={styles.orderId}>Generated On</Text>
                  <Text style={[styles.bbps585092480232432, styles.textTypo1]}>
                    17 Nov 2023, 09:37 PM
                  </Text>
                </View>
                <View style={[styles.orderIdParent, styles.frameParentFlexBox]}>
                  <Text style={styles.orderId}>Paid On</Text>
                  <Text style={[styles.bbps585092480232432, styles.textTypo1]}>
                    17 Nov 2023, 09:37 PM
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.amountDropdon}>
          <View style={[styles.totalAmountParent, styles.frameParentFlexBox]}>
            <Text style={styles.totalAmount}>Total amount</Text>
            <View style={[styles.parent, styles.parentFlexBox]}>
              <Text style={[styles.text4, styles.textTypo1]}>₹299.00</Text>
              {/* <Image
                style={[styles.arrowDropDownIcon, styles.iconLayout]}
                resizeMode="cover"
                source={require("../assets/arrow-drop-down.png")}
              /> */}
            </View>
          </View>
          <View style={[styles.amountDropdonChild, styles.frameChildLayout]} />
          <View style={[styles.totalAmountParent, styles.frameParentFlexBox]}>
            <Text style={[styles.amountToPay, styles.textTypo]}>
              Amount to pay
            </Text>
            <Text style={[styles.text5, styles.textTypo]}>₹299.00</Text>
          </View>
        </View>
        <View style={[styles.paymentMadeThroughParent, styles.parentLayout]}>
          <Text style={[styles.amountToPay, styles.textTypo]}>
            Payment Made Through
          </Text>
          <View style={[styles.frameInner, styles.frameChildLayout]} />
          <View style={[styles.orderIdParent, styles.frameParentFlexBox]}>
            <Text style={[styles.text4, styles.textTypo1]}>UPI</Text>
            <Text style={[styles.text4, styles.textTypo1]}>₹ 299.00</Text>
          </View>
        </View>
        <View style={[styles.quickHelpFaqsParent, styles.parentLayout]}>
          <Text style={[styles.text4, styles.textTypo1]}>
            Quick Help / FAQs
          </Text>
          {/* <Image
            style={styles.arrowForwardIosIcon}
            resizeMode="cover"
            source={require("../../../assets/images/arrow_back_ios.png")}
          /> */}
        </View>
        <View style={[styles.paymentMadeThroughParent, styles.parentLayout]}>
          <Text style={[styles.getExclusiveDiscounts, styles.textTypo]}>
            Get exclusive discounts
          </Text>
          <View style={[styles.imageWrapper, styles.wrapperFlexBox1]}>
            {/* <Image
              style={styles.imageIcon}
              resizeMode="cover"
              source={require("../assets/image.png")}
            /> */}
          </View>
          <View style={[styles.rectangleParent, styles.parentFlexBox]}>
            <View style={[styles.rectangleView, styles.frameChild1Layout]} />
            <View style={[styles.frameChild1, styles.frameChild1Layout]} />
            <View style={[styles.frameChild1, styles.frameChild1Layout]} />
            <View style={[styles.frameChild1, styles.frameChild1Layout]} />
          </View>
        </View>
      </View>
      <View style={styles.frameParent4}>
        <View style={[styles.frameParent5, styles.frameParentFlexBox]}>
          <View
            style={{
              paddingHorizontal: 10,
              marginLeft: -10
            }}>
           <ChevronLeftIcon size={24} color="#fff" />
          </View>
        </View>
        <View style={{}}>
          <CheckCircleIcon size={30} color="#fff" />
        </View>

        <View style={[styles.frameParent6, styles.frameParentFlexBox]}>
          <View>
            <Text style={[styles.paymentSuccessful, styles.text7Text]}>
              Payment Successful
            </Text>
            <Text style={[styles.text7, styles.text7Text]}>₹ 299.0</Text>
            <Text style={[styles.orderIdBbps585092480232432, styles.text7Text]}>
              Order Id BBPS585092480232432
            </Text>
          </View>
          <View style={[styles.shareWrapper, styles.wrapperFlexBox]}>
            {/* <Image
              style={[styles.arrowDropDownIcon, styles.iconLayout]}
              resizeMode="cover"
              source={require("../assets/share.png")}
            /> */}
          </View>
        </View>
      </View>

      <View style={{
        paddingBottom: 200
      }}>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  frameContainerSpaceBlock: {
    padding: Padding.p_xs,
    width: 312,
  },
  textTypo1: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  frameParentFlexBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  wrapperFlexBox1: {
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTypo: {
    fontSize: FontSize.size_sm,
    textAlign: 'left',
  },
  frameChildLayout: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  parentFlexBox: {
    gap: Gap.gap_sm,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconLayout: {
    height: 24,
    width: 24,
  },
  parentLayout: {
    padding: Padding.p_base,
    backgroundColor: Color.white,
    width: 312,
    borderRadius: Border.br_xs,
  },
  frameChild1Layout: {
    height: 5,
    backgroundColor: Color.primaryBlue20,
    borderRadius: Border.br_81xl,
  },
  wrapperFlexBox: {
    padding: Padding.p_5xs,
    justifyContent: 'center',
    borderRadius: Border.br_81xl,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text7Text: {
    color: Color.white,
    textTransform: 'capitalize',
  },
  mobilePrepaidRecharge: {
    textAlign: 'left',
    color: Color.secondaryColors700,
    textTransform: 'capitalize',
    fontSize: FontSize.size_xs,
  },
  nov20230937: {
    color: Color.secondaryColors500,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_3xs,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  mobilePrepaidRechargeParent: {
    backgroundColor: Color.colorAliceblue_100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image37Icon: {
    height: 12,
    width: 24,
  },
  image37Wrapper: {
    borderWidth: 1,
    width: 38,
    height: 38,
    justifyContent: 'center',
    borderColor: Color.secondaryColors100,
    borderRadius: Border.br_81xl,
  },
  airtel: {
    color: Color.secondaryColors700,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  text: {
    color: Color.secondaryColors500,
    fontFamily: FontFamily.poppinsRegular,
    textTransform: 'capitalize',
  },
  frameParent2: {
    gap: Gap.gap_md,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text1: {
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    color: Color.secondaryColors700,
    textTransform: 'capitalize',
  },
  frameParent1: {
    alignSelf: 'stretch',
  },
  loremIpsumDolor: {
    alignSelf: 'stretch',
    color: Color.secondaryColors500,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    fontSize: FontSize.size_xs,
  },
  frameView: {
    gap: Gap.gap_md,
    alignSelf: 'stretch',
  },
  frameChild: {
    borderColor: Color.secondaryColors100,
    alignSelf: 'stretch',
  },
  orderDetails: {
    alignSelf: 'stretch',
    textAlign: 'left',
    color: Color.secondaryColors700,
    fontSize: FontSize.size_xs,
  },
  orderId: {
    color: Color.secondaryColors500,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_3xs,
    textAlign: 'left',
  },
  bbps585092480232432: {
    textAlign: 'right',
    fontSize: FontSize.size_3xs,
    color: Color.secondaryColors700,
  },
  orderIdParent: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  frameItem: {
    width: 20,
    height: 20,
    borderRadius: Border.br_81xl,
  },
  wrapper: {
    width: 64,
    alignItems: 'center',
  },
  frameContainer: {
    gap: Gap.gap_lg,
    backgroundColor: Color.white,
  },
  frameGroup: {
    overflow: 'hidden',
    borderRadius: Border.br_xs,
  },
  totalAmount: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    color: Color.secondaryColors700,
  },
  text4: {
    fontSize: FontSize.size_base,
    textAlign: 'left',
    color: Color.secondaryColors700,
  },
  arrowDropDownIcon: {
    overflow: 'hidden',
  },
  parent: {
    justifyContent: 'center',
  },
  totalAmountParent: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  amountDropdonChild: {
    borderColor: Color.colorAliceblue_100,
    display: 'none',
    alignSelf: 'stretch',
  },
  amountToPay: {
    color: Color.secondaryColors500,
    fontFamily: FontFamily.poppinsRegular,
  },
  text5: {
    color: Color.secondaryColors500,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  amountDropdon: {
    height: 56,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_5xs,
    gap: Gap.gap_md,
    backgroundColor: Color.white,
    width: 312,
    overflow: 'hidden',
    borderRadius: Border.br_xs,
  },
  frameInner: {
    width: 220,
    borderColor: Color.secondaryColors100,
  },
  paymentMadeThroughParent: {
    gap: Gap.gap_md,
  },
  arrowForwardIosIcon: {
    width: 18,
    height: 18,
    overflow: 'hidden',
  },
  quickHelpFaqsParent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  getExclusiveDiscounts: {
    color: Color.secondaryColors700,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  imageIcon: {
    width: 36,
    height: 36,
    overflow: 'hidden',
  },
  imageWrapper: {
    backgroundColor: '#f5faff',
    borderColor: Color.white,
    borderWidth: 2,
    height: 108,
    paddingHorizontal: 10,
    paddingVertical: Padding.p_base,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderRadius: Border.br_xs,
  },
  rectangleView: {
    width: 16,
  },
  frameChild1: {
    width: 5,
    opacity: 0.5,
  },
  rectangleParent: {
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  frameParent: {
    top: 254,
    left: 24,
    gap: 16,
    position: 'absolute',
  },
  beAssured1: {
    borderRadius: 80,
    width: 40,
    height: 40,
  },
  frameParent5: {
    alignItems: 'center',
    width: 312,
  },
  doneIcon: {
    height: 16,
    width: 16,
    overflow: 'hidden',
  },
  doneWrapper: {
    backgroundColor: Color.white,
  },
  paymentSuccessful: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  text7: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: FontFamily.poppinsBold,
  },
  orderIdBbps585092480232432: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
  },
  shareWrapper: {
    backgroundColor: Color.primaryGreen80,
  },
  frameParent6: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  frameParent4: {
    marginLeft: -180,
    top: 0,
    left: '50%',
    backgroundColor: Color.primaryGreen100,
    width: 360,
    paddingHorizontal: 24,
    paddingVertical: 28,
    gap: Gap.gap_lg,
    position: 'absolute',
  },
  receipt: {
    backgroundColor: Color.secondaryColors100,
    flex: 1,
    width: '100%',
    maxWidth: '100%',
  },
});

export default ReceiptScreen;
