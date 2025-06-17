import * as React from "react";
import { Image, StyleSheet, Pressable, View, Text } from "react-native";

import { useNavigation, ParamListBase } from "@react-navigation/native";
import { ChevronLeftIcon, ChevronRightIcon, EnvelopeIcon, MapIcon, UserCircleIcon } from "react-native-heroicons/outline";
import { Border, Color, FontFamily, FontSize, Gap, Padding } from "../../GlobalStyles";


const PersonalDetailsScreen = ({ navigation }: any) => {


    return (
        <View style={styles.personalDetails}>
            <Pressable
                style={[styles.arrowBackIos, styles.iconLayout]}
                onPress={() => navigation.goBack()}
            >
                <ChevronLeftIcon size={22} color={Color.primaryBlue100} />
            </Pressable>
            <View style={styles.personalDetailsChild} />
            <Text style={[styles.personalDetails1, styles.step13Text]}>
                Personal details
            </Text>
            <Text style={[styles.step13, styles.nextTypo]}>
                <Text style={styles.step1}>Step 1</Text>
                <Text style={styles.text}>/3</Text>
            </Text>
            <View style={[styles.fieldParent, styles.fieldParentPosition]}>
                <View style={styles.field}>
                    <Text style={[styles.fullName, styles.text1Text]}>full name*</Text>
                    <View style={[styles.fieldInner, styles.innerLayout]}>
                        <View style={styles.personParent}>
                            <UserCircleIcon size={22} color={Color.primaryBlue20} />
                            <Text style={[styles.johnSmith, styles.johnTypo]}>
                                john smith
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.errorWillBe, styles.errorTypo]}>
                        Error will be here
                    </Text>
                </View>
                <View style={styles.field}>
                    <Text style={[styles.fullName, styles.text1Text]}>
                        Email Address*
                    </Text>
                    <View style={[styles.fieldInner, styles.innerLayout]}>
                        <View style={styles.personParent}>
                            <EnvelopeIcon size={22} color={Color.primaryBlue20} />
                            <Text style={[styles.johnSmith1, styles.johnTypo]}>
                                example@site.com
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.errorWillBe1, styles.nextText]}>
                        Error will be here
                    </Text>
                </View>
                <View style={styles.phoneNumberParent}>
                    <Text style={[styles.fullName, styles.text1Text]}>Phone Number*</Text>
                    <View style={[styles.fieldInner, styles.innerLayout]}>
                        <View style={styles.personParent}>
                            <View style={styles.parent}>
                                <Text style={[styles.text1, styles.text1Text]}>+91</Text>

                            </View>
                            <View style={styles.frameChild} />
                            <Text style={[styles.johnSmith, styles.johnTypo]}>
                                00000 00000
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={[styles.fullName, styles.text1Text]}>Address*</Text>
                    <View style={styles.frameView}>
                        <View style={styles.parent}>
                            <Text style={[styles.enterYourAddress, styles.johnTypo]}>
                                Enter your address....
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.errorWillBe1, styles.nextText]}>
                        Error will be here
                    </Text>
                </View>
                <View style={styles.nameParent}>
                    <View style={styles.name}>
                        <Text style={styles.citydistricttown}>City/District/Town</Text>
                        <View style={[styles.nameInner, styles.innerLayout]}>
                            <View style={styles.frameGroup}>
                                <View style={styles.personParent}>
                                    <MapIcon size={22} color={Color.primaryBlue20} />
                                    <Text style={[styles.select, styles.johnTypo]}>Select</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={styles.name}>
                        <Text style={styles.citydistricttown}>Pincode</Text>
                        <View style={[styles.nameInner, styles.innerLayout]}>
                            <View style={styles.parent}>
                                <Text style={[styles.select, styles.johnTypo]}>000000000</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Pressable style={styles.nextParent} onPress={() => {
                navigation?.navigate('GuardianDetailsScreen')
            }}>
                <Text style={[styles.next, styles.nextText]}>Next</Text>
                <ChevronRightIcon size={18} color={Color.white} style={{
                    marginTop: 2
                }} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    iconLayout: {
        height: 24,
        width: 24,
    },
    step13Text: {
        textAlign: "center",
        color: Color.primaryBlue100,
        textTransform: "capitalize",
        position: "absolute",
    },
    nextTypo: {
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    fieldParentPosition: {
        left: 24,
        position: "absolute",
    },
    text1Text: {
        textAlign: "left",
        textTransform: "capitalize",
    },
    innerLayout: {
        padding: Padding.p_mini,
        height: 50,
        justifyContent: "center",
        backgroundColor: Color.colorLavender_100,
        borderRadius: Border.br_3xs,
    },
    johnTypo: {
        color: Color.primaryBlue20,
        textAlign: "left",
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    errorTypo: {
        color: Color.colorRed,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_3xs,
    },
    nextText: {
        display: "none",
        textAlign: "left",
        textTransform: "capitalize",
    },
    icon: {
        height: "100%",
        width: "100%",
    },
    arrowBackIos: {
        top: 40,
        left: 24,
        position: "absolute",
    },
    personalDetailsChild: {
        top: 111,
        left: 40,
        width: 197,
        height: 36,
        alignItems: "center",
        position: "absolute",
    },
    personalDetails1: {
        top: 82,
        left: 81,
        fontSize: 24,
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
    },
    step1: {
        fontSize: FontSize.size_base,
    },
    text: {
        fontSize: FontSize.size_xs,
    },
    step13: {
        left: 150,
        textAlign: "center",
        color: Color.primaryBlue100,
        textTransform: "capitalize",
        position: "absolute",
        top: 40,
    },
    fullName: {
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        color: Color.primaryBlue100,
        textAlign: "left",
    },
    personIcon: {
        overflow: "hidden",
    },
    johnSmith: {
        fontSize: FontSize.size_base,
        textTransform: "capitalize",
        color: Color.primaryBlue20,
    },
    personParent: {
        gap: Gap.gap_md,
        flexDirection: "row",
        alignItems: "center",
    },
    fieldInner: {
        width: 312,
    },
    errorWillBe: {
        textAlign: "left",
        textTransform: "capitalize",
    },
    field: {
        gap: Gap.gap_sm,
        width: 312,
    },
    johnSmith1: {
        fontSize: FontSize.size_base,
    },
    errorWillBe1: {
        color: Color.colorRed,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_3xs,
    },
    text1: {
        fontSize: FontSize.size_base,
        color: Color.primaryBlue100,
        textAlign: "left",
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
    },
    arrowDropDownIcon: {
        width: 16,
        height: 16,
        overflow: "hidden",
    },
    parent: {
        flexDirection: "row",
        alignItems: "center",
    },
    frameChild: {
        backgroundColor: Color.primaryBlue20,
        borderStyle: "solid",
        borderColor: Color.primaryBlue20,
        borderRightWidth: 1,
        width: 1,
        height: 25,
    },
    phoneNumberParent: {
        gap: Gap.gap_sm,
    },
    enterYourAddress: {
        fontSize: 13,
    },
    frameView: {
        height: 102,
        padding: 10,
        backgroundColor: Color.colorLavender_100,
        borderRadius: Border.br_3xs,
        width: 312,
    },
    citydistricttown: {
        color: Color.primaryBlue80,
        fontSize: FontSize.size_3xs,
        textAlign: "left",
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    locationOnIcon: {
        width: 19,
        height: 19,
        overflow: "hidden",
    },
    select: {
        fontSize: FontSize.size_xs,
    },
    arrowDropDownIcon1: {
        width: 23,
        height: 23,
        overflow: "hidden",
    },
    frameGroup: {
        width: 120,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    nameInner: {
        width: 148,
    },
    name: {
        width: 148,
        gap: Gap.gap_sm,
    },
    nameParent: {
        gap: 16,
        flexDirection: "row",
    },
    fieldParent: {
        top: 140,
        gap: 15,
        width: 312,
    },
    next: {
        color: Color.white,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: "500",
    },
    navigateNextIcon: {
        width: 32,
        height: 32,
    },
    nextParent: {
        top: 687,
        left: 144,
        borderRadius: 50,
        backgroundColor: Color.primaryBlue100,
        width: 72,
        height: 72,
        paddingHorizontal: 32,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        overflow: "hidden",
    },
    personalDetails: {
        backgroundColor: Color.secondaryColors100,
        flex: 1,
        height: 800,
        overflow: "hidden",
        width: "100%",
    },
});

export default PersonalDetailsScreen;