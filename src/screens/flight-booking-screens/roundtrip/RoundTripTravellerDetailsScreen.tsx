import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import {Color} from '../../../GlobalStyles';
import usePostData from '../../../shared/fetch/usePostData';
import SelectSeat from '../../../component/flight-bookin/SeatBooking';
import {useTheme} from '../../../context/ThemeProvider';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import CountdownTimer from '../../../component/flight-bookin/CountdownTimer';

const dummy = {
  error: null,
  message: 'Seat Maps retrieved',
  data: {
    seatLayout: {
      Lowerdeck: {},
      Maindeck: {
        equipmentInfo: {
          fareType: 'Non-Refundable',
          nft: 'Non-Refundable',
          columns: 'A|B|C|D|E|F',
          columnSpaceAfter: 'C',
          wingsStart: '9',
          wingsEnd: '14',
          cabinName: 'F',
          cabinType: 'Y',
          cabinStart: '1',
          cabinEnd: '30',
        },
        rowInfo: {
          '1': {
            rchar: '',
            rseats: [
              {
                sn: '1A',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '1B',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '1C',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '1D',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '1E',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '1F',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '2': {
            rchar: '',
            rseats: [
              {
                sn: '2A',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '2B',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '2C',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '2D',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '2E',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '2F',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '3': {
            rchar: '',
            rseats: [
              {
                sn: '3A',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '3B',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '3C',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '3D',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '3E',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '3F',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '4': {
            rchar: '',
            rseats: [
              {
                sn: '4A',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '4B',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '4C',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '4D',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '4E',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '4F',
                ns: '',
                avl: false,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '5': {
            rchar: '',
            rseats: [
              {
                sn: '5A',
                ns: '',
                avl: false,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '5B',
                ns: '',
                avl: false,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '5C',
                ns: '',
                avl: false,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '5D',
                ns: '',
                avl: false,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '5E',
                ns: '',
                avl: false,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '5F',
                ns: '',
                avl: false,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '6': {
            rchar: '',
            rseats: [
              {
                sn: '6A',
                ns: '',
                avl: false,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '6B',
                ns: '',
                avl: false,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '6C',
                ns: '',
                avl: false,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '6D',
                ns: '',
                avl: false,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '6E',
                ns: '',
                avl: false,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '6F',
                ns: '',
                avl: false,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '7': {
            rchar: '',
            rseats: [
              {
                sn: '7A',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '7B',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '7C',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '7D',
                ns: '',
                avl: false,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '7E',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '7F',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '8': {
            rchar: '',
            rseats: [
              {
                sn: '8A',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '8B',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '8C',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '8D',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '8E',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '8F',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '9': {
            rchar: '',
            rseats: [
              {
                sn: '9A',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '9B',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '9C',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '9D',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '9E',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '9F',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '10': {
            rchar: '',
            rseats: [
              {
                sn: '10A',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '10B',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '10C',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '10D',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '10E',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '10F',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '11': {
            rchar: '',
            rseats: [
              {
                sn: '11A',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '11B',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '11C',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '11D',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '11E',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '11F',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '12': {
            rchar: '',
            rseats: [
              {
                sn: '12A',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '12B',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '12C',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '12D',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '12E',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '12F',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '13': {
            rchar: '',
            rseats: [
              {
                sn: '13A',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '13B',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '13C',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '13D',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '13E',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '13F',
                ns: '',
                avl: true,
                price: 300,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '14': {
            rchar: '',
            rseats: [
              {
                sn: '14A',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '14B',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '14C',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '14D',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '14E',
                ns: '',
                avl: true,
                price: 99,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '14F',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '15': {
            rchar: '',
            rseats: [
              {
                sn: '15A',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '15B',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '15C',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '15D',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '15E',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '15F',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '16': {
            rchar: '',
            rseats: [
              {
                sn: '16A',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '16B',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '16C',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '16D',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '16E',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '16F',
                ns: '',
                avl: true,
                price: 999,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '17': {
            rchar: '',
            rseats: [
              {
                sn: '17A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '17B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '17C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '17D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '17E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '17F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '18': {
            rchar: '',
            rseats: [
              {
                sn: '18A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '18B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '18C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '18D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '18E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '18F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '19': {
            rchar: '',
            rseats: [
              {
                sn: '19A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '19B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '19C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '19D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '19E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '19F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '20': {
            rchar: '',
            rseats: [
              {
                sn: '20A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '20B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '20C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '20D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '20E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '20F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '21': {
            rchar: '',
            rseats: [
              {
                sn: '21A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '21B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '21C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '21D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '21E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '21F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '22': {
            rchar: '',
            rseats: [
              {
                sn: '22A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '22B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '22C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '22D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '22E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '22F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '23': {
            rchar: '',
            rseats: [
              {
                sn: '23A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '23B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '23C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '23D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '23E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '23F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '24': {
            rchar: '',
            rseats: [
              {
                sn: '24A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '24B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '24C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '24D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '24E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '24F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '25': {
            rchar: '',
            rseats: [
              {
                sn: '25A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '25B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '25C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '25D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '25E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '25F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '26': {
            rchar: '',
            rseats: [
              {
                sn: '26A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '26B',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '26C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '26D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '26E',
                ns: '',
                avl: true,
                price: 49,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '26F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '27': {
            rchar: '',
            rseats: [
              {
                sn: '27A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '27B',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '27C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '27D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '27E',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '27F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '28': {
            rchar: '',
            rseats: [
              {
                sn: '28A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '28B',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '28C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '28D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '28E',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '28F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '29': {
            rchar: '',
            rseats: [
              {
                sn: '29A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '29B',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '29C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '29D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '29E',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '29F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
          '30': {
            rchar: '',
            rseats: [
              {
                sn: '30A',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '30B',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '30C',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '30D',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '30E',
                ns: '',
                avl: true,
                price: 0,
                st: 0,
                isRemove: false,
                sc: '',
              },
              {
                sn: '30F',
                ns: '',
                avl: true,
                price: 250,
                st: 0,
                isRemove: false,
                sc: '',
              },
            ],
          },
        },
      },
      Upperdeck: {},
    },
    seatCharacteristics: {
      '2': 'Leg rest available',
      '3': 'Individual video screen - Choice of movies',
      '4': 'Not a window seat',
      '5': 'Not an aisle seat',
      '6': 'Near galley seat',
      '7': 'Near toilet seat',
      '8': 'No seat at this location',
      '9': 'Center seat (not window, not aisle)',
      '700': 'Individual video screen - services unspecified',
      '701': 'No seat --access to handicapped lavatory',
      '1B': 'Seat not allowed for infant',
      '1C': 'Seat not allowed for medical',
      '1D': 'Seat not allowed for unaccompanied minor',
      '1A': 'Restricted recline seat',
      '1M': 'Seat with movie view',
      '1W': 'Window seat without window',
      '3A': 'Individual video screen - No choice of movie',
      '3B': 'Individual video screen-Choice of movies, games, information, etc',
      '6A': 'In front of galley seat',
      '6B': 'Behind galley seat',
      '7A': 'In front of toilet seat',
      '7B': 'Behind toilet seat',
      A: 'Aisle seat',
      AA: 'All available aisle seats',
      AB: 'Seat adjacent to bar',
      AC: 'Seat adjacent to - closet',
      AG: 'Seat adjacent to galley',
      AJ: 'Adjacent aisle seats',
      AL: 'Seat adjacent to lavatory',
      AM: 'Individual movie screen - No choice of movie selection',
      AR: 'No seat - airphone',
      'AS ': 'Individual airphone',
      AT: 'Seat adjacent to table',
      AU: 'Seat adjacent to stairs to upper deck',
      AV: 'Only available seats',
      AW: 'All available window seats',
      B: 'Seat with bassinet facility',
      BA: 'No seat - bar',
      BK: 'Blocked Seat for preferred passenger in adjacent seat',
      C: 'Crew seat',
      CC: 'Center section seat(s)',
      CL: 'No seat - closet',
      CS: 'Conditional seat-contact airline',
      D: 'No seat - exit door',
      DE: 'Deportee',
      E: 'Exit row seat',
      EA: 'Not on exit seat',
      EC: 'Electronic connection for laptop or FAX machine',
      EX: 'No seat - emergency Exit',
      F: 'Added seat',
      FC: 'Front of cabin class/compartment',
      G: 'Seat at forward end of cabin',
      GF: 'General facility',
      GN: 'No seat - galley',
      GR: 'Group seat - offered to travellers belonging to a group',
      H: 'Seat with facilities for handicapped/incapacitated passenger',
      I: 'Seat suitable for adult with an infant',
      IA: 'Inside aisle seats',
      IE: 'Seat not suitable for child',
      J: 'Rear facing seat',
      K: 'Bulkhead seat',
      KA: 'Bulkhead seat with movie screen',
      KN: 'Bulkhead, no seat',
      L: 'Leg space seat',
      LA: 'No seat - lavatory',
      LG: 'No seat - luggage storage',
      LH: 'Restricted seat - offered on long-haul segments',
      LS: 'Left side of aircraft',
      M: 'Seat without a movie view',
      MA: 'Medically OK to travel',
      N: 'No smoking seat',
      O: 'Preferential seat',
      OW: 'Overwing seat(s)',
      PC: 'Pet cabin',
      Q: 'Seat in a quiet zone',
      RS: 'Right side of aircraft',
      S: 'Smoking seat',
      SO: 'No seat - storage space',
      ST: 'No seat - stairs to upper deck',
      T: 'Rear/Tail section of aircraft',
      TA: 'No seat - table',
      U: 'Seat suitable for unaccompanied minors',
      UP: 'Upper deck',
      V: 'Seat to be left vacant or offered last',
      W: 'Window seat',
      WA: 'Window and aisle together',
      X: 'No facility seat (indifferent seat)',
      Z: 'Buffer zone seat',
    },
    rowCharacteristics: {
      '10': "Row designated for RBD 'A'",
      '11': "Row designated for RBD 'B'",
      '12': "Row designated for RBD 'C'",
      '13': "Row designated for RBD 'D'",
      '14': "Row designated for RBD 'F'",
      '15': "Row designated for RBD 'H'",
      '16': "Row designated for RBD 'J'",
      '17': "Row designated for RBD 'K'",
      '18': "Row designated for RBD 'L'",
      '19': "Row designated for RBD 'M'",
      '20': "Row designated for RBD 'P'",
      '21': "Row designated for RBD 'Q'",
      '23': "Row designated for RBD 'S'",
      '24': "Row designated for RBD 'T'",
      '25': "Row designated for RBD 'V'",
      '26': "Row designated for RBD 'W'",
      '27': "Row designated for RBD 'Y'",
      B: 'Buffer Row',
      C: 'Row with cabin facilities in a designated column',
      CC: 'Row with cabin facilities in an undesignated column',
      E: 'Exit Row',
      EC: 'Exit row with cabin facilities in a designated column',
      EL: 'Exit Left',
      ER: 'Exit Right',
      I: 'Indifferent Row',
      K: 'Overwing Row',
      L: 'Lowerdeck Rowt',
      M: 'Maindeck Row',
      MV: 'Row with movie screen',
      N: 'No-smoking Row',
      S: 'Smoking Row',
      U: 'Upperdeck Row',
      X: 'No overwing Row',
      XC: 'Exit Row with cabin facilities in an undesignated column',
      Z: 'Row does not exist',
    },
    cabinCharacteristics: {
      L: 'Lowerdeck',
      M: 'Maindeck',
      U: 'Upperdeck',
    },
    flightItinerary: {
      arrivalLocationCode: 'BLR',
      oac: 'SG',
      depLocationCode: 'DEL',
      tenantId: '35',
      cabin: 'Economy',
      departureDateTime: '2024-05-10',
      arrivalDateTime: '2024-05-10',
      supplierCode: 'SGAPI',
      resBookDesigCode: 'U',
      flightNumber: '8151',
    },
    seatSelected: {
      Maindeck:
        '[{"sn":"17B","ns":"","avl":"true","price":49,"st":"0.0","sc":""}]',
    },
    StatusCode: 200,
  },
};

const RoundTripTravellerDetailsScreen = ({navigation, route}: any) => {
  const [loading, setLoading] = useState(false);
  const [seatData, setSeatData] = useState<any>(null);
  const [mealsData, setMealsData] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const {color} = useTheme();
  const {
    contactInfo,
    priceData,
    searchId,
    msid,
    mode,
    sc,
    flightIdCSV,
    flightPrice,
    bpc,
    isSR,
    flight_depart_date,
    destination,
    origin,
    resultObjId,
    formateDate,
    originCityName,
    destinationCityName,
    duration,
    airlineName,
    seatType,
    airlineCode,
    flightNumber,
  } = route?.params;

  function convertToDate(input: any) {
    const [day, month, year] = input.split('/').map(Number);
    const date = new Date(year, month - 1, day); // JS months are 0-indexed
    if (date.getDate() !== day) {
      throw new Error('Invalid date: ' + input);
    }
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }

  async function getSeatList() {
    setLoading(true);
    const result = await usePostData(
      'get-fare-rule',
      {
        isDomestic: true,
        // Fare Basic Code. You will get this value from search api with fbc key
        fareBasisCode:
          priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.fbc,
        // Airline code. You will get this value from search api with ac key
        airlineCode:
          priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.oac,
        // Search Id. You will get this value from search api with scid key
        searchId: priceData?.searchId,
        // Supplier Code. You will get this value from from search api with supplierCode key
        supplierCode: sc,
        // flightIdCSV
        flightIdCSV: priceData?.flightIdCSV,
      },
      'flight',
    );

    setSeatData(result?.data);
    setLoading(false);
  }

  // async function getSeatList() {
  //   setLoading(true);
  //   const result = await usePostData(
  //     'check-price',
  //     {
  //       resBookDesigCode:
  //         priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]
  //           ?.resBookDesigCode,
  //       isDomestic: true,
  //       cabin:
  //         priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.classtype,
  //       departureDateTime:
  //         priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.ddt,
  //       arrivalDateTime:
  //         priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.adt,
  //       flightNumber:
  //         priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.fl,
  //       depLocationCode: origin,
  //       arrivalLocationCode: destination,
  //       oac: priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.oac,
  //       pid: priceData?.pricingId,
  //       superPnr: priceData?.superPnr,
  //     },
  //     'flight',
  //   );

  //   setSeatData(result?.data);
  //   setLoading(false);
  // }

  useEffect(() => {
    if (priceData?.seats) {
      getSeatList();
    }
  }, [priceData?.seats]);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Color.primaryBlue100,
            paddingVertical: 24,
            paddingHorizontal: 14,
          }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <ChevronLeftIcon size={22} color={Color.white} />
            <Text
              style={{
                color: Color.white,
                fontSize: 16,
                fontWeight: '700',
              }}>
              Select Seat
            </Text>
          </Pressable>

          <View>
            <CountdownTimer color={Color.white} />
          </View>
        </View>

        {/* Body  */}
        <View
          style={{
            padding: 24,
          }}>
          {/* Flight Details */}
          <View style={styles.flightDetailsContainer}>
            {/* heaer */}
            <View style={styles.flightInfoHeader}>
              <View>
                <Text style={styles.flightRoute}>
                  {originCityName} To {destinationCityName}
                </Text>
                <Text style={styles.flightSubDetails}>{duration}</Text>
              </View>

              {/* <Text style={styles.reviewText}>Review</Text> */}
            </View>
          </View>

          {/* Seats ============================= */}
          <View
            style={{
              width: '100%',
              // backgroundColor: 'red',
            }}>
            {seatData?.seatLayout ? (
              <>
                <SelectSeat
                  data={seatData}
                  selectedSeat={selectedSeat}
                  setSelectedSeat={setSelectedSeat}
                />
              </>
            ) : (
              <>
                <View
                  style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 16,
                    paddingVertical: 24,
                  }}>
                  <Text
                    style={{
                      fontSize: 30,
                    }}>
                    ⚠️
                  </Text>
                  <Text
                    style={{
                      color: color?.primaryBlue100,
                      marginTop: 10,
                      fontWeight: '700',
                    }}>
                    Seat Selection Not Available
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* {seatData ? (
            <SelectSeat
              data={seatData}
              selectedSeat={selectedSeat}
              setSelectedSeat={setSelectedSeat}
            />
          ) : (
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
                paddingVertical: 24,
              }}>
              <Text
                style={{
                  fontSize: 30,
                }}>
                ⚠️
              </Text>
              <Text
                style={{
                  color: color?.primaryBlue100,
                  marginTop: 10,
                  fontWeight: '700',
                }}>
                Seat Selection Not Available
              </Text>
            </View>
          )} */}

          {/* Information Section */}
          {/* <View style={styles.infoContainer}>
            <Text style={styles.infoHeader}>
              Information You Need To Know!!
            </Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>
                Lorem Ipsum Dolor Sit Amet Consectetur...
              </Text>
            </View>
          </View> */}

          {/* Important Information */}
          {/* <View style={styles.importantInfoContainer}>
            <Text style={styles.importantHeader}>Caution </Text>
            <View style={styles.importantItem}>
              <Text style={styles.importantText}>
                Lorem Ipsum Dolor Sit Amet Consectetur...
              </Text>
            </View>

          </View> */}
        </View>
      </ScrollView>

      {/* Grand Total */}
      <View
        style={{
          padding: 16,
        }}>
        <View style={styles.totalContainer}>
          <View>
            <Text style={styles.totalText}>Grand Total</Text>
            <Text style={styles.totalAmount}>₹{flightPrice}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RoundTripPaymentSuccessfulScreen', {
                contactInfo,
                priceData,
                searchId,
                msid,
                mode,
                sc,
                flightIdCSV,
                flightPrice,
                bpc,
                isSR,
                flight_depart_date,
                destination,
                origin,
                resultObjId,
                formateDate,
                originCityName,
                destinationCityName,
                duration,
                airlineName,
                seatType,
                airlineCode,
                flightNumber,
                selectedSeat,
              })
            }
            style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondaryColors100,
  },
  header: {
    backgroundColor: Color.primaryBlue100,
    padding: 24,
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepsContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepText: {
    color: Color.primaryBlue100,
    fontWeight: '600',
    textAlign: 'center',
  },
  stepLabel: {
    color: '#666',
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 12,
  },
  flightDetailsContainer: {
    marginBottom: 16,
  },
  flightInfoHeader: {
    backgroundColor: '#E5E9F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 12,
    borderRadius: 10,
  },
  flightRoute: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  reviewText: {
    color: Color.primaryBlue100,
    fontWeight: '600',
  },
  flightSubDetails: {
    color: Color.secondaryColors500,
    marginBottom: 8,
    fontSize: 12,
    marginTop: 0,
  },
  flightRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  flightCompany: {
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  flightCode: {
    color: Color.primaryBlue100,
  },
  flightTimesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeBlock: {
    alignItems: 'center',
    width: '33%',
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Color.primaryBlue100,
  },
  airportText: {
    color: Color.colorGray,
    fontSize: 12,
  },
  terminalText: {
    color: Color.colorGray,
    fontSize: 12,
  },
  refundable: {
    textAlign: 'center',
    color: '#28a745',
    marginTop: 8,
  },
  promoContainer: {
    backgroundColor: '#E5E9F7',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  promoInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: Color.primaryBlue100,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  promoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  promoCode: {
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  promoDescription: {
    color: '#666',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Color.primaryBlue100,
    borderRadius: 16,
  },
  totalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  continueButton: {
    backgroundColor: Color.white,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: Color.primaryBlue100,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#F1F3FF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  infoHeader: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: Color.primaryBlue100,
  },
  infoItem: {
    marginVertical: 4,
  },
  infoText: {
    color: '#666',
  },
  importantInfoContainer: {
    backgroundColor: '#FFF6E3',
    borderRadius: 10,
    padding: 16,
  },
  importantHeader: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: Color.primaryBlue100,
  },
  importantItem: {
    marginVertical: 4,
  },
  importantText: {
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },

  travellerContainer: {
    backgroundColor: Color.secondaryColors100,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  travellerLabel: {
    fontSize: 14,
    color: '#333',
  },
  travellerCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  contactContainer: {
    backgroundColor: Color.secondaryColors100,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#003366',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default RoundTripTravellerDetailsScreen;
