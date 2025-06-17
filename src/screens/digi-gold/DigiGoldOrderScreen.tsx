import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import {Color, Padding} from '../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import usePostData from '../../shared/fetch/usePostData';
import {Toast} from 'react-native-toast-notifications';
import {IGoldInvestment} from '../../interfaces/gold-investment.interface';
import useGetData from '../../shared/fetch/useGetData';

interface FormData {
  name: string;
  emailId: string;
  city: string;
  state: string;
  pincode: string;
  mobileNumber: string;
  address: string;
}

// ===================== component ==========================================
export default function DigiGoldOrderScreen({navigation}: any) {
  // ===================== states ==========
  const [investment, setInvestment] = useState<IGoldInvestment[]>([]);

  //fetch functions
  async function getAllInvestments() {
    const data = await useGetData(
      'gold-buy-list?user_id=66292db9d603a297d4535585',
    );
    setInvestment(data?.data);
  }

  useEffect(() => {
    getAllInvestments();
  }, []);

  // ==================== render =================================
  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          backgroundColor: Color.primaryBlue100,
          paddingVertical: 24,
          paddingHorizontal: 14,
        }}>
        <ChevronLeftIcon size={22} color={Color.white} />
        <Text style={styles.header}>My Orders</Text>
      </Pressable>

      <ScrollView
        style={{
          padding: Padding.p_13xl,
        }}>
        <View>
          {investment?.map(item => (
            <View key={item?.referenceId} style={styles.card}>
              {item.type == 'gold' ? (
                <>
                  <Image
                    source={require('../../../assets/images/gold.jpg')}
                    style={styles.image}
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require('../../../assets/images/silver.jpg')}
                    style={styles.image}
                  />
                </>
              )}
              <View style={styles.cardContent}>
                <Text style={styles.orderId}>
                  Order ID: {item.transactionId}
                </Text>
                <Text style={styles.orderId}>
                  {item.type == 'gold' ? 'Gold' : 'Silver'}: {item?.qty}gm
                </Text>
                <Text style={[styles.status, styles.delivered]}>
                  ₹ {item.inclTaxAmt}
                </Text>
                {/* <Text style={styles.date}>{item.createdAt?.slice(0, 10)}</Text> */}
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            paddingBottom: 120,
          }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: Color.white,
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cancelled: {
    color: '#ff3d00',
  },
  delivered: {
    color: '#4caf50',
  },
  orderId: {
    fontSize: 14,
    color: Color.primaryBlue100,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});
