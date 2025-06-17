import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import InvestmentList from '../../component/digigold/InvestmentList';
import useGetData from '../../shared/fetch/useGetData';
import {IGoldInvestment} from '../../interfaces/gold-investment.interface';
import {useTheme} from '../../context/ThemeProvider';
import {useAuth} from '../../context/AuthContext';
import {Color} from '../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';

export default function MyInvestments({navigation}: any) {
  // ===================== states ==========
  const [investment, setInvestment] = useState<IGoldInvestment[]>([]);
  const [type, setType] = useState('buy');
  const {user} = useAuth();
  const {color} = useTheme();

  //fetch functions
  async function getAllInvestments() {
    const data = await useGetData(`gold-buy-list?user_id=${user?._id}`);
    setInvestment(data?.data);
  }
  async function getAllSells() {
    const data = await useGetData(`gold-sell-list?user_id=${user?._id}`);
    setInvestment(data?.data);
  }

  useEffect(() => {
    if (type == 'buy') {
      getAllInvestments();
    }
    if (type == 'sell') {
      getAllSells();
    }
  }, [type]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <Pressable
        onPress={() => navigation?.goBack()}
        style={{
          backgroundColor: color.primaryBlue100,
          paddingVertical: 24,
          paddingHorizontal: 16,
          flexDirection: 'row',
          gap: 4,
        }}>
        <ChevronLeftIcon size={20} color={color.white} />
        <Text
          style={{
            color: color.white,
            fontSize: 16,
          }}>
          Transaction Details
        </Text>
      </Pressable>
      <View
        style={{
          padding: 16,
        }}>
        <View style={styles.tripTypeContainer}>
          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              type === 'buy' && styles.selectedTripType,
            ]}
            onPress={() => setType('buy')}>
            <Text style={styles.tripTypeText}>Investments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              type === 'sell' && styles.selectedTripType,
            ]}
            onPress={() => setType('sell')}>
            <Text style={styles.tripTypeText}>Sells</Text>
          </TouchableOpacity>
        </View>
      </View>
      <InvestmentList transactions={investment} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tripTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: Color.primaryBlue20,
    borderRadius: 10,
    padding: 6,
  },
  tripTypeButton: {
    padding: 9,
    borderRadius: 10,
    width: '49%',
  },
  selectedTripType: {
    backgroundColor: Color.white,
  },
  tripTypeText: {
    color: Color.primaryBlue100,
    fontSize: 16,
    textAlign: 'center',
  },
});
