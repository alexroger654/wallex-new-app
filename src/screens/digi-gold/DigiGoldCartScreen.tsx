import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {useDigiGoldCart} from '../../context/DigiGoldCartContext';
import {ChevronLeftIcon, TrashIcon} from 'react-native-heroicons/outline';
import {Color, Padding} from '../../GlobalStyles';

const DigiGoldCartScreen = ({navigation}: any) => {
  // Access cart items and cart state
  const {items, totalQuantity, totalPrice, updateItemQuantity} =
    useDigiGoldCart();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            backgroundColor: Color.primaryBlue100,
            paddingVertical: 10,
            paddingHorizontal: 14,
          }}>
          <ChevronLeftIcon size={20} color={Color.white} />
          <Text style={styles.header}>Cart</Text>
        </Pressable>

        {/* Cart Items */}
        <View
          style={{
            padding: Padding.p_xl,
          }}>
          {items.map(item => (
            <View key={item.sku} style={styles.cartItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>
                  Making and delivery Charges
                </Text>
                <Text style={styles.itemPrice}>₹{item.basePrice}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <TrashIcon size={18} color={Color.colorRed} />
              </TouchableOpacity>
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  onPress={() =>
                    updateItemQuantity(item?.sku, item.quantity - 1)
                  }
                  style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityNumber}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() =>
                    updateItemQuantity(item?.sku, item.quantity + 1)
                  }
                  style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Summary Section */}
          <View style={styles.summary}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 6,
                borderBottomWidth: 1,
                borderBottomColor: Color.primaryBlue20,
              }}>
              <Text style={styles.summaryText}>No. of Products:</Text>
              <Text style={styles.summaryText}>{totalQuantity}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 6,
                borderBottomWidth: 1,
                borderBottomColor: Color.primaryBlue20,
              }}>
              <Text style={styles.summaryText}>Shipping:</Text>
              <Text style={styles.summaryText}>₹0.00</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 6,
                borderBottomWidth: 1,
                borderBottomColor: Color.primaryBlue20,
              }}>
              <Text style={styles.summaryText}>Tax:</Text>
              <Text style={styles.summaryText}>₹0.00</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 6,
                // borderBottomWidth: 1,
                // borderBottomColor: Color.primaryBlue20,
              }}>
              <Text style={styles.summaryText}>Total:</Text>
              <Text style={styles.summaryText}>₹{totalPrice}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ==================== bottom button */}

      <View
        style={{
          backgroundColor: Color.primaryBlue100,
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: Color.white,
            }}>
            Grand Total
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: 'white',
            }}>
            ₹{totalPrice}
          </Text>
        </View>
        <Pressable
          onPress={() => navigation?.navigate('SelectAddressScreen')}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 34,
            paddingVertical: 14,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: Color.primaryBlue100,
            }}>
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    color: Color.white,
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  itemSubtitle: {
    color: Color.primaryBlue50,
    fontSize: 12,
    marginVertical: 4,
  },
  itemPrice: {
    color: '#00A300',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E6ED',
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    paddingHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  quantityNumber: {
    fontSize: 16,
    paddingHorizontal: 4,
    color: Color.primaryBlue100,
  },
  summary: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 14,
    marginVertical: 2,
    color: Color.primaryBlue50,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  banklyBalance: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#243278',
    borderWidth: 1,
  },
  banklyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#243278',
  },
  banklyText: {
    fontSize: 14,
    marginVertical: 2,
  },
  banklyTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default DigiGoldCartScreen;
