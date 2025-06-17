import * as React from "react";
import { Text, StyleSheet, Image, View, Pressable } from "react-native";
import { Color, FontFamily, FontSize, Padding, Border } from "../../GlobalStyles";
import { ArrowDownLeftIcon, CheckIcon } from "react-native-heroicons/outline";

const PaymentReceiptScreen = () => {
    return (
        <View style={styles.confirm}>
            <Text style={[styles.paymentReceipt, styles.successTypo]}>
                Payment Receipt
            </Text>
            <View style={{
                backgroundColor: Color.primaryBlue50,
                width: 80,
                height: 80,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 40,
                position: 'absolute',
                left: "35%",
                top: "14%"

            }}>
                <CheckIcon size={32} color={Color.white} />

            </View>
            <View
                style={[styles.downloadReceiptParent, styles.doneWrapperSpaceBlock]}
            >
                <Text style={[styles.downloadReceipt, styles.from1Clr]}>
                    Download receipt
                </Text>
                <ArrowDownLeftIcon size={18} color={Color.primaryBlue20} />
            </View>
            <Pressable
                style={[styles.doneWrapper, styles.wrapperLayout]}
                onPress={() => { }}
            >
                <Text style={[styles.done, styles.doneTypo]}>Done</Text>
            </Pressable>

            <Text style={[styles.success, styles.successTypo]}>Success</Text>
            <Text style={[styles.youHaveSuccessfully, styles.doneTypo]}>
                You have successfully transferred money
            </Text>
            <View style={styles.fromParent}>
                <View style={styles.from}>
                    <Text style={[styles.from1, styles.from1Position]}>From</Text>
                    <Text style={[styles.salmaanAhmed, styles.textTypo]}>
                        SALMAAN AHMED
                    </Text>
                    <Text style={[styles.debitCard, styles.pmTypo]}>Debit Card</Text>
                    <Text style={[styles.visa63, styles.pmTypo]}>Visa 63**</Text>
                </View>
                <View style={styles.from}>
                    <Text style={[styles.from1, styles.from1Position]}>To</Text>
                    <Text style={[styles.salmaanAhmed, styles.textTypo]}>
                        SALMAAN AHMED
                    </Text>
                    <Text style={[styles.debitCard, styles.pmTypo]}>Debit Card</Text>
                    <Text style={[styles.visa63, styles.pmTypo]}>Visa 63**</Text>
                </View>
                <View style={styles.from}>
                    <Text style={[styles.from1, styles.from1Position]}>Date</Text>
                    <Text style={[styles.text, styles.textTypo]}>12/03/2023</Text>
                    <Text style={[styles.pm, styles.pmTypo]}>12:41 PM</Text>
                </View>
            </View>
            <View style={[styles.wrapper, styles.wrapperLayout]}>
                <Text style={[styles.text1, styles.from1Clr]}>₹2,324</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    successTypo: {
        color: Color.primaryBlue100,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        fontSize: FontSize.size_xl,
        textAlign: "center",
        textTransform: "capitalize",
        position: "absolute",
    },
    doneWrapperSpaceBlock: {
        paddingVertical: Padding.p_5xs,
        paddingHorizontal: Padding.p_13xl,
        justifyContent: "center",
        height: 46,
        width: 286,
        alignItems: "center",
    },
    from1Clr: {
        color: Color.secondaryColors700,
        textTransform: "capitalize",
    },
    wrapperLayout: {
        borderRadius: Border.br_3xs,
        flexDirection: "row",
        position: "absolute",
        overflow: "hidden",
    },
    doneTypo: {
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    from1Position: {
        top: 0,
        left: 0,
        position: "absolute",
    },
    textTypo: {
        top: 1,
        textAlign: "right",
        color: Color.secondaryColors700,
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textTransform: "capitalize",
        position: "absolute",
    },
    pmTypo: {
        color: Color.secondaryColors400,
        fontSize: FontSize.size_3xs,
        top: 21,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textTransform: "capitalize",
        position: "absolute",
    },
    paymentReceipt: {
        top: 63,
        left: 94,
        textAlign: "center",
    },
    vectorIcon: {
        height: 100,
        width: 100,
        maxWidth: "100%",
        maxHeight: "100%",

        overflow: "hidden",
    },
    downloadReceipt: {
        textAlign: "left",
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    downloadIcon: {
        width: 15,
        height: 15,
    },
    downloadReceiptParent: {
        top: 627,
        left: 37,
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "#cbd5e1",
        borderWidth: 1,
        gap: 10,
        flexDirection: "row",
        paddingHorizontal: Padding.p_13xl,
        justifyContent: "center",
        height: 46,
        width: 286,
        position: "absolute",
    },
    done: {
        color: Color.white,
        textAlign: "left",
        textTransform: "capitalize",
        fontSize: FontSize.size_xs,
    },
    doneWrapper: {
        top: 568,
        left: 36,
        backgroundColor: Color.primaryBlue100,
        paddingVertical: Padding.p_5xs,
        paddingHorizontal: Padding.p_13xl,
        justifyContent: "center",
        height: 46,
        width: 286,
        alignItems: "center",
        borderRadius: Border.br_3xs,
    },
    httpsapplottiefilescomanIcon: {
        top: 84,
        left: 97,
        width: 167,
        height: 167,
        position: "absolute",
    },
    success: {
        top: 213,
        left: 139,
        textAlign: "center",
    },
    youHaveSuccessfully: {
        top: 242,
        left: 54,
        color: Color.primaryBlue50,
        textAlign: "center",
        textTransform: "capitalize",
        fontSize: FontSize.size_xs,
        position: "absolute",
    },
    from1: {
        display: "flex",
        width: 31,
        height: 21,
        left: 0,
        textAlign: "left",
        color: Color.secondaryColors700,
        textTransform: "capitalize",
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        alignItems: "center",
        top: 0,
    },
    salmaanAhmed: {
        left: 173,
        textAlign: "right",
    },
    debitCard: {
        left: 0,
        textAlign: "left",
    },
    visa63: {
        left: 229,
        textAlign: "right",
    },
    from: {
        width: 276,
        height: 36,
    },
    text: {
        left: 209,
        textAlign: "right",
    },
    pm: {
        left: 236,
        textAlign: "right",
    },
    fromParent: {
        top: 361,
        left: 42,
        gap: 17,
        position: "absolute",
    },
    text1: {
        fontSize: 32,
        fontWeight: "600",
        fontFamily: FontFamily.poppinsSemiBold,
        textAlign: "center",
    },
    wrapper: {
        top: 272,
        left: 107,
        height: 68,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Color.secondaryColors100,
    },
    httpslottiefilescom97987Icon: {
        width: 360,
        height: 364,
        left: 0,
    },
    confirm: {
        flex: 1,
        width: "100%",
        height: 800,
        overflow: "hidden",
        backgroundColor: Color.secondaryColors100,
    },
});

export default PaymentReceiptScreen;