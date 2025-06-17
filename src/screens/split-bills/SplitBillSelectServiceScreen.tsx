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

export default function SplitBillSelectServiceScreen({navigation}: any) {
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
          onPress={() => navigation?.navigate('EntertainmentServiceScreen')}
          style={{
            width: '48%',
            backgroundColor: Color.white,
            borderRadius: 20,
            paddingVertical: 10,
          }}>
          <Image
            style={{
              width: 146,
              borderRadius: 14,
              height: 158,
              marginHorizontal: 'auto',
            }}
            source={require('../../../assets/splitbill/entertainment.png')}
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
              width: 146,
              borderRadius: 14,
              height: 158,
              marginHorizontal: 'auto',
            }}
            source={require('../../../assets/splitbill/group-payments.png')}
          />
        </Pressable>
        <View
          style={{
            width: '48%',
            backgroundColor: Color.white,
            borderRadius: 20,
            paddingVertical: 10,
          }}>
          <Image
            style={{
              width: 146,
              borderRadius: 14,
              height: 158,
              marginHorizontal: 'auto',
            }}
            source={require('../../../assets/splitbill/travel-services.png')}
          />
        </View>
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
