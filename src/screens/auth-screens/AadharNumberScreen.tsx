import * as React from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "react-native-heroicons/outline";
import { Border, Color, FontFamily, FontSize, Padding } from "../../GlobalStyles";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';



// ==================== component ============
const AadharNumberScreen = ({ navigation }: any) => {
    return (
        <View style={styles.phoneNumber}>
            <Pressable
                style={[styles.arrowBackIos, styles.step15Position]}
                onPress={() => { }}
            >
                <ChevronLeftIcon size={22} color={Color.primaryBlue100} />

            </Pressable>
            <View style={[styles.hiWelcomeToBanklyParent, styles.parentFlexBox1]}>
                <Text style={[styles.hiWelcomeTo, styles.step15Text]}>
                    You’re almost done!
                </Text>
                <Text style={styles.enterYourMobile}>
                    Enter your Aadhar number and get started
                </Text>
            </View>
            <Text style={[styles.step15, styles.step15Text]}>
                <Text style={styles.step1}>
                    <Text style={[styles.step11, styles.step11Typo]}>Step 1</Text>
                    <Text style={styles.text}>
                        <Text style={styles.text1}>/</Text>
                    </Text>
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.text3}>5</Text>
                </Text>
            </Text>
            <View style={[styles.frameParent, styles.parentFlexBox1]}>
                <View style={[styles.frameWrapper, styles.frameWrapperLayout]}>
                    <View style={[styles.frameGroup, styles.parentFlexBox]}>

                        <View style={styles.frameChild} />
                        <Text style={[styles.text5, styles.textTypo]}>00000 00000</Text>
                    </View>
                </View>

                <Pressable
                    style={[styles.receiveOtpParent, styles.parentFlexBox]}
                    onPress={() => {
                        navigation?.navigate('AdharCardOtpScreen')
                    }}
                >
                    <Text style={[styles.receiveOtp, styles.textTypo]}>Receive OTP</Text>
                    <ChevronRightIcon size={18} color={Color.white} style={{
                        marginTop: 2
                    }} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({


    step15Position: {
        top: 40,
        position: "absolute",
    },
    parentFlexBox1: {
        alignItems: "center",
        position: "absolute",
    },
    step15Text: {
        textAlign: "center",
        textTransform: "capitalize",
    },
    step11Typo: {
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    frameWrapperLayout: {
        width: 286,
        borderRadius: Border.br_3xs,
        justifyContent: "center",
    },
    parentFlexBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    textTypo: {
        textAlign: "left",
        fontSize: FontSize.size_base,
        textTransform: "capitalize",
    },
    icon: {
        height: "100%",
        width: "100%",
    },
    arrowBackIos: {
        width: 24,
        height: 24,
        left: 24,
    },
    hiWelcomeTo: {
        fontSize: 24,
        color: Color.primaryBlue100,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "700",
    },
    enterYourMobile: {
        display: "flex",
        width: 281,
        justifyContent: "center",
        color: Color.primaryBlue80,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_xs,
        textAlign: "center",
        textTransform: "capitalize",
        alignItems: "center",
    },
    hiWelcomeToBanklyParent: {
        top: 111,
        left: 40,
    },
    step11: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    text1: {
        fontSize: FontSize.size_xs,
    },
    text: {
        fontFamily: FontFamily.poppinsRegular,
    },
    step1: {
        color: Color.primaryBlue100,
    },
    text3: {
        fontSize: 10,
        color: Color.primaryBlue80,
    },
    step15: {
        left: 150,
        top: 40,
        position: "absolute",
    },
    text4: {
        color: Color.primaryBlue100,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
    },
    arrowDropDownIcon: {
        width: 16,
        height: 16,
        overflow: "hidden",
    },
    frameChild: {
        backgroundColor: Color.primaryBlue20,
        borderStyle: "solid",
        borderColor: Color.primaryBlue20,
        borderRightWidth: 1,
        width: 1,
        height: 33,
    },
    text5: {
        color: Color.primaryBlue20,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
    },
    frameGroup: {
        gap: 9,
    },
    frameWrapper: {
        backgroundColor: "rgba(210, 216, 232, 0.3)",
        height: 55,
        padding: Padding.p_mini,
    },
    frameItem: {
        maxHeight: "100%",
        width: 234,
    },
    receiveOtp: {
        color: Color.white,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    navigateNextIcon: {
        width: 25,
        height: 25,
    },
    receiveOtpParent: {
        backgroundColor: Color.primaryBlue100,
        height: 57,
        paddingHorizontal: 32,
        paddingVertical: 8,
        width: 286,
        borderRadius: Border.br_3xs,
        justifyContent: "center",
        overflow: "hidden",
    },
    frameParent: {
        top: 204,
        shadowColor: "rgba(30, 41, 59, 0.01)",
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
        gap: 15,
        padding: Padding.p_mini,
        left: 24,
        overflow: "hidden",
    },
    phoneNumber: {
        backgroundColor: "#f1f5f9",
        flex: 1,
        height: 800,
        overflow: "hidden",
        width: "100%",
    },
})

export default AadharNumberScreen;