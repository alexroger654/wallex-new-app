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
import {
  ChevronLeftIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';
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

export default function SelectGroupContactScreen({navigation, route}: any) {
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [contacts, setContacts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>([]);
  const [groupName, setGroupName] = useState<any>('');

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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // =================== create group

  const createGroup = async () => {
    setLoading(true);
    const result = await usePostData(
      'split-bills',
      {
        title: 'Demo Split 5',
        members: [
          {
            fullName: 'Mr X',
            mobile: '9620992993',
            // "exclude": true
          },
          {
            // CURRENT USER INFO REQUIRED
            mobile: '1763943389',
            fullName: 'Prosenjit',
            // "exclude": true
          },
        ],
      },
      'service',
    );

    if (result) {
      navigation.navigate('AddExpenseScreen', {
        data: result?.data,
      });
    }

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  //   ================= render ===========================
  return (
    <View style={styles.container}>
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

      <ScrollView
        style={{
          marginTop: 30,
        }}>
        <View
          style={{
            padding: 14,
          }}>
          <TextInput
            onChange={e => setGroupName(e)}
            placeholder="Group Name"
            style={{
              height: 50,
              borderWidth: 0.3,
              borderColor: Color.secondaryColors400,
              borderRadius: 14,
              paddingHorizontal: 16,
              marginBottom: 12,
            }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 16,
          }}>
          {contacts?.map((item: any) => (
            <Pressable
              onPress={() => {
                const contact = {
                  name: item?.displayName,
                  number: item?.phoneNumbers[0]?.number,
                };

                const isAlreadySelected = selectedContact?.some(
                  (i: any) => i.number === contact.number,
                );

                if (isAlreadySelected) {
                  // Remove the contact if already selected
                  const rest = selectedContact?.filter(
                    (i: any) => i.number !== contact.number,
                  );
                  setSelectedContact(rest);
                } else {
                  // Add the contact
                  setSelectedContact([...selectedContact, contact]);
                }
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                gap: 14,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
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
              </View>

              {selectedContact?.some(
                (contact: any) =>
                  contact.number === item?.phoneNumbers[0]?.number,
              ) ? (
                <View
                  style={{
                    backgroundColor: '#f4cfd2',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 45,
                    height: 45,
                    borderRadius: 35,
                  }}>
                  <XMarkIcon color={'#fe4848'} size={34} />
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: Color.primaryBlue100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 45,
                    height: 45,
                    borderRadius: 35,
                  }}>
                  <PlusIcon color={Color.white} size={34} />
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: Color.white,
          paddingHorizontal: 16,
          paddingVertical: 28,
          elevation: 4,
          borderTopEndRadius: 16,
          borderTopStartRadius: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              style={{
                width: 30,
                borderRadius: 14,
                height: 30,
                marginHorizontal: 'auto',
              }}
              source={{
                uri: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940',
              }}
            />
            <Image
              style={{
                width: 30,
                borderRadius: 14,
                height: 30,
                marginHorizontal: 'auto',
                marginLeft: -8,
              }}
              source={{
                uri: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940',
              }}
            />
            <Image
              style={{
                width: 30,
                borderRadius: 14,
                height: 30,
                marginHorizontal: 'auto',
                marginLeft: -8,
              }}
              source={{
                uri: 'https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940',
              }}
            />
          </View>
          <Text
            style={[
              styles.headerText,
              {
                color: Color.primaryBlue100,
              },
            ]}>
            {selectedContact?.length} Contact Selected
          </Text>
        </View>

        <Pressable
          onPress={createGroup}
          style={{
            backgroundColor: Color.primaryBlue100,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 24,
            marginTop: 24,
          }}>
          <Text
            style={[
              styles.headerText,
              {
                color: Color.white,
              },
            ]}>
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondaryColors100,
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
