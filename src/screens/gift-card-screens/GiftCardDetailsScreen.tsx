import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Color } from '../../GlobalStyles';
import { IGiftCard } from '../../interfaces/gift-card.interface';
import { Picker } from '@react-native-picker/picker';
import usePostData from '../../shared/fetch/usePostData';
import { useToast } from 'react-native-toast-notifications';
import Loading from '../../component/Loading';
import OrderModal from '../../component/giftcard/OrderModal';
import { useAuth } from '../../context/AuthContext';
import makeOrder from '../../shared/fetch/makeOrder';
const GiftCardDetailsScreen = ({ navigation, route }: any) => {
  const [amount, setAmount] = useState('0');
  const [loading, setLoading] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);

  const { data } = route?.params;
  const toast = useToast();
  const { user } = useAuth();

  async function handleMakeOrder() {
    setLoading(true);

    const orderData = {
      userId: '65b20040898a05b473b9a0fd',
      address: {
        firstname: 'Mr',
        lastname: 'Prosenjit',
        email: 'aheibamprosenjit@gmail.com',
        telephone: '+919620992993',
        line1: 'Qwikcilver Solutions',
        line2: '111, BMC,Koramangala',
        city: 'bangalore',
        region: 'Karnataka',
        country: 'IN',
        postcode: '560095',
        company: '',
        billToThis: true,
      },
      billing: {
        firstname: 'Vineeth',
        lastname: 'MN',
        email: 'vineeth.mn@qwikcilver.com',
        telephone: '+919740581587',
        line1: 'billing 1',
        line2: 'Billing  2',
        city: 'bangalore',
        region: 'Karnataka',
        country: 'IN',
        postcode: '560095',
        company: '',
      },
      payments: [
        {
          code: 'svc',
          amount: 200,
        },
      ],
      // "refno": "refno3",
      syncOnly: true,
      deliveryMode: 'API', // EMAIL or SMS or API(Default) or ANY(EMAIL+SMS)
      products: [
        {
          sku: 'testsuccess001',
          price: 200,
          qty: 1,
          currency: '356',
          theme: '',
        },
      ],
    };

    const result = await usePostData('/orders', orderData, 'giftCard');
    if (result?.status == 200) {
      await handlePaymentAndOrder();

      navigation?.navigate('GiftCardHomeScreen');
    }

    setLoading(false);
  }

  const handlePress = () => {
    if (!amount) {
      toast.show('Select an Amount');
      return;
    }
    if (parseInt(amount) > parseInt(data.price.max)) {
      toast.show(`Price can't be higher than ${data.price.max}`);
      return;
    }
    if (parseInt(amount) < parseInt(data.price.min)) {
      // Fixed comparison for minimum price
      toast.show(`Price can't be less than ${data.price.min}`);
      return;
    }

    setBookingModal(true);
  };

  async function handlePaymentAndOrder() {
    const products = [
      {
        type: 'gift-card',
        sku: '',
        variant_id: '',
        price: parseInt(amount),
        offer_price: 0,
        tax_amount: 0,
        quantity: 0,
        name: data?.brandName,
        description: data?.brandName,
        weight: 0,
        image_url: '',
      },
    ];

    const biling = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
    };

    const result = await makeOrder(
      user?._id as string,
      parseInt(amount),
      user?.email as string,
      user?.full_name as string,
      user?.mobile as string,
      biling,
      biling,
      products,
    );

    if (result?.razorpay_order_id) {
      toast.show('Order Placed Successfully');
      setAmount('');
    } else {
      toast.show('Some Thing Went Wrong Please Try Again latter');
    }
  }

  useEffect(() => {
    console.log(data?.price?.denominations);
  }, [data]);





  console.log(data?.name, "ppppppppppppppppppppppppppp")





  if (loading) {
    return <Loading />;
  }

  // ===================== render =====================
  return (
    <View style={styles.container}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>{data?.brandName}</Text>
        </View>
        <Text style={styles.cardValue}>
          ₹{data.price.min} - ₹{data.price.max}
        </Text>
      </View>

      {/* Coupon Section */}
      {/* <TouchableOpacity style={styles.couponContainer}>
                <Text style={styles.couponText}>Apply Coupon</Text>
            </TouchableOpacity> */}

      {/* Price Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.discountPrice}>{data?.name}</Text>
      </View>
      {/* ====================== */}

      {data?.price?.denominations?.length ? (
        <>
          <Picker
            selectedValue={amount}
            onValueChange={(itemValue, itemIndex) => setAmount(itemValue)}
            style={styles.picker}>
            {data?.price?.denominations?.map((item: any) => (
              <Picker.Item label={item} value={item} />
            ))}
          </Picker>
        </>
      ) : (
        <TextInput
          style={styles.picker}
          placeholder="Enter Account No."
          placeholderTextColor="#B0C4DE"
          value={amount}
          onChangeText={value => setAmount(value)}
          keyboardType="numeric"
        />
      )}

      {/* Buy Button */}
      <TouchableOpacity onPress={handlePress} style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy Card</Text>
      </TouchableOpacity>

      {/* How to Use Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How to use?</Text>
        <Text style={styles.infoText}>
          1. Select the items you want to purchase.
        </Text>
        <Text style={styles.infoText}>
          2. Proceed to checkout and choose  your payment method.
        </Text>
        <Text style={styles.infoText}>
          3. Enter your gift card code in the provided field.
        </Text>
        <Text style={styles.infoText}>
          4. If the balance covers your purchase, you’re good to go! Otherwise, pay the remaining amount using another method.
        </Text>
      </View>


      {/* Terms & Conditions */}
      {/* <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Terms & Conditions</Text>
        <Text style={styles.infoText}>
          • Lorem ipsum dolor sit amet consectetur.
        </Text>
        <Text style={styles.infoText}>
          • Sed placerat aliquet interdum eget sed sed arcu.
        </Text>
      </View> */}

      <OrderModal
        setIsModalVisible={setBookingModal}
        isModalVisible={bookingModal}
        name={data?.name}
        price={amount}
        image={''}
        handleInvestmentProcess={handleMakeOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    backgroundColor: Color.secondaryColors100,
    padding: 80,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  logoContainer: {
    backgroundColor: '#E63946',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  couponContainer: {
    padding: 15,
    borderRadius: 6,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 20,
  },
  couponText: {
    color: '#333',
    fontSize: 16,
  },
  priceContainer: {
    marginBottom: 20,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  discount: {
    color: '#4CAF50',
  },
  buyButton: {
    backgroundColor: Color.primaryBlue100,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 20,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.primaryBlue100,
  },
  infoText: {
    fontSize: 14,
    color: Color.secondaryColors500,
    marginBottom: 5,
  },
  picker: {
    padding: 10,
    backgroundColor: Color.secondaryColors100,
    borderRadius: 20,
    marginBottom: 20,
    color: Color.primaryBlue100,
  },
});

export default GiftCardDetailsScreen;
