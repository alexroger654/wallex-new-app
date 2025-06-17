import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  BellIcon,
  HomeIcon,
  CreditCardIcon,
} from 'react-native-heroicons/outline';
import {
  BanknotesIcon,
  MapPinIcon,
  GiftIcon,
} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

const menuItems = [
  // {id: 1, title: 'Notifications', icon: BellIcon, link: ''},
  {id: 2, title: 'My Order', icon: HomeIcon, link: 'GiftCardOrderListScreen'},
  // {id: 3, title: 'Delivery', icon: CreditCardIcon, link: ''},
  // {id: 4, title: 'Sell', icon: BanknotesIcon, link: 'SellGoldScreen'},
];

export default function GiftCardSidebar({
  isModalVisible,
  setModalVisible,
}: any) {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      {/* Sidebar Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        style={styles.modal}>
        <View style={styles.sidebarContainer}>
          {/* Menu Items */}
          <FlatList
            data={menuItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  // @ts-ignore
                  onPress={() => navigation?.navigate(item?.link)}
                  style={styles.menuItem}>
                  <IconComponent size={24} color="#003366" />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    margin: 20,
    padding: 10,
    backgroundColor: '#003366',
    alignItems: 'center',
    borderRadius: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  sidebarContainer: {
    backgroundColor: '#f5f8ff',
    width: '70%',
    height: '100%',
    padding: 16,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  profileSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
  },
  arrow: {
    fontSize: 18,
    color: '#003366',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  menuItemText: {
    fontSize: 16,
    color: '#003366',
    marginLeft: 10,
  },
});
