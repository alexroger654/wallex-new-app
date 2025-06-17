import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { fontFamily, paddingHorizontal } from '../theme/theme'
import { useTheme } from '../context/ThemeProvider'
import { BellAlertIcon, ArrowLeftIcon } from "react-native-heroicons/solid";


export default function NavBar({ title, subTitle, navScreen, navigation }: { title: string, subTitle: string, navScreen?: string, navigation: any }) {

    const { color } = useTheme()

    return (
        <LinearGradient
            colors={['#6137F0', '#836CF9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}

            style={[styles.hero, {
                paddingHorizontal: paddingHorizontal
            }]}
        >

            {/* ====================== top ==================== */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10

            }}>
                <Pressable

                    onPress={() => {
                        if (navScreen) {
                            navigation?.navigate(navScreen)
                        } else {
                            navigation?.goBack()
                        }
                    }}
                    style={{
                        backgroundColor: color.white,
                        height: 34,
                        width: 34,
                        borderRadius: 34 / 2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <ArrowLeftIcon size={20} color={color.primary} />
                </Pressable>
                <View>
                    <Text style={[styles.nameText, {
                        color: color.white,
                        fontFamily: fontFamily
                    }]}>{title}</Text>
                    <Text style={[styles.subText, {
                        color: color.white,
                        fontSize: 12
                    }]}>{subTitle}</Text>
                </View>






            </View>


        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    hero: {
        width: '100%',
        height: 120,
        paddingTop: 30
    },
    nameText: {
        fontWeight: '700',
        fontSize: 20
    },
    subText: {
        fontSize: 16
    }
})