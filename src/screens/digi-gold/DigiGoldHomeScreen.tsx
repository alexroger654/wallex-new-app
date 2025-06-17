import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  Color,
  FontFamily,
  Padding,
  Border,
  FontSize,
  Gap,
} from '../../GlobalStyles';
import { Bars3Icon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import useGetData from '../../shared/fetch/useGetData';
import IGoldSilverPrice from '../../interfaces/gold-silver-pricing';
import IProduct from '../../interfaces/product.interface';
import { useAuth } from '../../context/AuthContext';
import { IBalance } from '../../shared/interfaces/balance.interface';
import { useDigiGoldCart } from '../../context/DigiGoldCartContext';
import { ShoppingBagIcon } from 'react-native-heroicons/solid';
import DigiGoldSidebar from '../../component/digigold/DigiGoldSidebar';
import Loading from '../../component/Loading';
import LinearGradient from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';

// =================== component ===================================

const DigiGoldCartScreen = ({ navigation }: any) => {
  // ========================= states ==========================
  const [isModalVisible, setModalVisible] = React.useState(false);
  // @ts-ignore
  const [userBalance, setUserBalance] = React.useState<IBalance>({});
  // @ts-ignore
  const [goldPrice, setGoldPrice] = React.useState<IGoldSilverPrice>({});
  const [product, setProduct] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(300);

  // ==================== hooks ===================================
  const { user } = useAuth();
  const toast = useToast();
  const { addItemToCart, totalQuantity } = useDigiGoldCart();

  // =========== data handlers====================================
  async function getUserBalance(id: string) {
    setLoading(true);
    const data = await useGetData(`passbook?user_id=${user?._id}`);
    setUserBalance(data?.data);
    setLoading(false);
  }
  async function getGoldPrice() {
    setLoading(true);
    const data = await useGetData('rates');
    setGoldPrice(data?.data);
    setLoading(false);
  }

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
    getUserBalance('');
    getProducts();
  }, [user?._id]);





  React.useEffect(() => {
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




  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };




  if (loading) {
    return <Loading />;
  }

  // ====================== render =========================
  return (
    <ScrollView style={styles.banklyGold}>
      {/* ================== header */}
      <View style={[styles.frameParent8, styles.parentFlexBox]}>
        <View style={[styles.arrowBackIosParent]}>
          <View style={styles.parentFlexBox1}>
            <Pressable
              style={styles.arrowBackIos}
              onPress={() => {
                navigation?.navigate('HomeScreen');
              }}>
              <ChevronLeftIcon size={22} color={Color.white} />
            </Pressable>
            <Pressable
              onPress={() => {
                navigation?.navigate('HomeScreen');
              }}>
              <Text style={[styles.banklyGold1, styles.addToCartClr]}>
                Wallex Gold
              </Text>
            </Pressable>
          </View>
        </View>
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
          <Pressable
            style={[
              styles.arrowBackIos,
              {
                position: 'relative',
              },
            ]}
            onPress={() => setModalVisible(!isModalVisible)}>
            <Bars3Icon size={22} color={Color.white} />

            {/* <View
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
            </View> */}
          </Pressable>
          {/* <Pressable></Pressable> */}
        </View>
      </View>
      <View style={{ padding: 16 }}>
        {/* ================== balance ===================== */}
        <View style={[styles.helloSalmaanParent]}>
          <Text style={[styles.helloSalmaan, styles.k999Clr]}>
            Hello, {user?.full_name}
          </Text>
          <View style={styles.frameParent}>
            <View>
              <Text style={[styles.youOwn, styles.youOwnTypo]}>You Own</Text>
              <Text style={[styles.k999, styles.gmTypo]}>24K | 999</Text>
            </View>
            <View style={styles.frameChild} />
            <View style={[styles.ellipseParent, styles.parentFlexBox1]}>
              <Image
                style={styles.frameItem}
                resizeMode="cover"
                source={require('../../../assets/images/gold.jpg')}
              />
              <View>
                <Text style={styles.gold}>Gold</Text>
                <Text style={[styles.gm, styles.gmTypo]}>
                  {isNaN(parseFloat(userBalance?.goldGrms))
                    ? '0.0000'
                    : parseFloat(userBalance?.goldGrms).toFixed(4)} gm
                </Text>
              </View>
            </View>
            <View style={styles.frameChild} />
            <View style={[styles.ellipseParent, styles.parentFlexBox1]}>
              <Image
                style={styles.frameItem}
                resizeMode="cover"
                source={require('../../../assets/images/silver.jpg')}
              />
              <View>
                <Text style={styles.silver}>Silver</Text>
                <Text style={[styles.gm, styles.gmTypo]}>
                  {isNaN(parseFloat(userBalance?.silverGrms))
                    ? '0.0000'
                    : parseFloat(userBalance?.silverGrms).toFixed(4)} gm
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* live rate ====================================== */}
        <View style={[styles.frameGroup]}>
          <View style={[styles.todaysRateParent, styles.parentFlexBox]}>
            <Text style={[styles.helloSalmaan, styles.k999Clr]}>
              Today’s Rate
            </Text>
            <View style={[styles.liveRateParent, styles.frameParentFlexBox]}>
              <Text style={styles.liveRate}>Live Rate : {formatTime(timeLeft)}</Text>
            </View>
          </View>
          <View style={styles.frameContainer}>
            <Pressable
              onPress={() => { }}
              style={{
                flex: 1,
              }}>
              <LinearGradient
                colors={['#c08e38', '#f0de7a', '#b58135']}
                style={styles.framePressableGold}>
                <View style={styles.goldGroup}>
                  <Text style={[styles.gold1, styles.k999Clr]}>Gold</Text>
                  <Text style={styles.liveRate}>24K | 999</Text>
                </View>
                <Text style={styles.gm2}>
                  <Text style={styles.text}>₹</Text>
                  <Text style={styles.gmTypo}>
                    {parseFloat(goldPrice?.rates?.gBuy)?.toFixed(2)} /gm
                  </Text>
                </Text>
              </LinearGradient>
            </Pressable>
            <Pressable style={styles.framePressableSilver} onPress={() => { }}>
              <View style={styles.goldGroup}>
                <Text style={[styles.gold1, styles.k999Clr]}>Silver</Text>
                <Text style={styles.liveRate}>24K | 999</Text>
              </View>
              <Text style={styles.gm2}>
                <Text style={styles.text}>₹</Text>
                <Text style={styles.gmTypo}>
                  {parseFloat(goldPrice?.rates?.sBuy)?.toFixed(2)} /gm
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>

        {/* features ======================================= */}
        <View style={[styles.frameView, styles.frameParentFlexBox]}>
          <Pressable
            style={[styles.ellipseContainer, styles.ellipseSpaceBlock]}
            onPress={() => {
              navigation?.navigate('BuyGoldSilverScreen');
            }}>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              // source={require('../../../assets/images/gold.jpg')}
              source={{
                uri: 'https://cdn-icons-png.freepik.com/256/1639/1639567.png?ga=GA1.1.28086393.1731932475&semt=ais_hybrid',
              }}
            />
            <Text style={[styles.buyGold, styles.youOwnTypo]}>Buy Gold</Text>
          </Pressable>
          <Pressable
            style={[styles.ellipseContainer, styles.ellipseSpaceBlock]}
            onPress={() => {
              navigation?.navigate('BuyGoldSilverScreen');
            }}>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              // source={require('../../../assets/images/gold.jpg')}
              source={{
                uri: 'https://cdn-icons-png.freepik.com/256/5247/5247044.png?ga=GA1.1.28086393.1731932475&semt=ais_hybrid',
              }}
            />
            <Text style={[styles.buyGold, styles.youOwnTypo]}>Buy Silver</Text>
          </Pressable>
          <Pressable
            style={[styles.ellipseContainer, styles.ellipseSpaceBlock]}
            onPress={() => {
              navigation?.navigate('SellGoldScreen');
            }}>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              // source={require('../../../assets/images/gold.jpg')}
              source={{
                uri: 'https://cdn-icons-png.freepik.com/256/1639/1639567.png?ga=GA1.1.28086393.1731932475&semt=ais_hybrid',
              }}
            />
            <Text style={[styles.buyGold, styles.youOwnTypo]}>Sell Gold</Text>
          </Pressable>
          <Pressable
            style={[styles.ellipseContainer, styles.ellipseSpaceBlock]}
            onPress={() => {
              navigation?.navigate('SellGoldScreen');
            }}>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              // source={require('../../../assets/images/gold.jpg')}
              source={{
                uri: 'https://cdn-icons-png.freepik.com/256/5247/5247044.png?ga=GA1.1.28086393.1731932475&semt=ais_hybrid',
              }}
            />
            <Text style={[styles.buyGold, styles.youOwnTypo]}>Sell Silver</Text>
          </Pressable>
          {/* <Pressable
            style={[styles.ellipseParent1, styles.ellipseSpaceBlock]}
            onPress={() => {}}>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              source={require('../../../assets/images/silver.jpg')}
            />
            <Text style={[styles.buyGold, styles.youOwnTypo]}>BUY Silver</Text>
          </Pressable>
          <Pressable
            style={[styles.ellipseContainer, styles.ellipseSpaceBlock]}
            onPress={() => {
              navigation?.navigate('AllProductsScreen');
            }}>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              source={require('../../../assets/images/gold.jpg')}
            />
            <Text style={[styles.buyGold, styles.youOwnTypo]}>
              BUY Coin/Bar
            </Text>
          </Pressable> */}
        </View>
        {/* <View style={[styles.banklyGoldChild, styles.childBg]} /> */}
        <View style={[styles.frameParent2, styles.frameParentFlexBox]}>
          <View style={[styles.frameParent3, styles.frameParentFlexBox]}>
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
                    onPress={() => {
                      toast.show('Added To Cart');
                      addItemToCart(item);
                    }}
                    style={[styles.addToCartWrapper, styles.wrapperFlexBox]}>
                    <Text style={[styles.addToCart, styles.addToCartClr]}>
                      Add to cart
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
          {/* <Pressable
            style={[styles.viewMoreProductsWrapper, styles.wrapperFlexBox]}>
            <Text style={[styles.viewMoreProducts, styles.addToCartClr]}>
              View More Products
            </Text>
          </Pressable> */}

          <View
            style={{
              paddingBottom: 290,
            }}></View>
        </View>
      </View>

      <DigiGoldSidebar
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    // backgroundColor: Color.colorGold,
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
    // borderColor: Color.colorGold,
    paddingHorizontal: Padding.p_xs,
    paddingVertical: Padding.p_5xs,
    // borderWidth: 1,
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
    minWidth: 150,
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
    alignSelf: 'stretch',
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

export default DigiGoldCartScreen;
