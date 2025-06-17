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
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Gap,
  Padding,
} from '../../GlobalStyles';
import {
  Bars3Icon,
  ChevronLeftIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/outline';
import usePostData from '../../shared/fetch/usePostData';
import {Toast} from 'react-native-toast-notifications';
import {IGoldInvestment} from '../../interfaces/gold-investment.interface';
import useGetData from '../../shared/fetch/useGetData';
import IProduct from '../../interfaces/product.interface';
import {useAuth} from '../../context/AuthContext';
import {useDigiGoldCart} from '../../context/DigiGoldCartContext';
import DigiGoldSidebar from '../../component/digigold/DigiGoldSidebar';

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
export default function AllProductsScreen({navigation}: any) {
  // ===================== states ==========
  const [product, setProduct] = React.useState<IProduct[]>([]);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  // ==================== hooks ===================================
  const {user} = useAuth();
  const {addItemToCart, totalQuantity} = useDigiGoldCart();

  //fetch functions
  async function getProducts() {
    setLoading(true);
    const data = await useGetData('productList?page=1&count=6');
    setProduct(data?.data);
    setLoading(false);
  }

  React.useEffect(() => {
    // if (user?.id) {
    //     getUserBalance(user?.id)
    // }
    getProducts();
  }, [user?.id]);

  // ==================== render =================================
  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          backgroundColor: Color.primaryBlue100,
          paddingVertical: 24,
          paddingHorizontal: 14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}>
          <ChevronLeftIcon size={22} color={Color.white} />
          <Text style={styles.header}>Gold / Silver Coin</Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
          }}>
          <Pressable
            style={[
              styles.arrowBackIos,
              {
                position: 'relative',
              },
            ]}
            onPress={() => {
              navigation?.navigate('DigiGoldCartScreen');
            }}>
            <ShoppingBagIcon size={22} color={Color.white} />

            <View
              style={{
                position: 'absolute',
                top: -13,
                right: -8,
                backgroundColor: Color.white,
                width: 20,
                height: 20,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Color.primaryBlue100,
                  fontSize: 10,
                }}>
                {totalQuantity}
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setModalVisible(true)}>
            <Bars3Icon size={22} color={Color.white} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={{
          padding: Padding.p_xl,
        }}>
        <View
          style={[
            {
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 12,
            },
          ]}>
          {product?.map(item => (
            <View key={item?.id} style={styles.frameParent4}>
              <Image
                style={[styles.frameChild4]}
                resizeMode="cover"
                source={require('../../../assets/images/gold.jpg')}
              />
              <View style={styles.dc1GramGoldMintBar24k9Parent}>
                <Text style={styles.dc1Gram}>{item?.name}</Text>
                <Pressable
                  onPress={() => addItemToCart(item)}
                  style={[styles.addToCartWrapper, styles.wrapperFlexBox]}>
                  <Text style={[styles.addToCart, styles.addToCartClr]}>
                    Add to cart
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            paddingBottom: 120,
          }}></View>
      </ScrollView>

      <DigiGoldSidebar
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
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
  k999Clr: {
    color: Color.secondaryColors700,
    textAlign: 'left',
  },
  youOwnTypo: {
    color: Color.secondaryColors500,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
  },
  gmTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  parentFlexBox1: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  parentFlexBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  frameParentFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipseSpaceBlock: {
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_5xs,
  },
  childBg: {
    backgroundColor: Color.colorGainsboro,
    overflow: 'hidden',
  },
  wrapperFlexBox: {
    paddingHorizontal: 0,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addToCartClr: {
    color: Color.white,
    textAlign: 'center',
  },
  iconLayout: {
    height: '100%',
    width: '100%',
  },
  helloSalmaan: {
    textAlign: 'left',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    color: Color.secondaryColors700,
    fontSize: FontSize.size_base,
  },
  youOwn: {
    fontSize: FontSize.size_xs,
  },
  k999: {
    fontSize: FontSize.size_sm,
    textAlign: 'left',
    color: Color.secondaryColors700,
  },
  frameChild: {
    borderColor: '#e2e8f0',
    borderRightWidth: 1,
    width: 1,
    height: 40,
    borderStyle: 'solid',
  },
  frameItem: {
    width: 32,
    height: 32,
  },
  gold: {
    color: '#ffb800',
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    textAlign: 'left',
  },
  gm: {
    color: Color.secondaryColors600,
    fontSize: FontSize.size_sm,
    textAlign: 'left',
  },
  ellipseParent: {
    gap: Gap.gap_sm,
  },
  silver: {
    color: '#818181',
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    textAlign: 'left',
  },
  frameParent: {
    backgroundColor: Color.white,
    padding: Padding.p_xs,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderRadius: Border.br_5xs,
  },
  helloSalmaanParent: {
    gap: Gap.gap_lg,
    marginBottom: 20,
  },
  liveRate: {
    color: Color.colorRed,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    textAlign: 'left',
  },
  ellipseIcon: {
    width: 8,
    height: 8,
  },
  liveRateParent: {
    gap: Gap.gap_sm,
    flexDirection: 'row',
  },
  todaysRateParent: {
    width: '100%',
  },
  gold1: {
    fontSize: FontSize.size_xl,
    textAlign: 'left',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    color: Color.primaryBlue100,
  },
  goldGroup: {
    gap: Gap.gap_md,
  },
  text: {
    fontFamily: FontFamily.poppinsRegular,
  },
  gm2: {
    color: Color.secondaryColors800,
    fontSize: FontSize.size_sm,
    textAlign: 'left',
  },
  framePressableGold: {
    borderRadius: Border.br_xs,
    gap: Gap.gap_md,
    padding: Padding.p_xs,
    flex: 1,
    backgroundColor: Color.colorGold,
  },
  framePressableSilver: {
    borderRadius: Border.br_xs,
    gap: Gap.gap_md,
    padding: Padding.p_xs,
    flex: 1,
    backgroundColor: Color.secondaryColors200,
  },
  frameContainer: {
    gap: Gap.gap_md,
    flexDirection: 'row',
    width: '100%',
  },
  frameGroup: {
    gap: Gap.gap_lg,
    marginBottom: 20,
  },
  buyGold: {
    fontSize: FontSize.size_3xs,
  },
  ellipseContainer: {
    borderColor: Color.colorGold,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    gap: Gap.gap_md,
    borderStyle: 'solid',
    alignItems: 'center',
    flex: 1,
  },
  ellipseParent1: {
    borderColor: '#c0c0c0',
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    gap: Gap.gap_md,
    borderStyle: 'solid',
    alignItems: 'center',
    flex: 1,
  },
  frameView: {
    flexDirection: 'row',
    width: '100%',
    gap: Gap.gap_lg,
    marginBottom: 20,
  },
  banklyGoldChild: {
    width: '100%',
  },
  frameChild4: {
    width: '100%',
    flex: 1,
  },
  dc1Gram: {
    textAlign: 'center',
    alignSelf: 'stretch',
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    color: Color.secondaryColors700,
  },
  addToCart: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
  },
  addToCartWrapper: {
    backgroundColor: Color.primaryBlue100,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_5xs,
  },
  dc1GramGoldMintBar24k9Parent: {
    alignSelf: 'stretch',
    gap: Gap.gap_sm,
  },
  frameParent4: {
    borderColor: Color.colorLightgray,
    height: 226,
    padding: Padding.p_5xs,
    minWidth: '46%',
    borderWidth: 1,
    borderRadius: Border.br_xs,
    borderStyle: 'solid',
    gap: Gap.gap_lg,
    overflow: 'hidden',
    flex: 1,
  },
  frameParent3: {
    flexWrap: 'wrap',
    alignContent: 'center',
    flexDirection: 'row',
    gap: Gap.gap_lg,
  },
  viewMoreProducts: {
    width: 140,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    fontSize: FontSize.size_sm,
  },
  viewMoreProductsWrapper: {
    borderRadius: 20,
    marginTop: 30,
    backgroundColor: Color.primaryBlue100,
    paddingVertical: 16,
    overflow: 'hidden',
  },
  frameParent2: {
    width: '100%',
  },
  arrowBackIos: {
    width: 24,
    height: 24,
  },
  banklyGold1: {
    textTransform: 'capitalize',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    fontSize: FontSize.size_base,
  },
  arrowBackIosParent: {
    gap: Gap.gap_md,
  },
  icon1: {
    overflow: 'hidden',
  },
  frameParent8: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: Color.primaryBlue100,
  },
  banklyGold: {
    backgroundColor: Color.secondaryColors100,
    height: 1161,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
  },
});
