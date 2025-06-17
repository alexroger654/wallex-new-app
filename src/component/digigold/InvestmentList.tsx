import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Pressable,
} from 'react-native';
import {useTheme} from '../../context/ThemeProvider';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

const InvestmentList = ({transactions}: any) => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {color} = useTheme();
  const navigation = useNavigation();

  const handlePress = (transaction: any) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.item}>
      <View style={styles.iconContainer}>
        <View
          style={[
            styles.icon,
            {
              backgroundColor: item.type == 'silver' ? '#bebebe' : '#f7d001',
            },
          ]}></View>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item?.transactionId}</Text>
        <Text style={styles.time}>
          {new Date(item.createdAt).toLocaleTimeString()} -{' '}
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>+ ₹{item.inclTaxAmt.toFixed(2)}</Text>
        <Text
          style={[
            styles.status,
            item.type === 'success'
              ? styles.success
              : item.type === 'warning'
              ? styles.warning
              : styles.error,
          ]}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 16,
        }}>
        <FlatList
          data={transactions}
          keyExtractor={item => item.transactionId}
          renderItem={renderItem}
        />

        {/* Modal for displaying details */}
        {selectedTransaction && (
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text
                  style={[
                    styles.modalTitle,
                    {
                      color: color.primaryBlue100,
                    },
                  ]}>
                  Transaction Details
                </Text>
                <Text
                  style={{
                    color: color.primaryBlue100,
                    marginBottom: 12,
                    fontWeight: '600',
                  }}>
                  Transaction ID: {selectedTransaction.transactionId}
                </Text>

                <Text
                  style={{
                    color: color.primaryBlue100,
                    marginBottom: 12,
                    fontWeight: '600',
                  }}>
                  Type: {selectedTransaction.type}
                </Text>
                <Text
                  style={{
                    color: color.primaryBlue100,
                    marginBottom: 12,
                    fontWeight: '600',
                  }}>
                  Quantity: {selectedTransaction.qty}
                </Text>
                <Text
                  style={{
                    color: color.primaryBlue100,
                    marginBottom: 12,
                    fontWeight: '600',
                  }}>
                  Excl. Tax Amount: ₹{selectedTransaction.exclTaxAmt.toFixed(2)}
                </Text>
                <Text
                  style={{
                    color: color.primaryBlue100,
                    marginBottom: 12,
                    fontWeight: '600',
                  }}>
                  Incl. Tax Amount: ₹{selectedTransaction.inclTaxAmt.toFixed(2)}
                </Text>
                <Text
                  style={{
                    color: color.primaryBlue100,
                    marginBottom: 12,
                    fontWeight: '600',
                  }}>
                  Tax Amount: ₹{selectedTransaction.taxAmt}
                </Text>
                <Text
                  style={{
                    color: color.primaryBlue100,
                    marginBottom: 12,
                    fontWeight: '600',
                  }}>
                  Created At:{' '}
                  {new Date(selectedTransaction.createdAt).toLocaleString()}
                </Text>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={{
                    backgroundColor: color.primaryBlue100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 14,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      color: color.white,
                      fontWeight: '600',
                    }}>
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // Green placeholder for icon
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#777',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 12,
    marginTop: 4,
  },
  success: {
    color: 'green',
  },
  warning: {
    color: 'orange',
  },
  error: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default InvestmentList;
