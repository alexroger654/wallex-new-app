import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {
  Bars3Icon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import GiftCardSidebar from '../../component/giftcard/GiftCardSidebar';
import {GiftIcon} from 'react-native-heroicons/solid';

const OffersScreen = ({navigation}: any) => {
  // ============= states
  const [isModalVisible, setModalVisible] = React.useState(false);
  // Sample data for categories, promotions, and brands
  const categories = [
    {id: '1', name: 'Food', discount: 'Up to 10%'},
    {id: '2', name: 'Electronics', discount: 'Up to 10%'},
    {id: '3', name: 'E-Commerce', discount: 'Up to 10%'},
    {id: '4', name: 'Health', discount: 'Up to 10%'},
    {id: '5', name: 'Pets', discount: 'Up to 10%'},
    {id: '6', name: 'Home', discount: 'Up to 10%'},
  ];

  const promotions = [
    {
      id: '1',
      title: 'Weekly Bonanza',
      description:
        'Lorem ipsum dolor sit amet consectetur. Urna urna aliquam turpis risus aliquam.',
      color: '#A32CC4',
    },
    {
      id: '2',
      title: 'Weekly Bonanza',
      description:
        'Lorem ipsum dolor sit amet consectetur. Urna urna aliquam turpis risus aliquam.',
      color: '#A32CC4',
    },
  ];

  const brands = [
    {
      id: '1',
      name: 'Flipkart',
      discount: 'Up to 8%',
      image: require('../../../assets/images/gold.jpg'),
    },
    {
      id: '2',
      name: 'Zomato',
      discount: 'Up to 10%',
      image: require('../../../assets/images/gold.jpg'),
    },
    {
      id: '3',
      name: 'Swiggy',
      discount: 'Up to 2%',
      image: require('../../../assets/images/gold.jpg'),
    },
    {
      id: '4',
      name: 'Big Basket',
      discount: 'Up to 7.5%',
      image: require('../../../assets/images/gold.jpg'),
    },
    {
      id: '5',
      name: 'Uber',
      discount: 'Up to 1%',
      image: require('../../../assets/images/gold.jpg'),
    },
    {
      id: '6',
      name: 'Myntra',
      discount: 'Up to 5%',
      image: require('../../../assets/images/gold.jpg'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Pressable style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
          }}>
          <ChevronLeftIcon size={24} color="#FFFFFF" />
          <Text style={styles.headerText}>Offers</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation?.navigate('GiftCardOrderListScreen')}>
          <GiftIcon size={22} color={Color.white} />
        </Pressable>
        {/* <Ionicons name="notifications-outline" size={24} color="#FFFFFF" /> */}
      </Pressable>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon size={20} color="#888" style={{marginRight: 8}} />
        <TextInput
          placeholder="Search For Brands"
          placeholderTextColor={Color.primaryBlue20}
          style={styles.searchInput}
        />
      </View>

      {/* Browse Categories */}
      <Text style={styles.sectionTitle}>Browse Categories</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation?.navigate('GiftCardListScreen')}
            style={styles.category}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryDiscount}>{item.discount}</Text>
          </Pressable>
        )}
        contentContainerStyle={{paddingHorizontal: 16}}
      />

      {/* Promotions Carousel */}
      <Text style={styles.sectionTitle}>Promotions</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.promotionsContainer}>
        {promotions.map(promotion => (
          <View key={promotion.id} style={[styles.promotionCard]}>
            <Image
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../../../assets/promotion.png')}
            />
          </View>
        ))}
      </ScrollView>

      {/* Popular Brands */}
      <Text style={styles.sectionTitle}>Popular Brands</Text>
      <FlatList
        data={brands}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.brandCard}>
            <Image source={item.image} style={styles.brandImage} />
            <Text style={styles.brandDiscount}>{item.discount}</Text>
          </View>
        )}
        contentContainerStyle={{paddingHorizontal: 16}}
      />

      <GiftCardSidebar
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    padding: 20,
    backgroundColor: '#243278',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 2,
    margin: 16,
    borderRadius: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color?.secondaryColors200,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    color: Color.primaryBlue100,
    marginBottom: 12,
  },
  category: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    width: 170,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color?.secondaryColors200,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  categoryDiscount: {
    color: '#4CAF50',
    fontSize: 14,
  },
  promotionsContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  promotionCard: {
    width: 320,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  promotionDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    marginVertical: 8,
  },
  promotionButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  promotionButtonText: {
    color: '#A32CC4',
    fontWeight: 'bold',
  },
  brandCard: {
    backgroundColor: '#FFFFFF',
    width: 100,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Color?.secondaryColors200,
  },
  brandImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  brandDiscount: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OffersScreen;
