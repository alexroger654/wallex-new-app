import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import LimitSettings from '../../component/card/LimitSettings';
import { ArrowsRightLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { Color } from '../../GlobalStyles';
import { ICardDetails } from '../../shared/interfaces/caed.details.interface';
import { useAuth } from '../../context/AuthContext';
import useGetData from '../../shared/fetch/useGetData';
import { CardFull } from '../../shared/interfaces/card.full.detail.interface';
import { CardInfo } from '../../shared/interfaces/CardInfo.card';
import { NewspaperIcon } from 'react-native-heroicons/solid';
import Loading from '../../component/Loading';

export default function CardDetailsScreen({ navigation }: any) {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotation = useSharedValue(0);
  const [loading, setLoading] = useState(false)


  const [cardData, setCardData] = useState<CardInfo | null>(null);
  const { user } = useAuth();


  // ============= getting data

  async function handleGetCardDetails() {
    setLoading(true)
    const result = await useGetData(`linkedmobile?mobile_number=${user?.mobile}`, 'card')
    setCardData(result)
    setLoading(false)

  }





  // ========================== animation =========================


  const flipCard = () => {
    setIsFlipped(prev => !prev);
    rotation.value = withTiming(isFlipped ? 0 : 180, { duration: 500 });
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });



  useEffect(() => {
    handleGetCardDetails()
  }, [])








  if (loading) {
    return <Loading />
  }
  // ======================= render ==============================
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        {/* =========== header ==================================== */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingVertical: 20,
            paddingHorizontal: 16,
            // backgroundColor: 'red',
            justifyContent: 'space-between'
          }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <ChevronLeftIcon color={Color.primaryBlue100} size={22} />
            <Text
              style={{
                color: Color.primaryBlue100,
                fontWeight: '600',
                fontSize: 16,
              }}>
              Card Details
            </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate('MiniStatementScreen')}
          >
            <ArrowsRightLeftIcon size={20} color={Color.primaryBlue100} />
          </Pressable>
        </Pressable>

        {/* ============== card================================================= ============== */}

        <View
          style={{
            width: '100%',
            height: '45%',
          }}>


          <Pressable onPress={flipCard} style={styles.container}>
            <Animated.View style={[styles.card, frontStyle, {
              position: 'relative'
            }]}>
              <Image
                source={require('../../../assets/card/front.png')}
                style={[styles.image, {

                }]}
                resizeMode="cover"
              />

              <View style={{
                position: 'absolute',
                zIndex: 20000000000,
                top: '45%',
                left: 20
              }}>
                <Text
                  style={{
                    color: '#dcc882',
                    fontWeight: '600',
                    fontSize: 16,
                    textAlign: 'center',

                  }}>
                  {user?.full_name}
                </Text>
              </View>
            </Animated.View>
            <Animated.View style={[styles.card, styles.backCard, backStyle, {
              // position: 'relative'
            }]}>
              <Image
                source={require('../../../assets/card/back.png')}
                style={[styles.image, {
                  position: 'relative'
                }]}
                resizeMode="cover"
              />

              <View style={{
                position: 'absolute',
                zIndex: 20000000000,
                top: 20,
                right: 20
              }}>
                <Text
                  style={{
                    color: '#dcc882',
                    fontWeight: '600',
                    fontSize: 16,
                    textAlign: 'right',

                  }}>
                  {user?.full_name}
                </Text>
                <Text
                  style={{
                    color: '#dcc882',
                    fontWeight: '300',
                    fontSize: 13,
                    textAlign: 'right',

                  }}>
                  {cardData?.Card_No?.slice(0, 4)}
                </Text>
                <Text
                  style={{
                    color: '#dcc882',
                    fontWeight: '300',
                    fontSize: 13,
                    textAlign: 'right',

                  }}>
                  {cardData?.Card_No?.slice(4, 8)}
                </Text>
                <Text
                  style={{
                    color: '#dcc882',
                    fontWeight: '300',
                    fontSize: 13,
                    textAlign: 'right',

                  }}>
                  {cardData?.Card_No?.slice(8, 12)}
                </Text>
                <Text
                  style={{
                    color: '#dcc882',
                    fontWeight: '300',
                    fontSize: 13,
                    textAlign: 'right',

                  }}>
                  {cardData?.Card_No?.slice(12, 16)}
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  gap: 6
                }}>
                  <View>
                    <Text
                      style={{
                        color: '#dcc882',
                        fontWeight: '300',
                        fontSize: 10,
                        textAlign: 'right',

                      }}>
                      Valid till:
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#dcc882',
                      fontWeight: '300',
                      fontSize: 10,
                      textAlign: 'right',

                    }}>
                    {cardData?.Expiry_Date}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 3,
                  gap: 6
                }}>
                  <View>
                    <Text
                      style={{
                        color: '#dcc882',
                        fontWeight: '300',
                        fontSize: 10,
                        textAlign: 'right',

                      }}>
                      Balance:
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#dcc882',
                      fontWeight: '300',
                      fontSize: 10,
                      textAlign: 'right',

                    }}>
                    ₹{cardData?.Account_Bal}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </Pressable>
          <Pressable onPress={flipCard}>
            <Text
              style={{
                color: Color.primaryBlue100,
                fontWeight: '600',
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 10,
                marginTop: -20,
              }}>
              {isFlipped ? 'View Front' : 'View Back'}
            </Text>
          </Pressable>
        </View>
        {/* ========================================= card end  ==================================== */}
        <View
          style={{
            width: '100%',
            flex: 1,
          }}>
          <LimitSettings cardData={cardData} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // perspective: 1000, 
  },
  card: {
    position: 'absolute',
    width: 182,
    height: 287,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backCard: {
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
