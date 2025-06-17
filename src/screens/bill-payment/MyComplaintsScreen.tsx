import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import {IComplaint} from '../../shared/interfaces/complaint.interface';
import useGetData from '../../shared/fetch/useGetData';

const MyComplaintsScreen = () => {
  // ======================= states =====================
  const [complaints, setComplaints] = useState<IComplaint[]>([]);

  const transactions = Array(10).fill({
    title: 'Bill for Indian oil gas',
    status: 'Success',
    date: "03 Nov'23, 04:55 PM",
    amount: '₹ 19.00',
  });

  async function getComplaints() {
    const restult = await useGetData(
      'bbps/complaints/list?searchTerm=dlkdkljdflioejdf',
      'service',
    );
    setComplaints(restult?.data);
  }

  useEffect(() => {
    getComplaints();
  }, []);

  //   =========================== render =======================

  const renderItem = ({item}: {item: IComplaint}) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <View style={styles.iconContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/50'}}
            style={styles.transactionIcon}
          />
        </View>
        <View>
          <Text style={styles.transactionTitle}>
            {item.complaintDesc?.slice(0, 25)}
          </Text>
          <Text style={styles.transactionStatus}>
            <Text style={styles.statusSuccess}>{item.status}</Text> •
            {item.createdAt?.slice(0, 10)}
          </Text>
        </View>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ChevronLeftIcon size={24} color="#fff" />
        <Text style={styles.headerText}>My Complaints</Text>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/BharatBillPay.png')}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <View style={styles.searchInputContainer}>
          <MagnifyingGlassIcon size={20} color="#A1A1A1" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Transaction"
            placeholderTextColor="#A1A1A1"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <AdjustmentsHorizontalIcon size={20} color="#003366" />
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <View
        style={{
          backgroundColor: Color.white,
        }}>
        <FlatList
          data={complaints}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.transactionList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7FC',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003366',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Color.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    color: '#333333',
  },
  filterButton: {
    padding: 10,
    backgroundColor: Color.white,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  transactionList: {
    padding: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  transactionIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue80,
    marginBottom: 4,
  },
  transactionStatus: {
    fontSize: 12,
    color: Color.primaryBlue50,
  },
  statusSuccess: {
    color: '#28A745',
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
});

export default MyComplaintsScreen;
