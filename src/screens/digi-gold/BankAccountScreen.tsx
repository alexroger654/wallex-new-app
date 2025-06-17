import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  PlusCircleIcon,
  PencilIcon,
  ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import useGetData from '../../shared/fetch/useGetData';
import {useAuth} from '../../context/AuthContext';
import {IUserBankAccount} from '../../interfaces/gold.bankaccount.interface';
import usePostData from '../../shared/fetch/usePostData';
import {useToast} from 'react-native-toast-notifications';

const BankAccountScreen = ({navigation}: any) => {
  const [bankAccounts, setBankAccounts] = useState<IUserBankAccount[]>([
    {
      userBankId: '59RVLl9A',
      uniqueId: '66292db9d603a297d4535585',
      bankId: null,
      bankName: null,
      accountNumber: '049112010000451',
      accountName: 'Rahul K',
      ifscCode: 'UBIN0804961',
      status: 'active',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [newAccount, setNewAccount] = useState({
    accountName: '',
    accountNumber: '',
    ifscCode: '',
  });

  const {user} = useAuth();
  const toast = useToast();

  // ======
  async function getBankAccount() {
    const data = await useGetData(`user-bank-list?user_id=${user?._id}`);
    setBankAccounts(data);
  }

  const handleCreateAccount = async () => {
    setLoading(true);
    const newBankAccount = {
      user_id: user?._id,
      accountNumber: newAccount.accountNumber,
      accountName: newAccount.accountName,
      ifscCode: newAccount.ifscCode,
    };

    const result = await usePostData(
      'create-user-bank-account',
      newBankAccount,
    );
    if (result) {
      setNewAccount({accountName: '', accountNumber: '', ifscCode: ''});
      setCreateModalVisible(false);
      getBankAccount();
      toast.show('Account Created');
      setLoading(false);
    } else {
      toast.show('Something Went Wrong', {
        type: 'danger',
      });
    }
  };

  const handleUpdateAccount = () => {
    // const updatedAccounts = bankAccounts.map(account =>
    //   account.userBankId === selectedAccount.userBankId
    //     ? {...account, ...selectedAccount}
    //     : account,
    // );
    // setBankAccounts(updatedAccounts);
    // setSelectedAccount(null);
    setUpdateModalVisible(false);
  };

  const renderBankAccount = ({item}: any) => (
    <View style={styles.card}>
      <Text style={styles.text}>Account Name: {item.accountName}</Text>
      <Text style={styles.text}>Account Number: {item.accountNumber}</Text>
      <Text style={styles.text}>IFSC Code: {item.ifscCode}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <TouchableOpacity
        onPress={() => {
          setSelectedAccount(item);
          setUpdateModalVisible(true);
        }}
        style={styles.iconButton}>
        <PencilIcon size={20} color="black" />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    getBankAccount();
  }, []);

  return (
    <>
      {/* Header */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          gap: 2,
          alignItems: 'center',
          backgroundColor: Color.primaryBlue100,
          paddingVertical: 24,
          paddingHorizontal: 14,
        }}>
        <ChevronLeftIcon size={20} color={Color.white} />
        <Text
          style={{
            color: Color.white,
          }}>
          Bank Accounts
        </Text>
      </Pressable>
      <View style={styles.container}>
        <FlatList
          data={bankAccounts}
          renderItem={renderBankAccount}
          keyExtractor={item => item.userBankId}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setCreateModalVisible(true)}>
          <PlusCircleIcon size={40} color={Color.primaryBlue100} />
        </TouchableOpacity>

        {/* Create Modal */}
        <Modal visible={isCreateModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View
              style={{
                backgroundColor: Color.white,
                width: '100%',
                padding: 16,
                borderRadius: 16,
              }}>
              <Text style={styles.modalTitle}>Create Bank Account</Text>
              <TextInput
                style={styles.input}
                placeholder="Account Name"
                value={newAccount.accountName}
                onChangeText={text =>
                  setNewAccount({...newAccount, accountName: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Account Number"
                value={newAccount.accountNumber}
                onChangeText={text =>
                  setNewAccount({...newAccount, accountNumber: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="IFSC Code"
                value={newAccount.ifscCode}
                onChangeText={text =>
                  setNewAccount({...newAccount, ifscCode: text})
                }
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderBlockColor: Color.primaryBlue100,
                  borderRadius: 16,
                  paddingVertical: 14,
                }}
                onPress={() => setCreateModalVisible(false)}>
                <Text
                  style={{
                    color: Color.primaryBlue100,
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Update Modal */}
        {selectedAccount && (
          <Modal
            visible={isUpdateModalVisible}
            transparent
            animationType="slide">
            <View style={styles.modalContainer}>
              <View
                style={{
                  backgroundColor: Color.white,
                  width: '100%',
                  padding: 16,
                  borderRadius: 16,
                }}>
                <Text style={styles.modalTitle}>Update Bank Account</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Account Name"
                  value={selectedAccount.accountName}
                  onChangeText={text =>
                    setSelectedAccount({...selectedAccount, accountName: text})
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Account Number"
                  value={selectedAccount.accountNumber}
                  onChangeText={text =>
                    setSelectedAccount({
                      ...selectedAccount,
                      accountNumber: text,
                    })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="IFSC Code"
                  value={selectedAccount.ifscCode}
                  onChangeText={text =>
                    setSelectedAccount({...selectedAccount, ifscCode: text})
                  }
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleUpdateAccount}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderBlockColor: Color.primaryBlue100,
                    borderRadius: 16,
                    paddingVertical: 14,
                  }}
                  onPress={() => setUpdateModalVisible(false)}>
                  <Text
                    style={{
                      color: Color.primaryBlue100,
                      textAlign: 'center',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondaryColors100,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  iconButton: {
    padding: 5,
    alignSelf: 'flex-end',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.primaryBlue100,
  },

  button: {
    backgroundColor: Color.primaryBlue100,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Color.secondaryColors100,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
});

export default BankAccountScreen;
