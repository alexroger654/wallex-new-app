import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Color} from '../../GlobalStyles';
import {PaperAirplaneIcon, PencilIcon} from 'react-native-heroicons/outline';

interface IMember {
  mobile: string;
  fullName: string;
  exclude: boolean;
}

interface ISplitRecord {
  _id: string;
  createdAt: string;
  createdBy: string;
  loanRecords: any[];
  members: IMember[];
  settledRecords: any[];
  status: 'in-progress' | 'completed' | 'pending';
  title: string;
  totalExpenses: number;
  updatedAt: string;
}

export default function Group({data}: {data: ISplitRecord}) {
  return (
    <View
      style={[
        styles.activityCard,
        {
          backgroundColor: Color.white,
        },
      ]}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 12,
          },
        ]}>
        <View>
          <Text
            style={{
              fontSize: 16,
              color: Color.secondaryColors700,
              fontWeight: '800',
            }}>
            {data?.title}
          </Text>
          <Text
            style={{
              fontSize: 9,
              color: Color.secondaryColors500,
              fontWeight: '800',
            }}>
            {data?.members?.length} Members
          </Text>
        </View>
        <Image
          style={{
            width: 25,
            borderRadius: 14,
            height: 25,
          }}
          source={{
            uri: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940',
          }}
        />
      </View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              style={{
                width: 20,
                borderRadius: 14,
                height: 20,
                marginHorizontal: 'auto',
              }}
              source={{
                uri: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940',
              }}
            />
            <Image
              style={{
                width: 20,
                borderRadius: 14,
                height: 20,
                marginHorizontal: 'auto',
                marginLeft: -8,
              }}
              source={{
                uri: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940',
              }}
            />
            <Image
              style={{
                width: 20,
                borderRadius: 14,
                height: 20,
                marginHorizontal: 'auto',
                marginLeft: -8,
              }}
              source={{
                uri: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940',
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: Color.primaryBlue100,
              alignItems: 'center',
              justifyContent: 'center',
              width: 25,
              height: 25,
              borderRadius: 15,
            }}>
            <PencilIcon color={Color.white} size={14} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityCard: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 8,
    width: 260,
  },
  activityTitle: {
    fontSize: 13,
    color: '#6E6E6E',
  },
  activityAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  paymentBy: {
    fontSize: 12,
    color: '#6E6E6E',
    marginTop: 4,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 16,
  },
});
