import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import usePostData from '../../shared/fetch/usePostData';
import Loading from '../../component/Loading';

const AdjustSplitScreen = ({navigation, route}: any) => {
  const [splitOption, setSplitOption] = useState('Equally'); // 'Equally', 'Unequally', 'By %'
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const data = route?.params?.data;
  const amount = route?.params?.amount;

  useEffect(() => {
    if (splitOption == 'Equally') {
      const singlePrice = parseInt(amount) / data?.members?.length;
      setPrice(singlePrice as any);
    }
  }, [amount, data?.members?.length, splitOption]);

  const renderParticipant = ({item}: any) => {
    return (
      <View style={styles.participantRow}>
        <View style={styles.participantInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{item?.fullName?.slice(0, 2)}</Text>
          </View>
          <Text style={styles.participantName}>{item.fullName}</Text>
        </View>
        {splitOption === 'Equally' && (
          // <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: Color.primaryBlue100,
            }}>
            {price}
          </Text>
        )}
        {splitOption === 'Unequally' && (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="₹"
          />
        )}
        {splitOption === 'By %' && (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="%"
          />
        )}
      </View>
    );
  };

  const createGroup = async () => {
    setLoading(true);
    const result = await usePostData(
      'split-bills/expenses',
      {
        splitBillId: data?.id,
        paidBy: '9620992993',
        totalExpense: amount,
        note: 'Test 3',
        category: 'Food',
        divideExpense: splitOption, // ["equally", "unequally"]
        paidFor: [
          {
            mobile: '1763943389',
            amount: price,
          },
          {
            mobile: '9620992993',
            amount: price,
          },
        ],
      },
      'service',
    );

    if (result) {
      navigation.navigate('SplitBillHomeScreen');
    }

    navigation.navigate('SplitBillHomeScreen');
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <ChevronLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Adjust Split</Text>
        <View />
      </View>

      {/* Split Options */}
      <View style={styles.splitOptionsContainer}>
        <Text style={styles.splitText}>Paid By</Text>
        <Text style={styles.splitText}>You</Text>
        <Text style={styles.splitText}>Add Split</Text>

        <TouchableOpacity
          style={styles.splitDropdown}
          onPress={() => {
            setSplitOption(
              splitOption === 'Equally'
                ? 'Unequally'
                : splitOption === 'Unequally'
                ? 'By %'
                : 'Equally',
            );
          }}>
          <Text style={styles.splitDropdownText}>{splitOption}</Text>
        </TouchableOpacity>
      </View>

      {/* Participants */}
      <FlatList
        data={data?.members}
        renderItem={renderParticipant}
        keyExtractor={item => item?.mobile}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalAmount}>
          ₹{amount} ({data?.members?.length} Persons)
        </Text>
        <TouchableOpacity onPress={createGroup} style={styles.splitButton}>
          <Text style={styles.splitButtonText}>Split</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  splitOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  splitText: {
    fontSize: 16,
    color: Color.secondaryColors500,
  },
  splitDropdown: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Color.secondaryColors200,
    borderRadius: 8,
  },
  splitDropdownText: {
    fontSize: 16,
    color: Color.primaryBlue100,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.secondaryColors500,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  participantName: {
    fontSize: 16,
    color: '#000',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  input: {
    width: 90,
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  splitButton: {
    backgroundColor: Color.primaryBlue100,
    paddingVertical: 15,
    paddingHorizontal: 44,
    borderRadius: 8,
  },
  splitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AdjustSplitScreen;
