import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';

const BillPaymentHomeScreen = ({navigation}: any) => {
  const categories = [
    {
      title: 'Recharge',
      options: [
        'Mobile Prepaid',
        'Mobile Postpaid',
        'DTH Recharge',
        'Fastag Recharge',
      ],
    },
    {
      title: 'Pay your Home bills',
      options: [
        'Electricity',
        'LPG Gas',
        'Water',
        'CableTV',
        'Piped Gas',
        'Broadband Postpaid',
        'Landline Postpaid',
      ],
    },
    {
      title: 'Financial Services & Taxes',
      options: [
        'Credit Card Bills',
        'Education Fee',
        'Hospital',
        'Loan Repayment',
      ],
    },
    {
      title: 'Insurance',
      options: ['Insurance', 'Health Insurance', 'Life Insurance'],
    },
    {
      title: 'Other Services',
      options: [
        'Clubs And Associations',
        'Housing Society',
        'Subscription',
        'Recurring Deposit',
        'Municipal Taxes',
        'Rental',
      ],
    },
  ];

  const quickLinks = [
    {
      name: 'My Complaints',
      link: 'MyComplaintsScreen',
    },
    {
      name: 'Help & Support',
      link: 'SupportScreen',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 20}}>
      {/* Header */}
      <View style={styles.header}>
        <ChevronLeftIcon size={24} color="#fff" />
        <Text style={styles.headerText}>Recharge And Pay Bills</Text>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/BharatBillPay.png')}
        />
      </View>

      <View
        style={{
          padding: 20,
        }}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <MagnifyingGlassIcon
            size={24}
            color={Color.primaryBlue50}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={Color.primaryBlue50}
            placeholder="Search Bills & Recharge"
          />
        </View>
        {/* quick links */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Quick Links</Text>
          <View style={styles.optionsContainer}>
            {quickLinks.map((option, optionIndex) => (
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate(option.link);
                }}
                key={optionIndex}
                style={styles.option}>
                <Image
                  style={styles.optionIcon}
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVq-OmHL5H_5P8b1k306pFddOe3049-il2A&s0',
                  }}
                />
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}

            <View></View>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
          </View>
        </View>

        {/* Categories */}
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <View style={styles.optionsContainer}>
              {category.options.map((option, optionIndex) => (
                <TouchableOpacity
                  onPress={() => {
                    if (
                      option == 'Mobile Postpaid' ||
                      option == 'Mobile Prepaid'
                    ) {
                      navigation?.navigate('SelectContactOrProvider', {
                        type: 'mobileRecharge',
                      });
                    } else {
                      navigation?.navigate('BillPaymentScreen', {
                        type: option?.toLowerCase(),
                      });
                    }
                  }}
                  key={optionIndex}
                  style={styles.option}>
                  <Image
                    style={styles.optionIcon}
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVq-OmHL5H_5P8b1k306pFddOe3049-il2A&s0',
                    }}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.primaryBlue20,
    marginVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Color.primaryBlue100,
  },
  categoryContainer: {
    marginBottom: 24,
    backgroundColor: Color.white,
    padding: 12,
    borderRadius: 14,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 11,
    color: Color.primaryBlue50,
    textAlign: 'center',
  },
});

export default BillPaymentHomeScreen;
