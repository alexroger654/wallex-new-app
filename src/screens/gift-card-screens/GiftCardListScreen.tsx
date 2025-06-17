import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import IProduct from '../../interfaces/product.interface';
import {IGiftCard} from '../../interfaces/gift-card.interface';
import useGetData from '../../shared/fetch/useGetData';

const GiftCardListScreen = ({navigation}: any) => {
  // ==================== states ===========================
  const [data, setData] = useState<IGiftCard[]>([]);

  //fetch functions ========================================
  async function getGiftCard() {
    const data = await useGetData('products?categoryId=121', 'giftCard');
    setData(data?.data);
  }

  const renderBrandItem = ({item}: {item: IGiftCard}) => (
    <Pressable
      onPress={() =>
        navigation?.navigate('GiftCardDetailsScreen', {
          data: item,
        })
      }
      style={styles.brandContainer}>
      <Image
        source={{
          uri:
            item?.images.base ||
            'https://pbs.twimg.com/profile_images/1676632284215271425/zXmKVN-f_400x400.jpg',
        }}
        style={styles.brandImage}
      />
      <View style={styles.brandDetails}>
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.brandCategory}>{item.brandName}</Text>
      </View>
      <View style={styles.discountContainer}>
        <Text style={styles.discountText}>
          ₹{item.price.min} - ₹{item.price.max}
        </Text>
      </View>
    </Pressable>
  );

  useEffect(() => {
    getGiftCard();
  });

  // ============================= render ==================
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ChevronLeftIcon size={24} color="#FFFFFF" />
        <Text style={styles.headerText}>Offers</Text>
        {/* <Ionicons name="notifications-outline" size={24} color="#FFFFFF" /> */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon size={20} color="#888" style={{marginRight: 8}} />
        <TextInput
          placeholder="Search For Brands"
          placeholderTextColor={Color.primaryBlue20}
          style={styles.searchInput}
        />
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}>
        {['Food', 'Grocery', 'One Stop Shops', 'Hot Deals'].map(
          (tab, index) => (
            <TouchableOpacity key={index} style={styles.tab}>
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ),
        )}
      </ScrollView>

      {/* Brands List */}
      <Text style={styles.brandListTitle}>5 Brands</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderBrandItem}
        contentContainerStyle={styles.brandList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    backgroundColor: '#243278',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 2,
    margin: 12,
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Color.secondaryColors200,
    height: 40,
    overflow: 'hidden',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 16,
    color: Color.primaryBlue100,
  },
  brandListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  brandList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  brandImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  brandDetails: {
    flex: 1,
  },
  brandName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  brandCategory: {
    fontSize: 14,
    color: Color.primaryBlue50,
  },
  discountContainer: {
    backgroundColor: '#E0F8EA',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  discountText: {
    color: '#32CD32',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default GiftCardListScreen;
