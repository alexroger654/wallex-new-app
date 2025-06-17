import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  HomeIcon as HomeOutline,
  HeartIcon as HeartOutline,
  ShoppingBagIcon as BagOutline,
  MagnifyingGlassIcon as SearchOutline,
  Cog6ToothIcon as UserOutline,
  IdentificationIcon as TransactionOutline,
  NewspaperIcon as KundaliOutline,
  LifebuoyIcon as HoroscopeOutline,
  ServerStackIcon as ProductOutline,
  Cog6ToothIcon as SettingsOutline,
  WalletIcon as TransitionOutline,
  TicketIcon as MyLoanOutline,
  PhoneArrowUpRightIcon as SupportOutline,
} from 'react-native-heroicons/outline';
import {
  Cog6ToothIcon as SettingsSolid,
  HomeIcon as HomeSolid,
  HeartIcon as HeartSolid,
  IdentificationIcon as TransactionSolid,
  MagnifyingGlassIcon as SearchSolid,
  Cog6ToothIcon as UserSolid,
  ShoppingCartIcon as CartSolid,
  NewspaperIcon as KundaliSolid,
  LifebuoyIcon as HoroscopeSolid,
  ServerStackIcon as ProductSolid,
  PlusIcon as PlusSolid,
  WalletIcon as TransitionSolid,
  TicketIcon as MyLoanSolid,
  PhoneArrowUpRightIcon as SupportSolid,
  Cog6ToothIcon,
} from 'react-native-heroicons/solid';
import {useTheme} from '../context/ThemeProvider';
import MyAccountScreen from '../screens/MyAccountScreen';
import TransactionScreen from '../screens/card/TransactionScreen';
import EditProfileScreen from '../screens/auth-screens/EditProfileScreen';
import SupportChatScreen from '../screens/SupportScreeen';
import HomeScreen2 from '../screens/HomeScreen2';
import HelpSupportScreen from '../screens/settings-screens/HelpSupportScreen';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  const {color} = useTheme();

  //====================== icons and names ====================

  const menuIcons = (route: any, focused: any) => {
    let icon;
    let openModal = false;

    if (route.name === 'HomeScreen') {
      icon = focused ? (
        <HomeSolid size="28" color={color.white} />
      ) : (
        <HomeOutline size="28" strokeWidth={2} color={color.primaryBlue100} />
      );
    } else if (route.name === 'TransactionScreen') {
      icon = focused ? (
        <TransitionSolid size="28" color={color.white} />
      ) : (
        <TransitionOutline
          size="28"
          strokeWidth={2}
          color={color.primaryBlue100}
        />
      );
    } else if (route.name === 'SupportChatScreen') {
      icon = focused ? (
        <SupportSolid size="28" color={color.white} />
      ) : (
        <SupportOutline size="28" color={color.primaryBlue100} />
      );
    } else if (route.name === 'MyAccountScreen') {
      icon = focused ? (
        <SettingsSolid size="28" color={color.white} />
      ) : (
        <SettingsOutline
          size="28"
          strokeWidth={2}
          color={color.primaryBlue100}
        />
      );
    }

    return (
      <View style={{}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            shadowColor: '#000',
            backgroundColor: focused ? color.primaryBlue100 : 'transparent',
            height: 50,
            width: 50,
          }}>
          {icon}
          <Text
            style={{
              color: focused ? '#fff' : color.primaryBlue100,
              fontSize: 8,
            }}>
            {route.name === 'HomeScreen'
              ? 'Home'
              : route.name === 'TransactionScreen'
              ? 'Transactions'
              : route.name === 'SupportChatScreen'
              ? 'Support'
              : route.name === 'MyAccountScreen'
              ? 'My Account'
              : ''}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => menuIcons(route, focused),
        tabBarStyle: {
          height: 65,
          alignItems: 'center',
          borderWidth: 0,
          borderColor: 'transparent',
          backgroundColor: '#fff',
          //   borderRadius: 20,
        },
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen2} />
      <Tab.Screen name="TransactionScreen" component={TransactionScreen} />
      <Tab.Screen name="SupportChatScreen" component={HelpSupportScreen} />
      <Tab.Screen name="MyAccountScreen" component={MyAccountScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
