import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import {Color} from '../GlobalStyles';

const {width, height} = Dimensions.get('window');

const App = ({navigation}: any) => {
  const [currentCard, setCurrentCard] = useState(0);
  const translateX = useSharedValue(0);
  const ballPosition = useSharedValue(100);
  const ballPositionY = useSharedValue(0);

  // =========== dots ======================
  const dot1 = useSharedValue(0);
  const dot1y = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot2y = useSharedValue(0);
  const dot3 = useSharedValue(0);
  const dot3y = useSharedValue(0);

  const cards = ['Card 1', 'Card 2', 'Card 3'];

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      goToCard(currentCard + 1);
    }
  };

  const goToCard = (index: number) => {
    translateX.value = -width * index;
    ballPosition.value = width * index;
    dot2.value = -width * index + 250;
    dot1.value = width * index - 250;
    dot3.value = -width * index - 250;
    if (index == 2) {
      ballPositionY.value = 1200;
      ballPosition.value = -200;
    } else {
      ballPositionY.value = 0;
    }
    runOnJS(setCurrentCard)(index);
  };

  const swipeGesture = Gesture.Pan().onEnd(event => {
    if (event.velocityX < -200 || event.translationX < -width / 3) {
      // Swipe left
      if (currentCard < cards.length - 1) {
        runOnJS(goToCard)(currentCard + 1);
      }
    } else if (event.velocityX > 200 || event.translationX > width / 3) {
      // Swipe right
      if (currentCard > 0) {
        runOnJS(goToCard)(currentCard - 1);
      }
    } else {
      // Snap back to the current card
      translateX.value = -width * currentCard;
    }
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(translateX.value, {duration: 500})}],
  }));

  const ballStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(ballPosition.value, {duration: 800}), // Horizontal movement
      },
      {
        translateY: withTiming(ballPositionY.value, {duration: 800}),
      },
    ],
  }));
  const dot1Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(dot1.value, {duration: 800}), // Horizontal movement
      },
    ],
  }));
  const dot2Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(dot2.value, {duration: 1000}), // Horizontal movement
      },
    ],
  }));
  const dot3Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(dot3.value, {duration: 800}), // Horizontal movement
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={[styles.cardsContainer, cardStyle]}>
          {cards.map((card, index) => (
            <View key={index} style={styles.card}>
              <Image
                style={{
                  width: '100%',
                  height: 275,
                  borderRadius: 25,
                }}
                source={require('../../assets/splash/splash1.png')}
              />
              <View style={{flex: 1, paddingBottom: 14, paddingRight: 16}}>
                <View
                  style={{
                    paddingHorizontal: 16,
                    marginTop: 24,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                    // backgroundColor: 'red',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: Color.white,
                        fontSize: 24,
                        fontWeight: 600,
                        lineHeight: 30,
                      }}>
                      Take Charge of Your Finances With{' '}
                      <Text
                        style={{
                          color: Color.colorGold,
                        }}>
                        Our Student Debit Solutions
                      </Text>
                    </Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                      From food to fashion, travel to tech, our student card
                      brings you unbeatable discounts on all your favorites.
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('LoginScreen');
                    }}
                    style={{
                      backgroundColor: 'gold',
                      height: 62,
                      width: 70,
                      borderRadius: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'flex-end',
                      // marginTop: 120,
                      position: 'absolute',
                      bottom: 80,
                    }}>
                    <ChevronRightIcon color="black" size={36} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
      <View style={styles.ballTrack}>
        <Animated.View style={[styles.ball, ballStyle]} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: '40%',
          left: 20,
        }}>
        <Animated.View
          style={[
            {
              height: 12,
              width: 12,
            },
            dot1Style,
            styles.dot,
          ]}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
        }}>
        <Animated.View
          style={[
            {
              height: 12,
              width: 12,
            },
            dot2Style,
            styles.dot,
          ]}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: '12%',
          right: '10%',
        }}>
        <Animated.View
          style={[
            {
              height: 12,
              width: 12,
            },
            dot3Style,
            styles.dot,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  cardsContainer: {
    flexDirection: 'row',
    width: width * 3, // Adjust for the number of cards
    height,
  },
  card: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingTop: 160,
    position: 'relative',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ballTrack: {
    position: 'absolute',
    top: -50,
    left: -110,
    width,
    height: 50,
    justifyContent: 'center',
  },
  ball: {
    width: 223,
    height: 223,
    borderRadius: 10444,
    backgroundColor: '#FFBF04',
    position: 'absolute',
  },
  dot: {
    borderRadius: 10444,
    backgroundColor: '#FFBF04',
    position: 'absolute',
  },
});

export default App;
