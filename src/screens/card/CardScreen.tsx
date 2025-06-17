import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Color} from '../../GlobalStyles';
import Offers from '../../component/Offers';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useAuth} from '../../context/AuthContext';

const screenHeight = Dimensions.get('window').height;
const GradientBackground = ({navigation}: any) => {
  const {user} = useAuth();

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          width: '100%',
          backgroundColor: 'transparent',
          zIndex: 200,
          paddingVertical: 24,
          paddingHorizontal: 14,
        }}>
        <View>
          <Text
            style={{
              color: Color.white,
              fontWeight: '900',
              fontSize: 24,
            }}>
            Hi {user?.full_name},
          </Text>
          <Text
            style={{
              color: Color.white,
              fontSize: 16,
            }}>
            What’s your plan today?
          </Text>
        </View>
        <Pressable onPress={() => navigation?.navigate('MyAccountScreen')}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
            source={{
              uri:
                user?.profile_picture ||
                'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg',
            }}
          />
        </Pressable>
      </View>
      <LinearGradient
        colors={['#26262D', '#121316']} // Gradient colors
        style={styles.container}>
        <Image
          style={{
            width: 290,
            height: 400,
            borderRadius: 16,
          }}
          resizeMode="cover"
          source={require('../../../assets/home/cardg.png')}
        />
        <Image
          style={{
            width: '100%',
            height: 80,
            borderRadius: 16,
          }}
          resizeMode="contain"
          source={require('../../../assets/home/Text.png')}
        />
      </LinearGradient>

      <View
        style={{
          flex: 1,
        }}>
        <Offers />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    width: '100%',
    height: screenHeight,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GradientBackground;
