import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";
import FastImage from "react-native-fast-image";

const LoadingScreen = ({ navigation }: any) => {






    // ============== render ==================
    return (
        <View style={styles.loading}>
            <FastImage
                style={styles.loadingGif}
                resizeMode="cover"
                source={require("../../assets/images/loading.gif")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingGif: {
        position: "absolute",
        width: 156,
        height: 126,
    },
    loading: {
        backgroundColor: Color.white,
        flex: 1,
        width: "100%",
        height: 800,
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default LoadingScreen;