import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../GlobalStyles';
import {PaperAirplaneIcon} from 'react-native-heroicons/outline';

export default function Activity({data}: any) {
  return (
    <View
      style={[
        styles.activityCard,
        {
          backgroundColor: Color.white,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}>
      <View>
        <Text
          style={{
            fontSize: 16,
            color: Color.primaryBlue100,
            fontWeight: '800',
          }}>
          {data?.title}
        </Text>
        <Text
          style={[
            styles.activityAmount,
            {
              color: data?.color,
            },
          ]}>
          {data?.amount}
        </Text>
        {data?.paymentBy && (
          <Text style={styles.paymentBy}>{data?.paymentBy}</Text>
        )}
      </View>
      {data?.showIcon && (
        <View
          style={{
            backgroundColor: data?.iconBackground,
            height: 30,
            width: 30,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <PaperAirplaneIcon size={18} color={Color.white} />
        </View>
      )}
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
