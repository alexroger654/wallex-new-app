import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import {Color, Padding} from '../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import usePostData from '../../shared/fetch/usePostData';
import {Toast} from 'react-native-toast-notifications';
import Contacts from 'react-native-contacts';
import Loading from '../../component/Loading';

interface FormData {
  name: string;
  emailId: string;
  city: string;
  state: string;
  pincode: string;
  mobileNumber: string;
  address: string;
}

export default function SelectContactOrProvider({navigation, route}: any) {
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Allow',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Permission to access contacts was denied');
          return;
        }
      }

      Contacts.getAll()
        .then(contacts => {
          setContacts(contacts);
        })
        .catch(err => {
          console.warn('Error fetching contacts:', err);
        });
      setLoading(false);
    };
    setLoading(true);
    getContacts();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (contacts?.length) {
      const result = contacts?.filter(
        (item: any) =>
          item.displayName?.toLowerCase()?.includes(searchText) ||
          item?.phoneNumbers[0]?.number?.includes(searchText),
      );

      setContacts(result);
    }
  }, [searchText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  //   ================= render ===========================
  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable onPress={() => navigation.goBack()} style={styles.header}>
        <ChevronLeftIcon size={24} color="#fff" />
        <Text style={styles.headerText}>
          {route?.params?.type == 'mobileRecharge'
            ? 'Mobile Recharge'
            : route?.params?.type}
        </Text>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/BharatBillPay.png')}
        />
      </Pressable>

      <ScrollView
        style={{
          padding: Padding.p_13xl,
        }}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={Color.colorGray}
            value={searchText}
            onChangeText={value => setSearchText(value)}
          />
        </View>

        {route?.params?.type == 'mobileRecharge' ? (
          <>
            {contacts?.length ? (
              contacts?.map((item: any) => (
                <Pressable
                  onPress={() =>
                    navigation?.navigate('BillPaymentScreen', {
                      type: 'mobileRecharge',
                      mobile: item?.phoneNumbers[0]?.number,
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                    gap: 14,
                  }}>
                  <Text
                    style={{
                      fontWeight: '800',
                      color: Color.primaryBlue80,
                      backgroundColor: Color.primaryBlue20,
                      padding: 20,
                      borderRadius: 100,
                    }}>
                    {item?.displayName?.slice(0, 2)}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontWeight: '800',
                        color: Color.primaryBlue80,
                      }}>
                      {item?.displayName}
                    </Text>
                    <Text
                      style={{
                        color: Color.primaryBlue80,
                      }}>
                      {item?.phoneNumbers[0]?.number}
                    </Text>
                  </View>
                </Pressable>
              ))
            ) : (
              <>
                <Text
                  style={{
                    color: Color.primaryBlue20,
                    fontWeight: '900',
                    fontSize: 30,
                    flex: 1,
                  }}>
                  NO CONTACT FOUND
                </Text>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </ScrollView>

      {searchText?.length == 10 && contacts?.length < 1 ? (
        <>
          <View
            style={{
              padding: 20,
              backgroundColor: Color.white,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('BillPaymentScreen', {
                  type: 'mobileRecharge',
                  mobile: searchText,
                })
              }
              style={{
                backgroundColor: Color.primaryBlue100,
                padding: 12,
                borderRadius: 12,
                alignItems: 'center',
                paddingVertical: 20,
              }}
              // onPress={handleRecharge}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Proceed to Pay
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}

      {/* Save Button */}
      {/* <View style={{padding: 14}}>
        <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.primaryBlue100,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.colorRed,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: Color.secondaryColors100,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#1A387D',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
