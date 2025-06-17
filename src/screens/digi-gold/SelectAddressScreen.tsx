import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline';
import {Color, Padding} from '../../GlobalStyles';
import usePostData from '../../shared/fetch/usePostData';
import useGetData from '../../shared/fetch/useGetData';
import {Toast} from 'react-native-toast-notifications';
import IAddress from '../../interfaces/address.interface';
import Loading from '../../component/Loading';
import {useDigiGoldCart} from '../../context/DigiGoldCartContext';
import makeOrder from '../../shared/fetch/makeOrder';
import {useAuth} from '../../context/AuthContext';

const SelectAddressScreen = ({navigation}: any) => {
  const [address, setAddress] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();

  const [selectedAddress, setSelectedAddress] = useState<IAddress>({});

  const {items, clearCart, totalPrice} = useDigiGoldCart();

  async function getAddress() {
    setLoading(true);
    const data = await useGetData(
      `user-address?user_id=66292db9d603a297d4535585`,
    );
    setAddress(data);
    setLoading(false);
  }

  async function delteAddress(address_id: string) {
    setLoading(true);
    const data = await usePostData('delete-user-address', {
      user_id: '66292db9d603a297d4535585',
      address_id: address_id,
    });

    Toast.show('Address Deleted', {
      type: 'danger',
    });
    setLoading(false);
  }

  async function orderProduct() {
    setLoading(true);
    const data = await usePostData('order', {
      user_id: '7uetAIKRUPKTb-sCe',
      mobileNumber: '9620992993',
      addressId: 'K7l42r7g',
      products: [
        {
          sku: 'AU999GC01R',
          quantity: '1',
        },
      ],
    });
    navigation?.navigate('DigiGoldHomeScreen');
    setLoading(false);
    clearCart();
    Toast.show('order placed');
  }

  async function handlePaymentAndOrder() {
    const products = items?.map(item => {
      return {
        type: 'digi-gold',
        sku: item.sku,
        variant_id: item?.id || '',
        price: item?.totalPrice * 100,
        offer_price: 0,
        tax_amount: 0,
        quantity: item?.quantity,
        name: item?.name,
        description: item?.metalType,
        weight: 0,
        image_url: item?.productImages[0]?.url,
      };
    });

    const biling = {
      line1: selectedAddress.address,
      line2: '',
      city: selectedAddress.cityName,
      state: selectedAddress.stateName,
      country: 'India',
      pincode: selectedAddress.pincode,
    };

    const result = await makeOrder(
      user?._id as string,
      totalPrice,
      selectedAddress.email,
      selectedAddress.name,
      selectedAddress.mobileNumber,
      biling,
      biling,
      products,
    );

    if (result) {
      orderProduct();
    }
  }

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    setSelectedAddress(address[0]);
  }, [address?.length]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Pressable onPress={() => navigation?.goBack()} style={styles.header}>
          <ArrowLeftIcon size={24} color="#fff" />
          <Text style={styles.headerTitle}>Billing Address</Text>
        </Pressable>

        <View
          style={{
            padding: Padding.p_xl,
          }}>
          {/* Address Card */}
          {address.map(item => (
            <Pressable
              onPress={() => setSelectedAddress(item)}
              key={item?.userAddressId}
              style={[
                styles.addressCard,
                {
                  borderWidth:
                    selectedAddress.userAddressId == item?.userAddressId
                      ? 1
                      : 0,
                  borderColor: '#4CAF50',
                },
              ]}>
              <View style={styles.row}>
                <MapPinIcon size={24} color="#606060" />
                <View style={styles.addressDetails}>
                  <Text style={styles.name}>{item?.name}</Text>
                  <Text style={styles.address}>
                    {item?.address} {item?.cityName} {item?.stateName}
                  </Text>
                </View>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => delteAddress(item.userAddressId)}>
                  <TrashIcon size={20} color="#F44336" />
                </TouchableOpacity>
              </View>

              {/* ============ selected address=========== */}
              {selectedAddress.userAddressId == item?.userAddressId ? (
                <>
                  <View
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}>
                    <Text style={styles.defaultBadge}>Selected</Text>
                  </View>
                </>
              ) : (
                <></>
              )}
            </Pressable>
          ))}

          {/* Add New Address */}
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAddressScreen')}
            style={styles.addAddressButton}>
            <Text style={styles.addAddressText}>+ Add New Address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Proceed Button */}
      <View
        style={{
          padding: 16,
        }}>
        <TouchableOpacity
          onPress={() => handlePaymentAndOrder()}
          style={styles.proceedButton}>
          <Text style={styles.proceedText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondaryColors100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.primaryBlue100,
    padding: 18,
    paddingVertical: 22,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  addressCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressDetails: {
    marginLeft: 8,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#606060',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'flex-end',
  },
  defaultBadge: {
    backgroundColor: '#E0F7EA',
    color: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 12,
  },
  addAddressButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#606060',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  addAddressText: {
    fontSize: 16,
    color: '#606060',
  },
  proceedButton: {
    backgroundColor: '#002B6B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectAddressScreen;
