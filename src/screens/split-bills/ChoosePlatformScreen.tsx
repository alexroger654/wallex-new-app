import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {Color} from '../../GlobalStyles';

export default function ChoosePlatformScreen({navigation}: any) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity>
            <ChevronLeftIcon size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.headerText,
            {
              color: Color.primaryBlue100,
            },
          ]}>
          Choose Service
        </Text>
        <View></View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
          marginTop: 40,
        }}>
        <Pressable
          onPress={() => navigation?.navigate('SelectGroupContactScreen')}
          style={{
            width: '48%',
            backgroundColor: Color.white,
            borderRadius: 20,
            paddingVertical: 10,
          }}>
          <Image
            style={{
              width: '90%',
              borderRadius: 14,
              height: 158,
              marginHorizontal: 'auto',
            }}
            source={{
              uri: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940',
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation?.navigate('SelectGroupContactScreen')}
          style={{
            width: '48%',
            backgroundColor: Color.white,
            borderRadius: 20,
            paddingVertical: 10,
          }}>
          <Image
            style={{
              width: '90%',
              borderRadius: 14,
              height: 158,
              marginHorizontal: 'auto',
            }}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqA4wMdwtL1_CSKJ3BSzkmnSg1k4GwxaNsPQ&s',
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation?.navigate('SelectGroupContactScreen')}
          style={{
            width: '48%',
            backgroundColor: Color.white,
            borderRadius: 20,
            paddingVertical: 10,
          }}>
          <Image
            style={{
              width: '90%',
              borderRadius: 14,
              height: 158,
              marginHorizontal: 'auto',
            }}
            source={{
              uri: 'https://play-lh.googleusercontent.com/MatnfBcuMybabLlOqSeIF-z1Ddu8diD2j404zrbmfBlLpZp7ACv6LS7QbA1dvzIjyvA=w240-h480-rw',
            }}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
