import * as React from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    FontFamily,
    Padding,
    Gap,
    Color,
    FontSize,
    Border,
} from '../GlobalStyles';
import {
    ArrowDownOnSquareIcon,
    ArrowPathRoundedSquareIcon,
    ArrowsRightLeftIcon,
    ArrowUpOnSquareIcon,
    CreditCardIcon,
    CubeTransparentIcon,
    QrCodeIcon,
    UserCircleIcon,
} from 'react-native-heroicons/outline';

const HomeScreen = ({ navigation }: any) => {
    return (
        <View style={styles.homepage}>
            <ScrollView style={styles.container}>
                {/* features */}
                <View style={styles?.featuresContainer}>
                    <Pressable
                        onPress={() => {
                            navigation?.navigate('TopUpScreens');
                        }}
                        style={styles?.featureItem}>
                        <CreditCardIcon size={22} color={Color.primaryBlue100} />
                        <Text style={styles?.cardTitle}>Top Up</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation?.navigate('SelectContactScreen');
                        }}
                        style={styles?.featureItem}>
                        <ArrowUpOnSquareIcon size={22} color={Color.primaryBlue100} />
                        <Text style={styles?.cardTitle}>Send</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation?.navigate('BuyGoldSilverScreen');
                        }}
                        style={styles?.featureItem}>
                        <ArrowDownOnSquareIcon size={22} color={Color.primaryBlue100} />
                        <Text style={styles?.cardTitle}>Receive</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation?.navigate('TopUpScreens');
                        }}
                        style={styles?.featureItem}>
                        <ArrowsRightLeftIcon size={22} color={Color.primaryBlue100} />
                        <Text style={styles?.cardTitle}>Transfer</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <Pressable
                onPress={() => navigation?.navigate('PayUsingBanklyScreen')}
                style={[styles.qrCodeScannerParent]}>
                <QrCodeIcon size={22} color={Color.white} />
                <Text style={[styles.scanAndPay]}>Scan And Pay</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Color?.white,
    },
    featuresContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        elevation: 5,
        paddingHorizontal: 20,
        width: '100%',
    },
    featureItem: {
        backgroundColor: Color.secondaryColors100,
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    cardTitle: {
        fontFamily: FontFamily.poppinsMedium,
        fontWeight: '500',
        color: Color?.primaryBlue100,
        fontSize: FontSize?.size_xs,
    },
    qrCodeScannerIcon: {
        width: 24,
        height: 24,
        overflow: 'hidden',
    },
    scanAndPay: {
        fontSize: FontSize.size_base,
        textAlign: 'center',
        color: Color.white,
    },
    qrCodeScannerParent: {
        marginLeft: -102,
        top: 699,
        left: '50%',
        shadowColor: 'rgba(29, 171, 135, 0.2)',
        shadowRadius: 25,
        elevation: 25,
        paddingHorizontal: 30,
        paddingVertical: Padding.p_mini,
        borderRadius: Border.br_181xl,
        backgroundColor: Color.primaryGreen100,
        shadowOpacity: 1,
        gap: Gap.gap_sm,
        flexDirection: 'row',
        position: 'absolute',
    },
    homepage: {
        height: 800,
        overflow: 'hidden',
        width: '100%',
        flex: 1,
        backgroundColor: Color.white,
    },
});

export default HomeScreen;
