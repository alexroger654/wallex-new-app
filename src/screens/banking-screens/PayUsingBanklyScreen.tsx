import * as React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
} from "react-native";
import {
    FontFamily,
    Color,
    FontSize,
    Border,
    Padding,
    Gap,
} from "../../GlobalStyles";
import { ChevronLeftIcon, ChevronRightIcon } from "react-native-heroicons/outline";

const PayUsingBanklyScreen = ({ navigation }: any) => {
    return (
        <View>
            <Pressable style={{
                paddingVertical: 14,
                paddingHorizontal: 18
            }}>
                <ChevronLeftIcon size={22} color={Color.primaryBlue100} />
            </Pressable>

            <View style={[styles.frameParent, styles.frameParentLayout1]}>
                <View style={styles.enterAmountParent}>
                    <Text style={[styles.enterAmount, styles.enterAmountTypo]}>
                        Enter Amount
                    </Text>
                    <Text style={[styles.howMuchWould, styles.paymentToTypo]}>
                        How much would you like to Pay
                    </Text>
                </View>
                <View style={[styles.wrapper, styles.wrapperLayout]}>
                    <Text style={[styles.text, styles.textTypo]}>₹ 1000</Text>
                </View>

                <Pressable style={styles.nextParent} onPress={() => {
                    navigation?.navigate('PayConfirmScreen')
                }}>
                    <Text style={[styles.next, styles.payTypo]}>Next</Text>
                    <ChevronRightIcon size={18} color={Color.white} style={{
                        marginTop: 2
                    }} />
                </Pressable>
            </View>

            <View style={[styles.scanPayInner, styles.numpadBg]}>
                <View style={styles.paymentToParent}>
                    <Text style={[styles.paymentTo, styles.nextTypo]}>Payment To</Text>
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
            <Text style={[styles.payUsingBankly, styles.payTypo]}>
                Pay using Wallex account
            </Text>


        </View>
    );
};

const styles = StyleSheet.create({
    iconLayout: {
        height: 24,
        width: 24,
    },
    frameParentLayout1: {
        width: 312,
        left: 24,
    },
    enterAmountTypo: {
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
        color: Color.primaryBlue100,
    },
    paymentToTypo: {
        fontSize: FontSize.size_3xs,
        textTransform: "capitalize",
    },
    wrapperLayout: {
        borderWidth: 1,
        borderRadius: Border.br_3xs,
    },
    textTypo: {
        color: Color.secondaryColors700,
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    payTypo: {
        fontSize: FontSize.size_base,
        textTransform: "capitalize",
    },
    groupChildLayout: {
        height: 239,
        width: 360,
        left: 0,
        position: "absolute",
    },
    continueLayout: {
        width: 286,
        paddingVertical: Padding.p_5xs,
        paddingHorizontal: Padding.p_13xl,
        flexDirection: "row",
        height: 57,
        backgroundColor: Color.primaryBlue100,
        borderRadius: Border.br_3xs,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    chooseTypo: {
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textAlign: "left",
        color: Color.primaryBlue100,
        textTransform: "capitalize",
    },
    frameLayout: {
        borderRadius: Border.br_3xs,
        backgroundColor: Color.secondaryColors100,
    },
    frameFlexBox: {
        paddingVertical: Padding.p_3xs,
        paddingHorizontal: Padding.p_xs,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: 312,
    },
    parentFlexBox: {
        gap: Gap.gap_md,
        alignItems: "center",
    },
    numpadBg: {
        backgroundColor: Color.secondaryColors200,
        position: "absolute",
    },
    nextTypo: {
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textAlign: "left",
    },
    salmaanAhmedTypo: {
        color: Color.primaryGreen100,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textAlign: "left",
        fontSize: FontSize.size_3xs,
    },
    numpadLayout: {
        width: 360,
        left: 0,
    },
    groupPosition: {
        left: "0%",
        bottom: "0%",
        right: "0%",
        position: "absolute",
        width: "100%",
    },
    frameParentLayout: {
        height: 80,
        overflow: "hidden",
    },
    numberFlexBox: {
        borderRadius: Border.br_xl,
        justifyContent: "center",
        alignItems: "center",
    },
    arrowBackIosIcon: {
        left: 24,
        position: "absolute",
        top: 40,
    },
    eclipseStrokeIcon: {
        top: 478,
        left: -115,
        width: 590,
        height: 590,
        opacity: 0.1,
        position: "absolute",
    },
    enterAmount: {
        textAlign: "left",
        color: Color.primaryBlue100,
        textTransform: "capitalize",
        fontSize: FontSize.size_3xs,
    },
    howMuchWould: {
        fontFamily: FontFamily.poppinsRegular,
        color: Color.primaryBlue80,
        textAlign: "left",
        textTransform: "capitalize",
    },
    enterAmountParent: {
        alignSelf: "stretch",
    },
    text: {
        textAlign: "center",
    },
    wrapper: {
        borderColor: "#cbd5e1",
        height: 52,
        paddingHorizontal: Padding.p_3xs,
        paddingVertical: 0,
        borderStyle: "solid",
        alignSelf: "stretch",
        justifyContent: "center",
    },
    frameChild: {
        width: 234,
        maxHeight: "100%",
    },
    next: {
        color: Color.white,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textAlign: "left",
    },
    navigateNextIcon: {
        width: 25,
        height: 25,
    },
    nextParent: {
        paddingVertical: Padding.p_5xs,
        paddingHorizontal: Padding.p_13xl,
        height: 57,
        backgroundColor: Color.primaryBlue100,
        flexDirection: "row",
        borderRadius: Border.br_3xs,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    frameParent: {
        top: 195,
        shadowColor: "rgba(30, 41, 59, 0.01)",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowRadius: 30,
        elevation: 30,
        shadowOpacity: 1,
        backgroundColor: Color.white,
        padding: 15,
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Border.br_xl,
        position: "absolute",
        overflow: "hidden",
    },
    groupChild: {
        top: 0,
    },
    continueParent: {
        top: 162,
        left: 37,
        position: "absolute",
    },
    choosePaymentMethod: {
        top: 17,
        left: 24,
        position: "absolute",
    },
    radioBtnIcon: {
        width: 16,
        height: 16,
    },
    payUsingUpi: {
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textAlign: "left",
        color: Color.primaryBlue100,
    },
    radioBtnParent: {
        flexDirection: "row",
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
        justifyContent: "flex-end",
        gap: Gap.gap_sm,
        flexDirection: "row",
        alignItems: "center",
    },
    frameContainer: {
        borderBottomWidth: 1,
        borderColor: Color.secondaryColors200,
        borderStyle: "solid",
        overflow: "hidden",
    },
    image12Icon: {
        width: 44,
        height: 16,
    },
    frameView: {
        overflow: "hidden",
    },
    frameGroup: {
        top: 46,
        left: 24,
        position: "absolute",
    },
    vectorParent: {
        top: 801,
    },
    paymentTo: {
        color: Color.secondaryColors500,
        textTransform: "capitalize",
        fontSize: FontSize.size_3xs,
    },
    salmaanAhmed: {
        textTransform: "capitalize",
    },
    paymentToParent: {
        gap: 5,
    },
    scanPayInner: {
        top: 87,
        padding: Padding.p_3xs,
        borderRadius: Border.br_8xs,
        width: 312,
        left: 24,
    },
    payUsingBankly: {
        left: 75,
        textAlign: "center",
        color: Color.primaryBlue100,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
        top: 40,
        position: "absolute",
    },
    groupItem: {
        height: "100%",
        top: "0%",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
    },
    image14Icon: {
        width: 36,
        height: 36,
        borderRadius: Border.br_8xs,
    },
    arrowDropDownIcon: {
        width: 26,
        height: 26,
        overflow: "hidden",
    },
    frameParent3: {
        paddingVertical: Padding.p_3xs,
        paddingHorizontal: Padding.p_xs,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: 312,
    },
    accountBalanceIcon: {
        width: 42,
        height: 42,
        overflow: "hidden",
    },
    addNewAccount: {
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textAlign: "left",
        color: Color.primaryBlue80,
    },
    addIcon: {
        width: 29,
        height: 29,
    },
    frameWrapper2: {
        borderStyle: "dashed",
        borderColor: Color.secondaryColors200,
    },
    frameParent2: {
        gap: 6,
    },
    chooseBankToPayWithParent: {
        gap: 8,
        flex: 1,
    },
    frameParent1: {
        height: "76.95%",
        width: "86.67%",
        top: "9.88%",
        right: "6.67%",
        bottom: "13.17%",
        left: "6.67%",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
    },
    vectorGroup: {
        height: "59.85%",
        top: "40.15%",
    },
    bankAcc: {
        top: 645,
        height: 406,
        position: "absolute",
    },
    numpadChild: {
        width: 58,
        maxHeight: "100%",
    },
    text1: {
        textAlign: "left",
    },
    number: {
        width: 68,
        height: 68,
        padding: Padding.p_3xs,
        justifyContent: "center",
        alignItems: "center",
    },
    numberParent: {
        gap: Gap.gap_lg,
        flexDirection: "row",
    },
    closeIcon: {
        overflow: "hidden",
    },
    numpad: {
        top: 449,
        borderTopLeftRadius: Border.br_11xl,
        borderTopRightRadius: Border.br_11xl,
        paddingHorizontal: 50,
        paddingVertical: 20,
        gap: Gap.gap_md,
        alignItems: "center",
        width: 360,
        left: 0,
        justifyContent: "center",
        overflow: "hidden",
    },
    scanPay: {
        height: 800,
        overflow: "hidden",
        width: "100%",
        backgroundColor: Color.secondaryColors100,
        flex: 1,
    },
});

export default PayUsingBanklyScreen;