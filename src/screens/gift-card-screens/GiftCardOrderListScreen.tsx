import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Bars3Icon, ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import useGetData from '../../shared/fetch/useGetData';

const GiftCardOrderListScreen = ({navigation}: any) => {
  const [data, setData] = useState<IGiftCardOrder[]>([]);

  //fetch functions ========================================
  async function getGiftCard() {
    const data = await useGetData(
      'orders/my-orders?userId=65b20040898a05b473b9a0fd',
      'giftCard',
    );
    setData(data?.data);
  }

  useEffect(() => {
    getGiftCard();
  }, []);

  console.log(data);

  // Render Item
  const renderItem = ({item}: any) => {
    const products = item?.products; // Safely access products
    const product =
      products && Object.keys(products).length > 0
        ? Object.values(products)[0]
        : null; // Get the first product or set to null if unavailable

    if (!product) {
      return (
        <>
          {/* <View style={styles.card}>
            <Text style={{color: 'red'}}>No products available</Text>
          </View> */}
        </>
      );
    }

    return (
      <View style={styles.card}>
        {/* Product Image */}
        <Image
          source={{uri: product?.images?.thumbnail || 'placeholder_url'}}
          style={styles.thumbnail}
        />
        {/* Order Details */}
        <View style={styles.details}>
          <Text style={styles.orderId}>Order ID: {item?.orderId}</Text>
          <Text style={styles.productName}>{product?.name}</Text>
          <Text style={styles.price}>
            {item?.currency?.symbol} {item?.payments?.[0]?.balance}
          </Text>
          <Text style={styles.status}>Status: {item?.status}</Text>
          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {item?.cancel?.allowed ? 'Cancel Order' : 'View Details'}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  return (
    <>
      {/* Header */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          padding: 20,
          backgroundColor: '#243278',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <ChevronLeftIcon size={24} color="#FFFFFF" />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Orders
          </Text>
        </View>

        {/* <Ionicons name="notifications-outline" size={24} color="#FFFFFF" /> */}
      </Pressable>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.orderId}
          renderItem={renderItem}
          contentContainerStyle={{padding: 10}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 5,
  },
  status: {
    fontSize: 12,
    color: '#888',
  },
  button: {
    marginTop: 5,
    backgroundColor: '#FF5722',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GiftCardOrderListScreen;
