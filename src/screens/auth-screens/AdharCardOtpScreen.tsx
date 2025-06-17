import * as React from "react";
import { Image, StyleSheet, Pressable, Text, View, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";

import { ChevronLeftIcon, ChevronRightIcon } from "react-native-heroicons/outline";
import { Color, FontFamily, FontSize, Gap } from "../../GlobalStyles";

const AdharCardOtpScreen = ({ navigation }: any) => {


    const [otp, setOtp] = React.useState<string[]>(['', '', '', '',]);
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

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
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
                    navigation?.goBack()
                }}
            >
                <ChevronLeftIcon size={22} color={Color.primaryBlue100} />
            </Pressable>
            <View style={styles.verifyYourAccountParent}>
                <Text style={[styles.verifyYourAccount, styles.step25Text]}>
                    You’re right there!!
                </Text>
                <Text style={[styles.enterTheOtpContainer, styles.text4FlexBox1]}>
                    <Text style={styles.enterTheOtpContainer1}>
                        <Text
                            style={styles.enterTheOtp}
                        >{`Enter The OTP sent to your registered mobile `}</Text>
                        <Text style={styles.edit}>edit</Text>
                    </Text>
                </Text>
            </View>
            <Text style={[styles.step25, styles.step25Text]}>
                <Text style={styles.step2}>
                    <Text style={[styles.step21, styles.step21Typo]}>Step 2</Text>
                    <Text style={styles.text}>
                        <Text style={styles.text1}>/</Text>
                    </Text>
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.text3}>5</Text>
                </Text>
            </Text>
            <View style={styles.frameParent}>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            value={digit}
                        />
                    ))}
                </View>
                <Pressable
                    style={[styles.enterOtpParent, styles.text4FlexBox]}
                    onPress={() => {
                        navigation?.navigate('HomeScreen')
                    }}
                >
                    <Text style={[styles.enterOtp, styles.step21Typo]}>Enter OTP</Text>
                    <ChevronRightIcon size={18} color={Color.white} style={{
                        marginTop: 2
                    }} />
                </Pressable>
            </View>
            <Text style={[styles.resendCodeInContainer, styles.step25Text]}>
                <Text style={styles.resendCodeIn}>
                    <Text style={styles.step21Typo}>Resend code in</Text>
                    <Text style={styles.textTypo}>{` `}</Text>
                </Text>
                <Text style={styles.textTypo}>
                    <Text style={styles.text10}>0:30</Text>
                </Text>
            </Text>
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
    },
    step25Position: {
        top: 40,
        position: "absolute",
    },
    step25Text: {
        textAlign: "center",
        textTransform: "capitalize",
    },
    text4FlexBox1: {
        display: "flex",
        textAlign: "center",
    },
    step21Typo: {
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    text4FlexBox: {
        justifyContent: "center",
        alignItems: "center",
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
    verifyYourAccount: {
        fontSize: 24,
        color: Color.primaryBlue100,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
    },
    enterTheOtp: {
        color: Color.colorSteelblue,
        textTransform: "capitalize",
    },
    edit: {

        color: Color.primaryBlue100,
    },
    enterTheOtpContainer1: {
        width: "100%",
    },
    enterTheOtpContainer: {
        width: 303,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_xs,
        alignItems: "center",
    },
    verifyYourAccountParent: {
        top: 111,
        left: 28,
        gap: 5,
        alignItems: "center",
        position: "absolute",
    },
    step21: {
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
        position: "absolute",
    },
    text4: {
        fontSize: FontSize.size_17xl,
        width: 21,
        height: 30,
        opacity: 0,
        display: "flex",
        textAlign: "center",
        color: Color.primaryBlue100,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    instanceChild: {
        width: 63,
        maxHeight: "100%",
    },
    parent: {
        gap: Gap.gap_md,
        alignItems: "center",
    },
    instanceParent: {
        width: 277,
        justifyContent: "space-between",
        paddingHorizontal: 0,
        paddingVertical: 9,
        flexDirection: "row",
        alignItems: "center",
    },
    frameChild: {
        width: 234,
        maxHeight: "100%",
    },
    enterOtp: {
        color: Color.white,
        textAlign: "left",
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textTransform: "capitalize",
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
        flexDirection: "row",
        overflow: "hidden",
    },
    frameParent: {
        top: 213,
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
        paddingHorizontal: 15,
        paddingVertical: 20,
        gap: 15,
        alignItems: "center",
        left: 24,
        position: "absolute",
        overflow: "hidden",
    },
    textTypo: {
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
    },
    resendCodeIn: {
        color: "#8f9dc5",
    },
    text10: {
        color: Color.colorSteelblue,
    },
    resendCodeInContainer: {
        top: 420,
        left: 108,
        fontSize: 14,
        position: "absolute",
    },
    otpVerification: {
        backgroundColor: Color.secondaryColors100,
        flex: 1,
        height: 800,
        overflow: "hidden",
        width: "100%",
    },
});

export default AdharCardOtpScreen;