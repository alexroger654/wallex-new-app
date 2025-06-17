import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountdownTimer = ({color}: any) => {
  const [remainingTime, setRemainingTime] = useState(0);

  // Function to load and calculate the remaining time
  const loadStartTimeAndCalculate = async () => {
    const startTime = await AsyncStorage.getItem('startTime');
    if (startTime) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(startTime, 10)) / 1000,
      ); // Elapsed time in seconds
      const newRemainingTime = Math.max(9 * 60 - elapsedTime, 0); // Calculate remaining time
      setRemainingTime(newRemainingTime);
    }
  };

  useEffect(() => {
    loadStartTimeAndCalculate(); // Calculate time on component mount
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval
  }, []);

  // Convert remaining seconds to minutes and seconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View>
      <Text style={{fontSize: 16, color: color}}>
        {formatTime(remainingTime)}
      </Text>
    </View>
  );
};

export default CountdownTimer;
