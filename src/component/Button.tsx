import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeProvider'



interface Props {
    title: string
}




export default function Button({ title }: Props) {
    const { color } = useTheme()


    //========================= render ==========================
    return (
        <View style={{
            width: "100%",
            paddingVertical: 20,
            backgroundColor: color.primary,
            borderRadius: 40
        }}>
            <Text style={{
                color: color.white,
                textAlign: 'center'
            }}>
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({})