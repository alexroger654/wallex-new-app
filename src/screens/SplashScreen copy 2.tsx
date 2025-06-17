import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

const {width, height} = Dimensions.get('window');

const App = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const translateX = useSharedValue(0);
  const ballPosition = useSharedValue(0);

  const cards = [
    {title: 'Card 1', image: require('../../assets/splash/splash1.png')},
    {title: 'Card 2', image: require('../../assets/splash/splash1.png')},
    {title: 'Card 3', image: require('../../assets/splash/splash3.png')},
  ];

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      goToCard(currentCard + 1);
    }
  };

  const goToCard = index => {
    translateX.value = -width * index;
    ballPosition.value = index * (width / cards.length);
    runOnJS(setCurrentCard)(index);
  };

  const swipeGesture = Gesture.Pan().onEnd(event => {
    if (event.velocityX < -200 || event.translationX < -width / 3) {
      if (currentCard < cards.length - 1) {
        runOnJS(goToCard)(currentCard + 1);
      }
    } else if (event.velocityX > 200 || event.translationX > width / 3) {
      if (currentCard > 0) {
        runOnJS(goToCard)(currentCard - 1);
      }
    } else {
      translateX.value = -width * currentCard;
    }
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(translateX.value, {duration: 500})}],
  }));

  const ballStyle = useAnimatedStyle(() => ({
    transform: [{translateX: withTiming(ballPosition.value, {duration: 500})}],
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
                  height: 375,
                  borderRadius: 25,
                }}
                source={card.image}
              />
              <View style={{flex: 1, paddingBottom: 14, paddingRight: 16}}>
                <View
                  style={{
                    paddingHorizontal: 16,
                    marginTop: 24,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 24,
                        fontWeight: '600',
                        lineHeight: 30,
                      }}>
                      {card.title}
                    </Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                      From food to fashion, travel to tech, our student card
                      brings you unbeatable discounts on all your favorites.
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'gold',
                      height: 62,
                      width: 70,
                      borderRadius: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'flex-end',
                      marginTop: 120,
                    }}>
                    <ChevronRightIcon color="black" size={36} />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
      <View style={styles.ballTrack}>
        <Animated.View style={[styles.ball, ballStyle]} />
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
    width: width * 3,
    height,
    marginTop: 180,
  },
  card: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    paddingBottom: 14,
    paddingRight: 16,
    marginTop: 24,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'center',
  },
  cardDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#FFD700',
    height: 62,
    width: 70,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 120,
  },
  ballTrack: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    width,
    height: 50,
    justifyContent: 'center',
  },
  ball: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'yellow',
    position: 'absolute',
  },
});

export default App;
