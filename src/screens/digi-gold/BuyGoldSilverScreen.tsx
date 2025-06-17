import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';

import { CheckIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { Color, Padding } from '../../GlobalStyles';
import { ArrowsRightLeftIcon } from 'react-native-heroicons/solid';
import useGetData from '../../shared/fetch/useGetData';
import IGoldSilverPrice from '../../interfaces/gold-silver-pricing';
import IProduct from '../../interfaces/product.interface';
import usePostData from '../../shared/fetch/usePostData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from 'react-native-toast-notifications';
import Loading from '../../component/Loading';
import DigiGoldOrderModal from '../../component/digigold/DigiGoldOrderModal';
import { IUserBankAccount } from '../../interfaces/gold.bankaccount.interface';
import makeOrder from '../../shared/fetch/makeOrder';

//helper functions

async function checkUser(id: string) {
  // const data = await useGetData(`user?user_id=${id}`);
  const data = await useGetData(`user?user_id=66292db9d603a297d4535585`);
  return data?.data;
}

async function handleMakeInvestMent(fromData: any) {
  const data = await usePostData('buy', fromData);
  console.log(data, 'ppppppppppp =====================>');
  return data?.data;
}

// ========================== component ==============================
export default function GiftGoldScreen({ navigation }: any) {
  // ==================== states ===============================================
  // @ts-ignore
  const [data, setData] = useState<IGoldSilverPrice>({});
  const [amount, setAmount] = useState(500);
  const [grams, setGrams] = useState(0.0605);
  const [loading, setLoading] = useState(false);
  const [currentType, setCurrentType] = useState('gold');
  const [currentGoldPrice, setCurrentGoldPrice] = useState(8027.94);
  const [currentSilverPrice, setCurrentSilverPrice] = useState(8027.94);
  const [isTermClicked, setIsTermClicked] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [createdUserData, setCreatedUserData] = useState<any>({});
  const [informationType, setInformationType] = useState('user');
  const [mobileNumber, setMobileNumber] = useState('');
  const [userBalance, setUserBalance] = useState<any>({});
  const [bookingModal, setBookingModal] = useState(false);
  const [bankAccount, setBankAccount] = useState<IUserBankAccount[]>([]);
  const [timeLeft, setTimeLeft] = useState(300);
  // ====================== hooks
  const { user } = useAuth();
  const toast = useToast();

  // ==================== get gold price ============================
  async function getGoldPrice() {
    const data = await useGetData('rates');
    setData(data?.data);
  }
  async function getUserBalance() {
    const data = await useGetData(`passbook?user_id=${user?._id}`);
    setUserBalance(data?.data);
  }

  async function getBankAccount() {
    const data = await useGetData(`user-bank-list?user_id=${user?._id}`);
    setBankAccount(data?.data);
  }

  const handleAmountChange = (value: string) => {
    if (!isNaN(parseFloat(value))) {
      const numericValue = parseFloat(value);
      setAmount(numericValue);
      if (currentType === 'gold') {
        setGrams(Number((numericValue / currentGoldPrice).toFixed(4)));
      } else if (currentType === 'silver') {
        setGrams(Number((numericValue / currentSilverPrice).toFixed(4)));
      }
    } else {
      setAmount(0);
      setGrams(0);
    }
  };

  const handleGramsChange = (value: string) => {
    if (!isNaN(parseFloat(value))) {
      const numericValue = parseFloat(value);
      setGrams(numericValue);
      if (currentType === 'gold') {
        setAmount(Number((numericValue * currentGoldPrice).toFixed(2)));
      } else if (currentType === 'silver') {
        setAmount(Number((numericValue * currentSilverPrice).toFixed(2)));
      }
    } else {
      setGrams(0);
      setAmount(0);
    }
  };

  // ================= handing investment-----------------------

  async function handleInvestmentProcess() {
    setLoading(true);
    if (!isTermClicked) {
      toast.show('Please Check the terms and confitions.', {
        type: 'danger',
      });
      return;
    }

    if (amount == 0) {
      toast.show('Please enter investment amount', {
        type: 'danger',
      });
      return;
    }

    const investData = {
      lockPrice: currentType == 'gold' ? data?.rates?.gBuy : data?.rates?.sBuy,
      emailId: user?.email,
      metalType: currentType,
      amount: (+amount * 1.03)?.toString(),
      user_id: user?._id,
      blockId: data?.blockId,
      mobileNumber: user?.mobile,
    };

    try {
      const result = await handleMakeInvestMent(investData);

      console.log(result, "|||||||||||||||||||||          ++++++++++++++++++++++++++++")







      if (result) {
        toast.show('Investment Successful');
        setAmount(0);
        setGrams(0);
        getUserBalance()
      } else {
        toast.show('Some Thing Went Wrong Please Try Again latter');
      }
    } catch (e) {
      toast.show('Some Thing Went Wrong Please Try Again latter');
    }

    setLoading(false);
  }

  async function handlePaymentAndOrder() {
    const products = [
      {
        type: 'digi-gold',
        sku: '',
        variant_id: '',
        price: (+amount * 1.03),
        offer_price: 0,
        tax_amount: 0,
        quantity: grams,
        name: currentType,
        description: currentType,
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
      amount,
      user?.email as string,
      user?.full_name as string,
      user?.mobile as string,
      biling,
      biling,
      products,
    );

    if (result?.razorpay_order_id) {

      handleInvestmentProcess()

    } else {
      toast.show('Some Thing Went Wrong Please Try Again latter');
      setAmount(0);
      setGrams(0);
    }
  }

  // ----------- handling current price===========================
  useEffect(() => {
    setCurrentGoldPrice(parseFloat(data?.rates?.gBuy as string));
    setCurrentSilverPrice(parseFloat(data?.rates?.sBuy as string));
  }, [data]);

  // ========================
  useEffect(() => {
    if (user?._id) {
      getUserBalance();
      getBankAccount();
    }

  }, [user?._id]);


  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (user?._id) {
      getGoldPrice();

      // Countdown timer
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            getGoldPrice();
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // cleanup when unmount
  }, [user?._id]);

  // =========== handle type change =========

  useEffect(() => {
    console.log(currentType);
    handleAmountChange(0 as any);
  }, [currentType]);





  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };






  if (loading) {
    return <Loading />;
  }










  // ================== render =====================

  return (
    <View style={styles.container}>
      {/* =============== header  */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          backgroundColor: Color.primaryBlue100,
          paddingVertical: 20,
          paddingHorizontal: 14,
        }}>
        <ChevronLeftIcon size={22} color={Color.white} />
        <Text style={styles.header}>Wallex Gold</Text>
      </Pressable>
      {/* ================ tabs ======================= */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setCurrentType('gold')}
          style={currentType == 'gold' ? styles.tabActive : styles.tabInactive}>
          <Text
            style={
              currentType == 'gold'
                ? styles.tabTextActive
                : styles.tabTextInactive
            }>
            GOLD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentType('silver')}
          style={
            currentType == 'silver' ? styles.tabActive : styles.tabInactive
          }>
          <Text
            style={
              currentType == 'silver'
                ? styles.tabTextActive
                : styles.tabTextInactive
            }>
            SILVER
          </Text>
        </TouchableOpacity>
      </View>
      {/* body */}
      <ScrollView
        style={{
          padding: Padding.p_13xl,
        }}>
        {/* ============= investment details ==================== */}
        <View style={styles.balanceContainer}>
          <View style={styles.topCardBorder}>
            <Text style={styles.balanceText}>You Own</Text>
            <Text style={styles.silverText}>24K | 999</Text>
          </View>
          <View style={styles.topCardBorder}>
            <Text style={styles.balanceText}>Gold</Text>
            <Text style={styles.silverText}>
              {isNaN(parseFloat(userBalance?.goldGrms))
                ? '0.0000'
                : parseFloat(userBalance?.goldGrms).toFixed(4)} gm

              {/* {parseFloat(userBalance?.goldGrms)?.toFixed(4) || 0} gm */}
            </Text>
          </View>
          <View style={{}}>
            <Text style={styles.balanceText}>Silver</Text>
            <Text style={styles.silverText}>
              {' '}
              {isNaN(parseFloat(userBalance?.silverGrms))
                ? '0.0000'
                : parseFloat(userBalance?.silverGrms).toFixed(4)} gm
              {/* {parseFloat(userBalance?.silverGrms)?.toFixed(4) || 0} gm */}
            </Text>
          </View>
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Recipient Mobile Number*</Text>
          <TextInput
            style={styles.input}
            placeholder="+91 00000 00000"
            keyboardType="phone-pad"
            placeholderTextColor={Color?.primaryBlue20}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View> */}

        {/* ================ current price ============ */}

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
            backgroundColor: Color.white,
            padding: 14,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {currentType == 'gold' ? (
              <Image
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 15,
                }}
                resizeMode="cover"
                source={require('../../../assets/images/gold.jpg')}
              />
            ) : (
              <Image
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 15,
                }}
                resizeMode="cover"
                source={require('../../../assets/images/silver.jpg')}
              />
            )}

            <View>
              <Text
                style={{
                  color:
                    currentType == 'gold' ? Color.colorGold : Color.colorGray,
                  fontWeight: '800',
                  fontSize: 14,
                }}>
                BUYING PRICE
              </Text>
              <Text
                style={{
                  color:
                    currentType == 'gold' ? Color.colorGold : Color.colorGray,
                  fontWeight: '800',
                  fontSize: 12,
                  textAlign: 'center',
                  paddingVertical: 2,
                  borderWidth: 1,
                  borderColor:
                    currentType == 'gold' ? Color.colorGold : Color.colorGray,
                  borderRadius: 14,
                  marginTop: 5,
                }}>
                24K - 999
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: Color.primaryBlue100,
                fontWeight: '700',
                fontSize: 18,
              }}>
              ₹{currentType == 'gold' ? currentGoldPrice : currentSilverPrice}
            </Text>
            <Text
              style={{
                color: Color.colorRed_100,
                fontWeight: '700',
                fontSize: 12,
                textAlign: "right"
              }}>
              Reset in : {formatTime(timeLeft)}
            </Text>
          </View>
        </View>

        {/* ================= price input ============== */}

        <View style={styles.rowContainer}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Grams</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Grams"
              placeholderTextColor={Color?.primaryBlue20}
              keyboardType="numeric"
              // readOnly
              value={grams?.toString()}
              onChangeText={e => handleGramsChange(e)}
            />
          </View>

          <ArrowsRightLeftIcon
            size={22}
            color={Color.primaryBlue100}
            style={{
              marginTop: 20,
            }}
          />
          <View style={styles.halfInput}>
            <Text style={styles.label}>Amount you’ll get</Text>
            <TextInput
              style={[styles.input]}
              placeholderTextColor={Color?.primaryBlue20}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount?.toString()}
              onChangeText={e => handleAmountChange(e)}
            />
          </View>
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Message*</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="message goes here"
            placeholderTextColor={Color?.primaryBlue20}
            // value={message}
            // onChangeText={setMessage}
            multiline
          />
        </View> */}

        <View style={styles.termsContainer}>
          <Pressable
            onPress={() => setIsTermClicked(!isTermClicked)}
            style={{
              height: 15,
              width: 15,
              borderRadius: 4,
              backgroundColor: isTermClicked
                ? Color.primaryBlue100
                : Color.secondaryColors300,
            }}>
            {isTermClicked ? <CheckIcon color={Color.white} size={14} /> : ''}
          </Pressable>
          <Text style={styles.termsText}>
            I Accept <Text style={styles.link}>Terms and conditions</Text> and I
            assure that the given mobile number is correct.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.sellButton}
          onPress={() => {
            if (!amount) {
              toast.show('All fields are required');
              return;
            }
            setBookingModal(true);
          }}>
          <Text style={styles.sellButtonText}>BUY NOW</Text>
        </TouchableOpacity>
      </ScrollView>
      <DigiGoldOrderModal
        setIsModalVisible={setBookingModal}
        isModalVisible={bookingModal}
        metal={currentType}
        price={amount}
        grams={grams}
        image={''}
        handleInvestmentProcess={handlePaymentAndOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color?.secondaryColors100,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: Color.white,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: Color?.white,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Color?.primaryBlue100,
    width: '49%',
    paddingVertical: 20,
  },
  tabInactive: {
    width: '49%',
    borderBottomWidth: 2,
    borderBottomColor: Color?.primaryBlue20,
    paddingVertical: 20,
  },
  tabTextActive: {
    color: Color.colorOrange,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabTextInactive: {
    color: Color?.primaryBlue20,
    textAlign: 'center',
  },
  balanceContainer: {
    backgroundColor: Color?.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  topCardBorder: {
    borderRightWidth: 1,
    borderColor: Color?.primaryBlue20,
    paddingRight: 10,
  },
  balanceText: {
    color: Color?.primaryBlue100,
    fontSize: 15,
    fontWeight: '600',
  },

  silverText: {
    color: Color?.primaryBlue20,
    fontSize: 12,
    marginVertical: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.primaryBlue100,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.secondaryColors200,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInput: {
    width: '40%',
  },
  messageInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  link: {
    color: '#00A3FF',
    textDecorationLine: 'underline',
  },
  sellButton: {
    backgroundColor: Color.primaryBlue100,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  sellButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
