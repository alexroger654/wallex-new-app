import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const ExpensesScreen = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#f4f8fc'}}>
      {/* Expense Cards */}
      <View style={{padding: 16}}>
        {[
          {
            category: 'Food',
            amount: 2000,
            paidBy: 'You',
            action: 'Lent',
            color: '#0F9D58',
          },
          {
            category: 'Trip',
            amount: 20000,
            paidBy: 'Abhishek',
            action: 'Owe',
            color: '#DB4437',
          },
          {
            category: 'Trip',
            amount: 20000,
            paidBy: 'Abhishek',
            action: 'Owe',
            color: '#DB4437',
          },
        ].map((expense, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#333'}}>
                {expense.category}
              </Text>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#333'}}>
                ₹{expense.amount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 14, color: '#666'}}>
                {expense.paidBy === 'You'
                  ? `You paid ₹${expense.amount}`
                  : `${expense.paidBy} paid ₹${expense.amount}`}
              </Text>
              <Text style={{fontSize: 14, color: expense.color}}>
                {`You ${expense.action} ₹${expense.amount}`}
              </Text>
            </View>
          </View>
        ))}

        {/* Add Expense Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#f4f8fc',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingVertical: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}>
          <Text style={{fontSize: 16, color: '#666'}}>Add Expense +</Text>
        </TouchableOpacity>
      </View>

      {/* History Section */}
      <View style={{paddingHorizontal: 16}}>
        <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 8}}>
          History
        </Text>
        {[...Array(5)].map((_, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 12,
              marginBottom: 8,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                backgroundColor: '#f4f8fc',
                borderRadius: 4,
                padding: 4,
                marginRight: 8,
              }}>
              Mar 01
            </Text>
            <Text style={{fontSize: 14, color: '#333'}}>
              Salmaan Paid ₹250 to Prosenjit
            </Text>
          </View>
        ))}
      </View>

      {/* Settle Up Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#1a73e8',
          paddingVertical: 16,
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
          Settle-up
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ExpensesScreen;
