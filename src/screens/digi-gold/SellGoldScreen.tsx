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
import { IBalance } from '../../shared/interfaces/balance.interface';

//helper functions

async function checkUser(id: string) {
  // const data = await useGetData(`user?user_id=${id}`);
  const data = await useGetData(`user?user_id=66292db9d603a297d4535585`);
  return data?.data;
}

async function getUserBalance(id: string) {
  // const data = await useGetData(`passbook?user_id=${id}`);
  const data = await useGetData(`passbook?user_id=66292db9d603a297d4535585`);
  return data?.data;
}
async function getBankAccount(id: string) {
  const data = await useGetData(
    `user-bank-list?user_id=66292db9d603a297d4535585`,
  );
  // const data = await useGetData(`user-bank-list?user_id=${id}`);
  return data;
}

async function handleMakeInvestMent(fromData: any) {
  const data = await usePostData('buy', fromData);
  return data?.data;
}

// ========================== component ==============================
export default function SellGoldScreen({ navigation }: any) {
  // ==================== states ===============================================
  // @ts-ignore
  const [data, setData] = useState<IGoldSilverPrice>({});
  const [amount, setAmount] = useState(500);
  const [grams, setGrams] = useState(0.0605);
  const [currentType, setCurrentType] = useState('gold');
  const [currentGoldPrice, setCurrentGoldPrice] = useState(8027.94);
  const [currentSilverPrice, setCurrentSilverPrice] = useState(8027.94);
  const [isTermClicked, setIsTermClicked] = useState(false);
  const [createdUserData, setCreatedUserData] = useState<any>({});
  // @ts-ignore
  const [userBalance, setUserBalance] = React.useState<IBalance>({});
  // ====================== hooks
  const { user } = useAuth();
  const toast = useToast();

  // ==================== get gold price ============================
  async function getGoldPrice() {
    const data = await useGetData('rates');
    setData(data?.data);
  }

  async function getUserBalance(id: string) {
    const data = await useGetData(`passbook?user_id=66292db9d603a297d4535585`);
    setUserBalance(data?.data);
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

    if (currentType == 'gold' && parseFloat(userBalance?.goldGrms) < grams) {
      toast.show("You don't have enough balance", {
        type: 'danger',
      });
      return;
    }
    if (
      currentType == 'silver' &&
      parseFloat(userBalance?.silverGrms) < grams
    ) {
      toast.show("You don't have enough balance", {
        type: 'danger',
      });
      return;
    }

    const investData = {
      lockPrice: currentType == 'gold' ? currentGoldPrice : currentSilverPrice,
      blockId: data?.blockId,
      metalType: currentType,
      quantity: '0.5',
      mobileNumber: '9620992993',
      user_id: '66292db9d603a297d4535585',
      bankId: '59RVLl9A',
      accountName: 'Rahul K',
      accountNumber: '049112010000451',
      ifscCode: 'UBIN0804961',
    };
    const result = await handleMakeInvestMent(investData);
    if (result) {
      toast.show('Sold Successful');
    } else {
      toast.show('Some Thing Went Wrong Please Try Again latter');
    }
    // console.log(result, '--------------------------------')
  }

  // ----------- handling current price===========================
  useEffect(() => {
    setCurrentGoldPrice(parseFloat(data?.rates?.gSell as string));
    setCurrentSilverPrice(parseFloat(data?.rates?.sSell as string));
  }, [data]);

  // ========================
  useEffect(() => {
    getGoldPrice();
    getUserBalance('');
  }, []);

  // =========== handle type change =========

  useEffect(() => {
    console.log(currentType);
    handleAmountChange(0 as any);
  }, [currentType]);

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
              {parseFloat(userBalance?.goldGrms)?.toFixed(2)} gm
            </Text>
          </View>
          <View style={{}}>
            <Text style={styles.balanceText}>Silver</Text>
            <Text style={styles.silverText}>
              {parseFloat(userBalance?.silverGrms)?.toFixed(2)} gm
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
                SELLING PRICE
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
          onPress={handleInvestmentProcess}>
          <Text style={styles.sellButtonText}>SELL NOW</Text>
        </TouchableOpacity>
      </ScrollView>
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
