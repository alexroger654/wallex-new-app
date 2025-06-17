import * as React from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import {
    FontFamily,
    Color,
    Padding,
    Border,
    FontSize,
    Gap,
} from "../../GlobalStyles";
import { ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, UserCircleIcon } from "react-native-heroicons/outline";
import { CreditCardIcon } from "react-native-heroicons/solid";

const TopUpBankDetailsScreen = ({ navigation }: any) => {
    return (
        <View style={styles.confirmTopupNeft}>
            <Pressable
                style={[styles.arrowBackIos, styles.frameGroupPosition]}
                onPress={() => { }}
            >
                <ChevronLeftIcon size={22} color={Color.primaryBlue100} />
            </Pressable>


            <View style={styles.addMoneyToYourWalletParent}>
                <Text style={[styles.addMoneyTo, styles.addMoneyToTypo]}>
                    Add money to your wallet
                </Text>
                <Text style={[styles.topUpYour, styles.topUpYourTypo]}>
                    Top up your wallet in a snap
                </Text>
            </View>


            <Pressable style={styles.confirmTopupNeftChild} onPress={() => { }} />
            <View style={styles.impsneftBankTransferParent}>
                <Text style={[styles.impsneftBankTransfer, styles.addMoneyToTypo]}>
                    IMPS/NEFT/ Bank Transfer
                </Text>
                <View style={styles.field}>
                    <Text style={[styles.accountHoldersName, styles.nextTypo]}>
                        Account holder’s name*
                    </Text>
                    <View style={styles.fieldInner}>
                        <View style={styles.parentFlexBox}>
                            <UserCircleIcon size={18} color={Color.primaryBlue20} />
                            <Text style={[styles.johnSmith, styles.topUpYourTypo]}>
                                john smith
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={[styles.accountHoldersName, styles.nextTypo]}>
                        Account No.*
                    </Text>
                    <View style={styles.fieldInner}>
                        <View style={styles.parentFlexBox}>
                            <CreditCardIcon size={18} color={Color.primaryBlue20} />
                            <Text style={[styles.johnSmith, styles.topUpYourTypo]}>
                                000000000000000
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={[styles.accountHoldersName, styles.nextTypo]}>
                        IFSC Code*
                    </Text>
                    <View style={styles.fieldInner}>
                        <View style={styles.parentFlexBox}>
                            <ClipboardIcon size={18} color={Color.primaryBlue20} />
                            <Text style={[styles.johnSmith, styles.topUpYourTypo]}>
                                ABCE0000
                            </Text>
                        </View>
                    </View>
                </View>
                <Pressable style={styles.parentLayout} onPress={() => {
                    navigation?.navigate('TopUpOtpScreen')
                }}>
                    <Text style={[styles.next, styles.nextTypo]}>Confirm</Text>
                    <ChevronRightIcon size={18} color={Color.white} style={{
                        marginTop: 2
                    }} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    frameGroupPosition: {
        left: 24,
        position: "absolute",
    },
    addMoneyToTypo1: {
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
        color: Color.primaryBlue100,
        textTransform: "capitalize",
    },
    topUpYourClr: {
        color: Color.primaryBlue80,
        fontFamily: FontFamily.poppinsRegular,
    },
    frameLayout: {
        height: 0,
        display: "none",
    },
    parentLayout: {
        paddingVertical: Padding.p_5xs,
        paddingHorizontal: Padding.p_13xl,
        height: 57,
        width: 286,
        backgroundColor: Color.primaryBlue100,
        flexDirection: "row",
        borderRadius: Border.br_3xs,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    nextTypo: {
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textAlign: "left",
    },
    icons8Layout1: {
        height: 38,
        width: 38,
        position: "absolute",
    },
    icons8Layout: {
        height: 34,
        width: 34,
        position: "absolute",
    },
    addMoneyToTypo: {
        fontSize: FontSize.size_xl,
        textAlign: "center",
    },
    topUpYourTypo: {
        fontSize: FontSize.size_xs,
        textTransform: "capitalize",
    },
    groupChildLayout: {
        height: 239,
        width: 360,
        left: 0,
        position: "absolute",
    },
    frameFlexBox: {
        paddingVertical: Padding.p_3xs,
        paddingHorizontal: Padding.p_xs,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: 312,
        overflow: "hidden",
    },
    parentFlexBox: {
        gap: Gap.gap_md,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        height: "100%",
        width: "100%",
    },
    arrowBackIos: {
        top: 40,
        width: 24,
        height: 24,
    },
    confirmAmount: {
        textAlign: "left",
        color: Color.primaryBlue100,
        fontSize: FontSize.size_sm,
    },
    selectThePayment: {
        fontSize: FontSize.size_3xs,
        textTransform: "capitalize",
        textAlign: "left",
    },
    text: {
        fontSize: 64,
        fontFamily: FontFamily.poppinsBold,
        color: Color.secondaryColors700,
        textAlign: "center",
        fontWeight: "700",
        textTransform: "capitalize",
    },
    frameChild: {
        width: 260,
        display: "none",
    },
    parent: {
        alignSelf: "stretch",
        gap: Gap.gap_lg,
        justifyContent: "center",
        alignItems: "center",
    },
    frameItem: {
        width: 234,
        display: "none",
    },
    next: {
        color: Color.white,
        fontSize: FontSize.size_base,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    navigateNextIcon: {
        width: 25,
        height: 25,
    },
    nextParent: {
        display: "none",
    },
    frameParent: {
        top: 200,
        shadowColor: "rgba(30, 41, 59, 0.01)",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowRadius: 30,
        elevation: 30,
        shadowOpacity: 1,
        borderRadius: 20,
        gap: 15,
        padding: Padding.p_mini,
        width: 312,
        backgroundColor: Color.white,
        left: 24,
        position: "absolute",
        overflow: "hidden",
    },
    icons8MoneyBag961: {
        top: 414,
        left: 0,
        height: 38,
        width: 38,
    },
    icons8MoneyBag962: {
        left: 110,
        width: 33,
        height: 33,
        top: 0,
        position: "absolute",
    },
    icons8MoneyBag963: {
        top: 113,
        left: 268,
    },
    icons8MoneyBag964: {
        top: 458,
        left: 245,
    },
    icons8MoneyBag965: {
        top: 572,
        left: 108,
    },
    icons8MoneyBag966: {
        top: 686,
        left: 257,
    },
    icons: {
        top: 45,
        left: 20,
        width: 306,
        height: 720,
        position: "absolute",
    },
    addMoneyTo: {
        color: Color.primaryBlue100,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    topUpYour: {
        display: "flex",
        width: 281,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        color: Color.primaryBlue80,
        fontFamily: FontFamily.poppinsRegular,
    },
    addMoneyToYourWalletParent: {
        top: 94,
        left: 39,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    eclipseStrokeIcon: {
        top: 478,
        left: -115,
        width: 590,
        height: 590,
        opacity: 0.1,
        position: "absolute",
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
        color: Color.primaryBlue100,
        textTransform: "capitalize",
        fontSize: FontSize.size_sm,
        left: 24,
        position: "absolute",
    },
    radioBtnIcon: {
        width: 16,
        height: 16,
    },
    payUsingUpi: {
        fontSize: FontSize.size_base,
        fontWeight: "500",
        textTransform: "capitalize",
        color: Color.primaryBlue100,
    },
    radioBtnParent: {
        flexDirection: "row",
        gap: Gap.gap_lg,
        alignItems: "center",
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
    },
    frameContainer: {
        borderStyle: "solid",
        borderColor: "#e2e8f0",
        borderBottomWidth: 1,
    },
    image12Icon: {
        width: 44,
        height: 16,
    },
    frameGroup: {
        top: 46,
        borderRadius: Border.br_3xs,
        backgroundColor: Color.secondaryColors100,
        left: 24,
    },
    vectorParent: {
        top: 561,
    },
    confirmTopupNeftChild: {
        backgroundColor: "rgba(27, 56, 110, 0.1)",
        width: 360,
        top: 0,
        left: 0,
        position: "absolute",
        height: 800,
    },
    impsneftBankTransfer: {
        letterSpacing: 0,
        lineHeight: 28,
        fontFamily: FontFamily.arial,
        color: "#153268",
        fontWeight: "700",
    },
    accountHoldersName: {
        fontSize: FontSize.size_3xs,
        textTransform: "capitalize",
        color: Color.primaryBlue100,
    },
    personIcon: {
        width: 17,
        height: 17,
        overflow: "hidden",
    },
    johnSmith: {
        color: Color.primaryBlue20,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textAlign: "left",
    },
    fieldInner: {
        backgroundColor: Color.colorLavender_100,
        width: 279,
        height: 50,
        borderRadius: Border.br_3xs,
        justifyContent: "center",
        padding: Padding.p_mini,
    },
    field: {
        gap: Gap.gap_sm,
    },
    impsneftBankTransferParent: {
        top: 198,
        left: 22,
        gap: 20,
        borderRadius: Border.br_3xs,
        alignItems: "center",
        padding: Padding.p_mini,
        backgroundColor: Color.white,
        position: "absolute",
        overflow: "hidden",
    },
    confirmTopupNeft: {
        flex: 1,
        overflow: "hidden",
        height: 800,
        width: "100%",
        backgroundColor: Color.secondaryColors100,
    },
});

export default TopUpBankDetailsScreen;